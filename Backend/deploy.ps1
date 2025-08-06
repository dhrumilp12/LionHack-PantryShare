# PantryShare Backend Deployment Script (PowerShell)
# This script handles deployment to various environments on Windows

param(
    [string]$Command = "deploy",
    [string]$Environment = "development",
    [switch]$SkipTests,
    [switch]$Force,
    [string]$HealthUrl = "http://localhost:5000/health"
)

# Configuration
$ProjectName = "pantryshare-backend"
$DockerImage = "pantryshare/backend"
$DefaultEnv = "development"

# Color functions
function Write-Log {
    param([string]$Message)
    Write-Host "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠ $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "✗ $Message" -ForegroundColor Red
    exit 1
}

# Check dependencies
function Test-Dependencies {
    Write-Log "Checking dependencies..."
    
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        Write-Error "Node.js is required but not installed"
    }
    
    if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
        Write-Error "npm is required but not installed"
    }
    
    if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
        Write-Error "Docker is required but not installed"
    }
    
    Write-Success "All dependencies are available"
}

# Validate environment
function Test-Environment {
    param([string]$Env)
    
    if ($Env -notin @("development", "staging", "production")) {
        Write-Error "Invalid environment: $Env. Must be one of: development, staging, production"
    }
    
    # Check if .env file exists
    $envFile = ".env.$Env"
    if (-not (Test-Path $envFile) -and -not (Test-Path ".env")) {
        Write-Error "Environment file not found. Please create $envFile or .env"
    }
    
    Write-Success "Environment $Env is valid"
}

# Install dependencies
function Install-Dependencies {
    Write-Log "Installing dependencies..."
    npm ci --only=production
    if ($LASTEXITCODE -ne 0) { Write-Error "Failed to install dependencies" }
    Write-Success "Dependencies installed"
}

# Run tests
function Invoke-Tests {
    Write-Log "Running tests..."
    npm test
    if ($LASTEXITCODE -ne 0) { Write-Error "Tests failed" }
    Write-Success "All tests passed"
}

# Build application
function Build-App {
    Write-Log "Building application..."
    npm run lint
    if ($LASTEXITCODE -ne 0) { Write-Error "Linting failed" }
    
    # Try to run build command (might not exist)
    try {
        npm run build 2>$null
    } catch {
        Write-Warning "No build script found"
    }
    
    Write-Success "Application built successfully"
}

# Build Docker image
function Build-Docker {
    param([string]$Env)
    
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $tag = "${DockerImage}:${Env}-${timestamp}"
    $latestTag = "${DockerImage}:${Env}-latest"
    
    Write-Log "Building Docker image: $tag"
    
    docker build --build-arg NODE_ENV=$Env --tag $tag --tag $latestTag .
    if ($LASTEXITCODE -ne 0) { Write-Error "Docker build failed" }
    
    Write-Success "Docker image built: $tag"
    $tag | Out-File -FilePath ".docker-tag" -Encoding UTF8
    return $tag
}

# Deploy to development
function Deploy-Development {
    Write-Log "Deploying to development environment..."
    
    # Stop existing containers
    try {
        docker-compose -f docker-compose.yml down 2>$null
    } catch {
        Write-Warning "No existing containers to stop"
    }
    
    # Start development environment
    docker-compose -f docker-compose.yml up -d
    if ($LASTEXITCODE -ne 0) { Write-Error "Failed to start development environment" }
    
    # Wait for services to be ready
    Write-Log "Waiting for services to be ready..."
    Start-Sleep -Seconds 10
    
    # Health check
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:5000/health" -UseBasicParsing -TimeoutSec 30
        if ($response.StatusCode -eq 200) {
            Write-Success "Development deployment successful"
            Write-Log "Application is running at: http://localhost:5000"
        } else {
            Write-Error "Health check failed"
        }
    } catch {
        Write-Error "Health check failed: $($_.Exception.Message)"
    }
}

# Deploy to staging
function Deploy-Staging {
    Write-Log "Deploying to staging environment..."
    
    $imageTag = Get-Content ".docker-tag" -ErrorAction SilentlyContinue
    if (-not $imageTag) { Write-Error "No Docker image tag found" }
    
    # Push to registry (if configured)
    $dockerRegistry = $env:DOCKER_REGISTRY
    if ($dockerRegistry) {
        Write-Log "Pushing to registry: $dockerRegistry"
        docker tag $imageTag "$dockerRegistry/$imageTag"
        docker push "$dockerRegistry/$imageTag"
        if ($LASTEXITCODE -ne 0) { Write-Error "Failed to push to registry" }
        Write-Success "Image pushed to registry"
    }
    
    # Deploy using docker-compose for staging
    $env:IMAGE_TAG = $imageTag
    docker-compose -f docker-compose.staging.yml up -d
    if ($LASTEXITCODE -ne 0) { Write-Error "Staging deployment failed" }
    
    Write-Success "Staging deployment initiated"
}

