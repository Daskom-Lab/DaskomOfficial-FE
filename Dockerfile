# ======= STAGE 1: Build =======
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Next.js static site (or React, Vue, etc.)
RUN npm run build

# ======= STAGE 2: Serve Static Files with busybox =======
FROM lipanski/docker-static-website:latest

# Copy built files from the builder stage
COPY --from=builder /app/build .