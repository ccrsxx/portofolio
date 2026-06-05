#!/usr/bin/env bash
#
# Blue/green hot-swap deploy.
#
#   deploy.sh <image-sha>
#
# Flow:
#   1. Acquire a lock (serialize concurrent deploys).
#   2. Read state -> figure out the inactive ("target") slot.
#   3. Pull the new image into the target slot and bring it up alongside the
#      live slot (both run at once, only the live one gets traffic).
#   4. Wait until the target slot is healthy (gate). Abort cleanly otherwise.
#   5. Flip Caddy's upstream to the target slot via a hot reload (zero drops).
#   6. Persist state. The previously-active slot keeps running so a rollback is
#      just another hot reload; it's only replaced on the *next* deploy.
#
# State ($DEPLOY_DIR/deploy.state) is the single source of truth:
#   BLUE_TAG / GREEN_TAG  -> image tag running in each slot
#   ACTIVE                -> slot currently receiving traffic
#   PREVIOUS              -> slot to roll back to (kept running)

set -euo pipefail

NEW_SHA="${1:?usage: deploy.sh <image-sha>}"

DEPLOY_DIR="${DEPLOY_DIR:-/opt/portofolio}"
IMAGE_REPO="${IMAGE_REPO:-ghcr.io/ccrsxx/portofolio}"
HEALTH_TIMEOUT="${HEALTH_TIMEOUT:-120}" # seconds to wait for the new slot

STATE_FILE="$DEPLOY_DIR/deploy.state"
CADDYFILE="$DEPLOY_DIR/Caddyfile"
LOCK_DIR="$DEPLOY_DIR/.deploy.lock"

cd "$DEPLOY_DIR"

log() { printf '\n>>> %s\n' "$*"; }

# --- 1. lock (mkdir is atomic) ----------------------------------------------
if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  echo "A deploy/rollback is already in progress ($LOCK_DIR). Aborting." >&2
  exit 1
fi
trap 'rmdir "$LOCK_DIR" 2>/dev/null || true' EXIT

# --- 2. read state ----------------------------------------------------------
BLUE_TAG="latest"
GREEN_TAG="latest"
ACTIVE=""
PREVIOUS=""
# shellcheck disable=SC1090
[ -f "$STATE_FILE" ] && source "$STATE_FILE"

if [ -z "$ACTIVE" ]; then
  TARGET="blue" # first ever deploy
else
  TARGET=$([ "$ACTIVE" = "blue" ] && echo "green" || echo "blue")
fi

log "Active slot: '${ACTIVE:-none}'  ->  deploying ${NEW_SHA} to '${TARGET}'"

# Point the target slot's tag at the new image; leave the live slot untouched.
if [ "$TARGET" = "blue" ]; then
  BLUE_TAG="$NEW_SHA"
else
  GREEN_TAG="$NEW_SHA"
fi
export BLUE_TAG GREEN_TAG

# --- 3. bring up infra + the new slot ---------------------------------------
# Infra is idempotent: only (re)created if compose config actually changed.
log "Ensuring caddy + cloudflared are up"
docker compose up -d caddy cloudflared

log "Pulling and starting portofolio-${TARGET} (${IMAGE_REPO}:${NEW_SHA})"
docker compose pull "portofolio-${TARGET}"
docker compose up -d --no-deps "portofolio-${TARGET}"

# --- 4. health gate ---------------------------------------------------------
log "Waiting up to ${HEALTH_TIMEOUT}s for portofolio-${TARGET} to become healthy"
deadline=$(( $(date +%s) + HEALTH_TIMEOUT ))
while true; do
  status="$(docker inspect --format '{{.State.Health.Status}}' "portofolio-${TARGET}" 2>/dev/null || echo "missing")"
  [ "$status" = "healthy" ] && break

  if [ "$(date +%s)" -ge "$deadline" ]; then
    echo "ERROR: portofolio-${TARGET} not healthy (status=${status}). Aborting." >&2
    echo "Live slot '${ACTIVE:-none}' is untouched; no traffic was switched." >&2
    docker compose stop "portofolio-${TARGET}" || true
    exit 1
  fi
  sleep 3
done
log "portofolio-${TARGET} is healthy"

# --- 5. flip Caddy upstream (hot reload, zero dropped connections) ----------
log "Switching Caddy upstream -> portofolio-${TARGET}"
sed -i -E "s#portofolio-(blue|green):3000#portofolio-${TARGET}:3000#g" "$CADDYFILE"
docker compose exec -T caddy caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile

# --- 6. persist state -------------------------------------------------------
cat > "$STATE_FILE" <<EOF
BLUE_TAG=$BLUE_TAG
GREEN_TAG=$GREEN_TAG
ACTIVE=$TARGET
PREVIOUS=$ACTIVE
EOF

log "Deployed. Active=${TARGET}  Previous=${ACTIVE:-none}"
echo "The previous slot stays running for instant rollback until the next deploy."
