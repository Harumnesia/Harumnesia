#!/bin/bash

# Deployment script for Harumnesia Backend
# Usage: chmod +x deploy.sh && ./deploy.sh

set -e

echo "🚀 Starting Harumnesia Backend Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version)
print_status "Node.js version: $NODE_VERSION"

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Copying from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        print_warning "Please edit .env file with your actual values before continuing."
        read -p "Press enter after editing .env file..."
    else
        print_error ".env.example file not found. Please create .env file manually."
        exit 1
    fi
fi

# Install dependencies
print_status "Installing production dependencies..."
npm ci --production

# Create logs directory if it doesn't exist
if [ ! -d "logs" ]; then
    print_status "Creating logs directory..."
    mkdir -p logs
fi

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    print_warning "PM2 is not installed. Installing PM2 globally..."
    npm install -g pm2
fi

# Stop existing PM2 process if running
print_status "Stopping existing PM2 processes..."
pm2 stop harumnesia-api 2>/dev/null || true
pm2 delete harumnesia-api 2>/dev/null || true

# Start the application with PM2
print_status "Starting application with PM2..."
npm run pm2:start

# Save PM2 configuration
print_status "Saving PM2 configuration..."
pm2 save

# Setup PM2 startup script
print_status "Setting up PM2 startup script..."
pm2 startup

print_status "✅ Deployment completed successfully!"
print_status "Application is running on PM2 as 'harumnesia-api'"
print_status ""
print_status "Useful commands:"
print_status "  npm run pm2:logs     - View application logs"
print_status "  npm run pm2:restart  - Restart application"
print_status "  npm run pm2:stop     - Stop application"
print_status "  pm2 monit           - Monitor application"
print_status ""
print_status "Application should be available at: http://localhost:${PORT:-5001}"
