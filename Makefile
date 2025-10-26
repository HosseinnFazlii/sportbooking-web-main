# SportBooking Web Application - Docker Management

.PHONY: help build start stop restart logs clean dev prod status health

# Default target
help: ## Show this help message
	@echo "SportBooking Web Application - Docker Management"
	@echo "================================================"
	@echo ""
	@echo "Available commands:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Development commands
dev: ## Start development environment
	@echo "Starting development environment..."
	@cp env.example .env
	@docker-compose up -d --build
	@echo "Development environment started!"
	@echo "Application available at: https://courtic.ir"

# Production commands
prod: ## Start production environment
	@echo "Starting production environment..."
	@cp env.production .env
	@docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
	@echo "Production environment started!"
	@echo "Application available at: https://courtic.ir"

# Basic Docker commands
build: ## Build the application
	@echo "Building SportBooking Web Application..."
	@docker-compose build

start: ## Start the application
	@echo "Starting SportBooking Web Application..."
	@docker-compose up -d

stop: ## Stop the application
	@echo "Stopping SportBooking Web Application..."
	@docker-compose down

restart: ## Restart the application
	@echo "Restarting SportBooking Web Application..."
	@docker-compose restart

# Logging and monitoring
logs: ## Show application logs
	@docker-compose logs -f sportbooking-web

logs-all: ## Show all logs
	@docker-compose logs -f

status: ## Show container status
	@docker-compose ps

health: ## Check application health
	@echo "Checking application health..."
	@curl -f https://courtic.ir/health || echo "Health check failed"

# Maintenance commands
clean: ## Clean up containers and images
	@echo "Cleaning up Docker resources..."
	@docker-compose down -v
	@docker system prune -f
	@docker image prune -f

clean-all: ## Clean up all Docker resources
	@echo "Cleaning up all Docker resources..."
	@docker-compose down -v --rmi all
	@docker system prune -af
	@docker volume prune -f

# Environment setup
setup: ## Setup environment files
	@echo "Setting up environment files..."
	@if [ ! -f .env ]; then cp env.example .env; echo "Created .env from env.example"; fi
	@echo "Environment setup complete!"

# Update commands
update: ## Update and restart application
	@echo "Updating SportBooking Web Application..."
	@git pull origin main
	@docker-compose down
	@docker-compose up -d --build
	@echo "Update complete!"

# Backup commands
backup: ## Backup configuration and logs
	@echo "Creating backup..."
	@mkdir -p backups
	@cp .env backups/.env.backup.$(shell date +%Y%m%d_%H%M%S)
	@docker-compose logs sportbooking-web > backups/logs_$(shell date +%Y%m%d_%H%M%S).log
	@echo "Backup created in backups/ directory"

# Security commands
security-check: ## Run security checks
	@echo "Running security checks..."
	@docker-compose exec sportbooking-web nginx -t
	@echo "Nginx configuration is valid"

# Development helpers
shell: ## Access container shell
	@docker-compose exec sportbooking-web sh

nginx-reload: ## Reload nginx configuration
	@docker-compose exec sportbooking-web nginx -s reload

# Quick start commands
quick-start: setup dev ## Quick start for development
	@echo "Quick start complete! Application running at https://courtic.ir"

quick-prod: setup prod ## Quick start for production
	@echo "Production deployment complete! Application running at https://courtic.ir"
