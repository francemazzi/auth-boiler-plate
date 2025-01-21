FROM node:20-alpine

# Install git
RUN apk add --no-cache git

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma Client
RUN npm run prisma:generate

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 8080

# Start the application
CMD ["npm", "start"] 