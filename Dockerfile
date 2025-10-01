FROM oven/bun:alpine

# Install git
RUN apk add --no-cache git

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Generate Prisma Client
RUN bunx prisma generate

# Build TypeScript
RUN bunx tsc

# Expose port
EXPOSE 8081

# Start the application (run built JS via Bun)
CMD ["bun", "./dist/infrastructure/http/server.js"]