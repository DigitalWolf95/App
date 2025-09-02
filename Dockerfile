# Base image
FROM node:20-alpine

# Enable corepack for pnpm support
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy only the lockfile and package.json files (needed for pnpm install)
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY .npmrc ./

# Install dependencies (will be cached unless these files change)
RUN pnpm install

# Expose NX default dev port
EXPOSE 4200

# Default command (overridable by docker-compose)
# CMD ["npx", "nx", "serve", "digital-wolf-app"]
CMD sh -c "npx nx serve $NX_PROJECT"
