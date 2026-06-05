#!/usr/bin/env bash
#
# Instant rollback: hot-reload Caddy back to the previous slot.
#
#   rollback.sh
#
# This works only while the previous slot is still running (i.e. before the
# next deploy reuses it). If it's gone, re-deploy the previous commit SHA via
# the Deploy workflow instead.

set -euo pipefail

DEPLOY_DIR="${DEPLOY_DIR:-/opt/portofolio}"
STATE_FILE="$DEPLOY_DIR/deploy.state"
CADDYFILE="$DEPLOY_DIR/Caddyfile"
LOCK_DIR="$DEPLOY_DIR/.deploy.lock"

cd "$DEPLOY_DIR"

log() { printf '\n>>> %s\n' "$*"; }

if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  echo "A deploy/rollback is already in progress ($LOCK_DIR). Aborting." >&2
  exit 1
fi
trap 'rmdir "$LOCK_DIR" 2>/dev/null || true' EXIT

[ -f "$STATE_FILE" ] || { echo "No deploy.state found; nothing to roll back." >&2; exit 1; }
# shellcheck disable=SC1090
source "$STATE_FILE"

if [ -z "${PREVIOUS:-}" ] || [ "${PREVIOUS}" = "${ACTIVE}" ]; then
  echo "No previous slot recorded; nothing to roll back to." >&2
  exit 1
fi

# The previous slot must still be alive and healthy to flip back to it.
status="$(docker inspect --format '{{.State.Health.Status}}' "portofolio-${PREVIOUS}" 2>/dev/null || echo "missing")"
if [ "$status" != "healthy" ]; then
  echo "Previous slot 'portofolio-${PREVIOUS}' is not healthy (status=${status})." >&2
  echo "It was likely replaced by a later deploy. Re-deploy the previous SHA via the Deploy workflow instead." >&2
  exit 1
fi

log "Rolling back: Caddy upstream -> portofolio-${PREVIOUS}"
sed -i -E "s#portofolio-(blue|green):3000#portofolio-${PREVIOUS}:3000#g" "$CADDYFILE"
docker compose exec -T caddy caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile

# Swap active/previous so a second rollback toggles back.
cat > "$STATE_FILE" <<EOF
BLUE_TAG=$BLUE_TAG
GREEN_TAG=$GREEN_TAG
ACTIVE=$PREVIOUS
PREVIOUS=$ACTIVE
EOF

log "Rolled back. Active=${PREVIOUS}"
