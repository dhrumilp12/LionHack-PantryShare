#!/bin/bash

# PantryShare Backend Deployment Script
# This script handles deployment to various environments

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="pantryshare-backend"
DOCKER_IMAGE="pantryshare/backend"
DEFAULT_ENV="development"

# Helper functions
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

success() {
    echo -e "${GREEN}✓ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

error() {
    echo -e "${RED}✗ $1${NC}"
    exit 1
}

# Check if required commands exist
check_dependencies() {
    log "Checking dependencies..."
    
    command -v node >/dev/null 2>&1 || error "Node.js is required but not installed"
    command -v npm >/dev/null 2>&1 || error "npm is required but not installed"
    command -v docker >/dev/null 2>&1 || error "Docker is required but not installed"
    
    success "All dependencies are available"
}

# Validate environment
validate_environment() {
    local env=$1
    
    if [[ ! "$env" =~ ^(development|staging|production)$ ]]; then
        error "Invalid environment: $env. Must be one of: development, staging, production"
    fi
    
    # Check if .env file exists
    if [[ ! -f ".env.${env}" ]] && [[ ! -f ".env" ]]; then
        error "Environment file not found. Please create .env.${env} or .env"
    fi
    
    success "Environment $env is valid"
}

# Install dependencies
install_dependencies() {
    log "Installing dependencies..."
    npm ci --only=production
    success "Dependencies installed"
}

# Run tests
run_tests() {
    log "Running tests..."
    npm test
    success "All tests passed"
}

# Build application
build_app() {
    log "Building application..."
    npm run lint
    npm run build 2>/dev/null || true  # Build command might not exist
    success "Application built successfully"
}

# Build Docker image
build_docker() {
    local env=$1
    local tag="${DOCKER_IMAGE}:${env}-$(date +%Y%m%d-%H%M%S)"
    local latest_tag="${DOCKER_IMAGE}:${env}-latest"
    
    log "Building Docker image: $tag"
    
    docker build \
        --build-arg NODE_ENV=$env \
        --tag $tag \
        --tag $latest_tag \
        .
    
    success "Docker image built: $tag"
    echo $tag > .docker-tag
}

# Deploy to development
deploy_development() {
    log "Deploying to development environment..."
    
    # Stop existing containers
    docker-compose -f docker-compose.yml down 2>/dev/null || true
    
    # Start development environment
    docker-compose -f docker-compose.yml up -d
    
    # Wait for services to be healthy
    log "Waiting for services to be ready..."
    sleep 10
    
    # Health check
    if curl -f http://localhost:5000/health >/dev/null 2>&1; then
        success "Development deployment successful"
        log "Application is running at: http://localhost:5000"
    else
        error "Health check failed"
    fi
}

# Deploy to staging
deploy_staging() {
    log "Deploying to staging environment..."
    
    local image_tag=$(cat .docker-tag)
    
    # Push to registry (if configured)
    if [[ -n "$DOCKER_REGISTRY" ]]; then
        log "Pushing to registry: $DOCKER_REGISTRY"
        docker tag $image_tag $DOCKER_REGISTRY/$image_tag
        docker push $DOCKER_REGISTRY/$image_tag
        success "Image pushed to registry"
    fi
    
    # Deploy using docker-compose for staging
    export IMAGE_TAG=$image_tag
    docker-compose -f docker-compose.staging.yml up -d
    
    success "Staging deployment initiated"
}

# Deploy to production
deploy_production() {
    log "Deploying to production environment..."
    
    # Additional safety checks for production
    if [[ -z "$CONFIRM_PRODUCTION" ]]; then
        read -p "Are you sure you want to deploy to PRODUCTION? (yes/no): " confirm
        if [[ "$confirm" != "yes" ]]; then
            error "Production deployment cancelled"
        fi
    fi
    
    local image_tag=$(cat .docker-tag)
    
    # Push to registry
    if [[ -z "$DOCKER_REGISTRY" ]]; then
        error "DOCKER_REGISTRY must be set for production deployment"
    fi
    
    log "Pushing to production registry: $DOCKER_REGISTRY"
    docker tag $image_tag $DOCKER_REGISTRY/$image_tag
    docker push $DOCKER_REGISTRY/$image_tag
    
    # Deploy (this would typically use Kubernetes, AWS ECS, etc.)
    warning "Production deployment requires manual intervention or CI/CD pipeline"
    log "Image ready for production: $DOCKER_REGISTRY/$image_tag"
    
    success "Production deployment prepared"
}

# Database migration
run_migrations() {
    log "Running database migrations..."
    # Firebase doesn't require traditional migrations, but we might need to seed data
    npm run seed 2>/dev/null || warning "No seed script found"
    success "Migrations completed"
}

# Cleanup old images
cleanup() {
    log "Cleaning up old images..."
    
    # Remove images older than 7 days
    docker image prune -f --filter "until=168h" 2>/dev/null || true
    
    # Remove unused containers
    docker container prune -f 2>/dev/null || true
    
    success "Cleanup completed"
}

# Health check
health_check() {
    local url=${1:-"http://localhost:5000/health"}
    local max_attempts=30
    local attempt=1
    
    log "Performing health check on $url"
    
    while [[ $attempt -le $max_attempts ]]; do
        if curl -f $url >/dev/null 2>&1; then
            success "Health check passed (attempt $attempt)"
            return 0
        fi
        
        log "Health check attempt $attempt failed, retrying in 5 seconds..."
        sleep 5
        ((attempt++))
    done
    
    error "Health check failed after $max_attempts attempts"
}

# Main deployment function
deploy() {
    local env=${1:-$DEFAULT_ENV}
    local skip_tests=${2:-false}
    
    log "Starting deployment to $env environment"
    
    validate_environment $env
    check_dependencies
    install_dependencies
    
    if [[ "$skip_tests" != "true" ]]; then
        run_tests
    else
        warning "Skipping tests"
    fi
    
    build_app
    build_docker $env
    
    case $env in
        development)
            deploy_development
            ;;
        staging)
            deploy_staging
            ;;
        production)
            deploy_production
            ;;
    esac
    
    if [[ "$env" == "development" ]]; then
        health_check
    fi
    
    cleanup
    
    success "Deployment to $env completed successfully!"
}

