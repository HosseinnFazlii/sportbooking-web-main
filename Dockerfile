# Multi-stage build for production
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV NX_CLOUD_DISTRIBUTED_EXECUTION=false

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN npm ci --only=production --silent

# Copy source code
COPY . .

# Clear cache and build
RUN npx nx reset
RUN rm -rf node_modules/.cache/nx
RUN rm -rf dist

# Build applications
RUN npx nx build main -c production && \
    npx nx build auth -c production && \
    npx nx build sportbooking -c production && \
    npx nx build management -c production

# Export applications
RUN npx nx export main -c production && \
    npx nx export auth -c production && \
    npx nx export sportbooking -c production && \
    npx nx export management -c production

# Copy exported files to main app
RUN mkdir -p dist/apps/main/exported/apps && \
    cp -rf dist/apps/auth/exported dist/apps/main/exported/apps/auth && \
    cp -rf dist/apps/sportbooking/exported dist/apps/main/exported/apps/sportbooking && \
    cp -rf dist/apps/management/exported dist/apps/main/exported/apps/management

# Production stage
FROM nginx:alpine

# Install envsubst for environment variable substitution
RUN apk add --no-cache gettext

# Copy built application
COPY --from=builder /app/dist/apps/main/exported/ /usr/share/nginx/html/

# Copy nginx configuration template
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Copy environment script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose port
EXPOSE 80

# Set entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
