#!/bin/sh

# Exit on any error
set -e

# Function to log messages
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

log "Starting SportBooking Web Application..."

# Set default environment variables if not provided
export NGINX_SERVER_NAME=${NGINX_SERVER_NAME:-localhost}
export NGINX_CLIENT_MAX_BODY_SIZE=${NGINX_CLIENT_MAX_BODY_SIZE:-500M}
export API_BASE_URL=${API_BASE_URL:-http://api-server:3030/}

log "Environment variables:"
log "  NGINX_SERVER_NAME: $NGINX_SERVER_NAME"
log "  NGINX_CLIENT_MAX_BODY_SIZE: $NGINX_CLIENT_MAX_BODY_SIZE"
log "  API_BASE_URL: $API_BASE_URL"

# Generate nginx configuration from template
log "Generating nginx configuration..."
envsubst '${NGINX_SERVER_NAME} ${NGINX_CLIENT_MAX_BODY_SIZE} ${API_BASE_URL}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Test nginx configuration
log "Testing nginx configuration..."
nginx -t

# Start nginx
log "Starting nginx..."
exec "$@"
