# syntax=docker/dockerfile:1
# check=skip=InvalidDefaultArgInFrom

# ---

ARG NODE_VERSION

FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

ARG INTERNAL_BACKEND_URL

ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_OWNER_BEARER_TOKEN

ENV INTERNAL_BACKEND_URL=${INTERNAL_BACKEND_URL}

ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ENV NEXT_PUBLIC_OWNER_BEARER_TOKEN=${NEXT_PUBLIC_OWNER_BEARER_TOKEN}

RUN --mount=type=secret,id=gh_token \
    --mount=type=secret,id=private_secret_key \
    GH_TOKEN=$(cat /run/secrets/gh_token) \
    PRIVATE_SECRET_KEY=$(cat /run/secrets/private_secret_key) \
    npm run build

# ---

FROM node:${NODE_VERSION}-alpine AS runner

WORKDIR /app

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

ENV NEXT_TELEMETRY_DISABLED=1

USER node

ENTRYPOINT ["node", "server.js"]

EXPOSE 4000

LABEL org.opencontainers.image.authors="ami@ccrsxx.com" \
    org.opencontainers.image.source="https://github.com/ccrsxx/portofolio" \
    org.opencontainers.image.description="My personal portofolio website" \
    org.opencontainers.image.licenses="GPL-3.0"
