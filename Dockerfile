# Base image
FROM node:20-alpine AS base

# Dependencies stage
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Builder stage
FROM base AS builder
WORKDIR /src/app
COPY --from=deps /src/app/node_modules ./node_modules
COPY . .
RUN yarn build

# Final production image
FROM base AS runner
WORKDIR /src/app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy Next.js build output
COPY --from=builder /src/app/public ./public
COPY --from=builder /src/app/.next/standalone ./
COPY --from=builder /src/app/.next/static ./.next/static

# Copy additional necessary files
COPY --from=builder /src/app/package.json ./package.json
COPY --from=builder /src/app/yarn.lock ./yarn.lock

# Install production-only dependencies while ignoring optional ones
RUN yarn install --frozen-lockfile --production --ignore-optional

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
