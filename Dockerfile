# Base image for building the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /src/app

# Install dependencies for building
RUN apk add --no-cache libc6-compat python3 make g++

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy all source code
COPY . .

# Build the application
RUN yarn build


# Final production image
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /src/app

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Add non-root user
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy Next.js build output and dependencies from builder stage
COPY --from=builder /src/app/public ./public
COPY --from=builder /src/app/.next/standalone ./
COPY --from=builder /src/app/.next/static ./.next/static
COPY --from=builder /src/app/package.json ./package.json
COPY --from=builder /src/app/yarn.lock ./yarn.lock

# Install production dependencies
RUN yarn install --frozen-lockfile --production --ignore-optional

# Set user to nextjs
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
