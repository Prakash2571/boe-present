# syntax=docker/dockerfile:1

###############################################################################
# BeOnEdge presentation — production image for the Next.js 16 app.
#
# Multi-stage build:
#   deps    -> install dependencies from the lockfile
#   builder -> next build (emits .next/standalone thanks to output: "standalone")
#   runner  -> minimal runtime with only the traced server bundle
###############################################################################

ARG NODE_VERSION=22-alpine

# ---------------------------------------------------------------- deps
FROM node:${NODE_VERSION} AS deps
WORKDIR /app

# Only the manifests, so this layer is cached until dependencies change.
COPY package.json package-lock.json ./
RUN npm ci

# ---------------------------------------------------------------- builder
FROM node:${NODE_VERSION} AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ---------------------------------------------------------------- runner
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=4041 \
    # Bind all interfaces; the Next standalone server defaults to localhost,
    # which would be unreachable from outside the container.
    HOSTNAME=0.0.0.0

# Run as an unprivileged user.
RUN addgroup -g 1001 -S nodejs \
    && adduser -u 1001 -S nextjs -G nodejs

# public/ must be present for static assets (images, the exported PDF, svgs).
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# The standalone output already contains a minimal node_modules + server.js.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Static chunks are not included in standalone and must be copied separately.
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 4041

# Fails the container's health status if the app stops serving requests.
# Uses Node's built-in fetch (Node 18+) to avoid installing curl/wget.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||4041)+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
