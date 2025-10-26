# SportBooking Web Application - Docker Deployment Guide

This guide will help you deploy the SportBooking web application using Docker and Docker Compose.

## 📋 Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)
- Git (to clone the repository)

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repository-url>
cd sportbooking-web-main

# Copy environment file
cp env.example .env

# Edit environment variables
nano .env
```

### 2. Configure Environment Variables

Edit the `.env` file with your specific configuration:

```bash
# Web application settings
WEB_PORT=80
NGINX_SERVER_NAME=courtic.ir
NGINX_CLIENT_MAX_BODY_SIZE=500M

# API configuration
API_BASE_URL=https://api.courtic.ir/

# Optional: Enable proxy
ENABLE_PROXY=false
PROXY_PORT=8080
```

### 3. Build and Deploy

```bash
# Build and start the application
docker-compose up -d --build

# Check if containers are running
docker-compose ps

# View logs
docker-compose logs -f sportbooking-web
```

## 🔧 Configuration Options

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `WEB_PORT` | `80` | Port for the web application |
| `NGINX_SERVER_NAME` | `courtic.ir` | Server name for nginx |
| `NGINX_CLIENT_MAX_BODY_SIZE` | `500M` | Maximum file upload size |
| `API_BASE_URL` | `https://api.courtic.ir/` | Backend API URL |
| `ENABLE_PROXY` | `false` | Enable nginx proxy service |
| `PROXY_PORT` | `8080` | Port for proxy service |

### Production Configuration

For production deployment, use the `env.production` file:

```bash
# Copy production environment
cp env.production .env

# Edit production settings
nano .env
```

## 🐳 Docker Commands

### Basic Commands

```bash
# Build the application
docker-compose build

# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Update and restart
docker-compose up -d --build
```

### Advanced Commands

```bash
# Run with specific environment file
docker-compose --env-file env.production up -d

# Scale services (if needed)
docker-compose up -d --scale sportbooking-web=2

# View container status
docker-compose ps

# Execute commands in container
docker-compose exec sportbooking-web sh

# View resource usage
docker stats
```

## 🔒 Security Configuration

### SSL/HTTPS Setup

1. **Obtain SSL certificates** (Let's Encrypt, commercial CA, or self-signed)

2. **Update environment variables**:
```bash
ENABLE_HTTPS=true
SSL_CERT_PATH=/path/to/cert.pem
SSL_KEY_PATH=/path/to/key.pem
```

3. **Update nginx configuration** for HTTPS (modify `nginx.conf.template`)

### Firewall Configuration

```bash
# Allow HTTP traffic
sudo ufw allow 80/tcp

# Allow HTTPS traffic
sudo ufw allow 443/tcp

# Allow SSH (if needed)
sudo ufw allow 22/tcp
```

## 📊 Monitoring and Logs

### Health Checks

The application includes health check endpoints:

- **Health endpoint**: `http://your-domain/health`
- **Docker health check**: Built into the container

### Log Management

```bash
# View application logs
docker-compose logs sportbooking-web

# View nginx logs
docker-compose logs sportbooking-web | grep nginx

# Follow logs in real-time
docker-compose logs -f sportbooking-web

# View logs with timestamps
docker-compose logs -t sportbooking-web
```

### Log Rotation

Create a log rotation configuration:

```bash
# Create logrotate configuration
sudo nano /etc/logrotate.d/sportbooking

# Add the following content:
/var/lib/docker/containers/*/sportbooking-web*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 644 root root
}
```

## 🔄 Updates and Maintenance

### Application Updates

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build

# Clean up old images
docker system prune -f
```

### Backup Strategy

```bash
# Backup environment configuration
cp .env .env.backup

# Backup nginx configuration
cp nginx.conf.template nginx.conf.template.backup

# Backup logs (if needed)
docker-compose logs sportbooking-web > logs/backup-$(date +%Y%m%d).log
```

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use**:
```bash
# Check what's using the port
sudo netstat -tulpn | grep :80

# Kill the process or change the port
```

2. **Container won't start**:
```bash
# Check logs
docker-compose logs sportbooking-web

# Check container status
docker-compose ps

# Restart container
docker-compose restart sportbooking-web
```

3. **API connection issues**:
```bash
# Verify API_BASE_URL in .env
# Check if API server is accessible
curl -I $API_BASE_URL
```

### Debug Mode

```bash
# Run in debug mode
DEBUG=true docker-compose up

# Access container shell
docker-compose exec sportbooking-web sh

# Check nginx configuration
docker-compose exec sportbooking-web nginx -t
```

## 📈 Performance Optimization

### Resource Limits

Add resource limits to `docker-compose.yml`:

```yaml
services:
  sportbooking-web:
    # ... existing configuration
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
        reservations:
          memory: 256M
          cpus: '0.25'
```

### Caching

The nginx configuration includes:
- Gzip compression
- Static asset caching
- Browser caching headers

### Load Balancing

For high-traffic scenarios, consider:
- Multiple container instances
- External load balancer (HAProxy, Nginx)
- CDN for static assets

## 🔧 Development vs Production

### Development
```bash
# Use development environment
cp env.example .env
# Edit .env for development settings
docker-compose up -d
```

### Production
```bash
# Use production environment
cp env.production .env
# Edit .env for production settings
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 📞 Support

If you encounter issues:

1. Check the logs: `docker-compose logs -f`
2. Verify environment variables: `docker-compose config`
3. Test nginx configuration: `docker-compose exec sportbooking-web nginx -t`
4. Check container health: `docker-compose ps`

## 📝 Additional Notes

- The application uses multi-stage Docker builds for optimization
- Nginx serves static files with proper caching headers
- Health checks ensure container reliability
- Environment variables allow flexible configuration
- Logs are available for monitoring and debugging

For more information, refer to the Docker and Docker Compose documentation.
