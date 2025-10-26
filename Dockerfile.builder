## COMMANDS:
# docker build -t web-client-build-cache -f Dockerfile.builder .

# ---- Build Cache ----
FROM node:18-alpine as builder

ENV NODE_ENV build
ENV DOMAIN_URL /
ENV REMOTE_PORTS auth:*,sportbooking:*,management:*
ENV API_HOST http://support.rismun.ir:3030/api/

USER node
WORKDIR /home/node

# Install app dependencies
COPY package*.json ./
# RUN npm install --package-lock-only --force
RUN npm ci

# Copy app source code
COPY --chown=node:node . .

# Clear Cache
RUN npx nx reset
# RUN npx nx cache clear
RUN rm -rf node_modules/.cache/nx
RUN rm -rf dist

# Build and export the applications
RUN npx nx build main -c production && \
    npx nx build auth -c production && \
    npx nx build sportbooking -c production && \
    npx nx build management -c production && \
    npx nx export main -c production && \
    npx nx export auth -c production && \
    npx nx export sportbooking -c production && \
    npx nx export management -c production && \
    mkdir -p dist/apps/main/exported/apps && \
    cp -rf dist/apps/auth/exported dist/apps/main/exported/apps/auth && \
    cp -rf dist/apps/sportbooking/exported dist/apps/main/exported/apps/sportbooking && \
    cp -rf dist/apps/management/exported dist/apps/main/exported/apps/management

RUN npm prune --production