# Deploy to production
function Deploy-Production {
    Write-Log "Deploying to production environment..."
    
    # Additional safety checks for production
    if (-not $Force -and -not $env:CONFIRM_PRODUCTION) {
        $confirm = Read-Host "Are you sure you want to deploy to PRODUCTION? (yes/no)"
        if ($confirm -ne "yes") {
            Write-Error "Production deployment cancelled"
        }
    }
    
    $imageTag = Get-Content ".docker-tag" -ErrorAction SilentlyContinue
    if (-not $imageTag) { Write-Error "No Docker image tag found" }
    
    # Push to registry
    $dockerRegistry = $env:DOCKER_REGISTRY
    if (-not $dockerRegistry) {
        Write-Error "DOCKER_REGISTRY environment variable must be set for production deployment"
    }
    
    Write-Log "Pushing to production registry: $dockerRegistry"
    docker tag $imageTag "$dockerRegistry/$imageTag"
    docker push "$dockerRegistry/$imageTag"
    if ($LASTEXITCODE -ne 0) { Write-Error "Failed to push to production registry" }
    
    # Deploy (this would typically use Kubernetes, AWS ECS, etc.)
    Write-Warning "Production deployment requires manual intervention or CI/CD pipeline"
    Write-Log "Image ready for production: $dockerRegistry/$imageTag"
    
    Write-Success "Production deployment prepared"
}

# Database migration
function Invoke-Migrations {
    Write-Log "Running database migrations..."
    # Firebase doesn't require traditional migrations, but we might need to seed data
    try {
        npm run seed 2>$null
    } catch {
        Write-Warning "No seed script found"
    }
    Write-Success "Migrations completed"
}

# Cleanup old images
function Remove-OldImages {
    Write-Log "Cleaning up old images..."
    
    # Remove images older than 7 days
    try {
        docker image prune -f --filter "until=168h" 2>$null
        docker container prune -f 2>$null
    } catch {
        Write-Warning "Error during cleanup"
    }
    
    Write-Success "Cleanup completed"
}

# Health check
function Test-Health {
    param([string]$Url = "http://localhost:5000/health")
    
    $maxAttempts = 30
    $attempt = 1
    
    Write-Log "Performing health check on $Url"
    
    while ($attempt -le $maxAttempts) {
        try {
            $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 5
            if ($response.StatusCode -eq 200) {
                Write-Success "Health check passed (attempt $attempt)"
                return
            }
        } catch {
            Write-Log "Health check attempt $attempt failed, retrying in 5 seconds..."
            Start-Sleep -Seconds 5
            $attempt++
        }
    }
    
    Write-Error "Health check failed after $maxAttempts attempts"
}

# Main deployment function
function Start-Deployment {
    param(
        [string]$Env,
        [bool]$SkipTestsFlag
    )
    
    Write-Log "Starting deployment to $Env environment"
    
    Test-Environment $Env
    Test-Dependencies
    Install-Dependencies
    
    if (-not $SkipTestsFlag) {
        Invoke-Tests
    } else {
        Write-Warning "Skipping tests"
    }
    
    Build-App
    Build-Docker $Env
    
    switch ($Env) {
        "development" { Deploy-Development }
        "staging" { Deploy-Staging }
        "production" { Deploy-Production }
    }
    
    if ($Env -eq "development") {
        Test-Health
    }
    
    Remove-OldImages
    
    Write-Success "Deployment to $Env completed successfully!"
}

# Show help
function Show-Help {
    @"
PantryShare Backend Deployment Script (PowerShell)

Usage: .\deploy.ps1 [OPTIONS]

Parameters:
    -Command        Command to run (deploy|test|build|docker|health|cleanup|help)
    -Environment    Environment (development|staging|production)
    -SkipTests      Skip running tests during deployment
    -Force          Skip confirmation prompts
    -HealthUrl      URL for health check

Examples:
    .\deploy.ps1 -Command deploy -Environment development
    .\deploy.ps1 -Command deploy -Environment staging -SkipTests
    .\deploy.ps1 -Command build
    .\deploy.ps1 -Command docker -Environment production
    .\deploy.ps1 -Command health -HealthUrl http://localhost:5000/health

Environment Variables:
    DOCKER_REGISTRY     Docker registry URL for pushing images
    CONFIRM_PRODUCTION  Set to 'yes' to skip production confirmation

"@
}

# Main script execution
switch ($Command.ToLower()) {
    "deploy" {
        Start-Deployment -Env $Environment -SkipTestsFlag $SkipTests
    }
    "test" {
        Test-Dependencies
        Invoke-Tests
    }
    "build" {
        Test-Dependencies
        Install-Dependencies
        Build-App
    }
    "docker" {
        Test-Environment $Environment
        Test-Dependencies
        Build-Docker $Environment
    }
    "health" {
        Test-Health $HealthUrl
    }
    "cleanup" {
        Remove-OldImages
    }
    "help" {
        Show-Help
    }
    default {
        Write-Error "Unknown command: $Command. Use '.\deploy.ps1 -Command help' for usage information."
    }
}