# Help function
show_help() {
    cat << EOF
PantryShare Backend Deployment Script

Usage: $0 [COMMAND] [OPTIONS]

Commands:
    deploy [ENV]     Deploy to environment (development|staging|production)
    test            Run tests only
    build           Build application only
    docker [ENV]    Build Docker image only
    health [URL]    Run health check
    cleanup         Clean up old images and containers
    help            Show this help message

Options:
    --skip-tests    Skip running tests during deployment
    --force         Skip confirmation prompts

Examples:
    $0 deploy development
    $0 deploy staging --skip-tests
    $0 build
    $0 docker production
    $0 health http://localhost:5000/health

Environment Variables:
    DOCKER_REGISTRY     Docker registry URL for pushing images
    CONFIRM_PRODUCTION  Set to 'yes' to skip production confirmation
    NODE_ENV           Override environment

EOF
}

# Parse command line arguments
case "${1:-deploy}" in
    deploy)
        ENVIRONMENT=${2:-$DEFAULT_ENV}
        SKIP_TESTS=false
        
        # Check for flags
        for arg in "$@"; do
            case $arg in
                --skip-tests) SKIP_TESTS=true ;;
                --force) export CONFIRM_PRODUCTION=yes ;;
            esac
        done
        
        deploy $ENVIRONMENT $SKIP_TESTS
        ;;
    test)
        check_dependencies
        run_tests
        ;;
    build)
        check_dependencies
        install_dependencies
        build_app
        ;;
    docker)
        ENV=${2:-$DEFAULT_ENV}
        validate_environment $ENV
        check_dependencies
        build_docker $ENV
        ;;
    health)
        URL=${2:-"http://localhost:5000/health"}
        health_check $URL
        ;;
    cleanup)
        cleanup
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        error "Unknown command: $1. Use '$0 help' for usage information."
        ;;
esac
