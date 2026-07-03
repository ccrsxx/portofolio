# syntax=docker/dockerfile:1
# check=skip=InvalidDefaultArgInFrom

ARG NODE_VERSION
ARG NODE_DISTROLESS_VERSION

# ---

FROM node:${NODE_VERSION}-trixie-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

ARG INTERNAL_BACKEND_URL

ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_OWNER_BEARER_TOKEN
ARG NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY

ENV INTERNAL_BACKEND_URL=${INTERNAL_BACKEND_URL}

ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ENV NEXT_PUBLIC_OWNER_BEARER_TOKEN=${NEXT_PUBLIC_OWNER_BEARER_TOKEN}
ENV NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=${NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}

RUN --mount=type=secret,id=gh_token \
    --mount=type=secret,id=private_secret_key \
    GH_TOKEN=$(cat /run/secrets/gh_token) \
    PRIVATE_SECRET_KEY=$(cat /run/secrets/private_secret_key) \
    npm run build

# ---

FROM gcr.io/distroless/nodejs${NODE_DISTROLESS_VERSION}-debian13:nonroot AS final

WORKDIR /app

COPY --from=build --chown=65532:65532 /app/public ./public
COPY --from=build --chown=65532:65532 /app/.next/standalone ./
COPY --from=build --chown=65532:65532 /app/.next/static ./.next/static

ENV NEXT_TELEMETRY_DISABLED=1

ENTRYPOINT ["/nodejs/bin/node", "server.js"]

EXPOSE 3000

LABEL org.opencontainers.image.authors="ami@ccrsxx.com" \
    org.opencontainers.image.source="https://github.com/ccrsxx/portofolio" \
    org.opencontainers.image.description="My personal portofolio website" \
    org.opencontainers.image.licenses="GPL-3.0"
