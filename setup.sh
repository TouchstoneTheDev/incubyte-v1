#!/bin/bash

# Sweet Shop Management System - Setup Script
# This script will set up the entire application

set -e

echo "🍬 Welcome to Sweet Shop Management System Setup!"
echo "=================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18 or higher.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version: $(node -v)${NC}"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo -e "${YELLOW}⚠️  PostgreSQL CLI not found. Make sure PostgreSQL is installed and running.${NC}"
else
    echo -e "${GREEN}✅ PostgreSQL is installed${NC}"
fi

echo ""
echo "📦 Installing dependencies..."
echo ""

# Install root dependencies
echo "Installing root dependencies..."
npm install

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo -e "${GREEN}✅ Dependencies installed successfully!${NC}"
echo ""

# Setup environment files
echo "🔧 Setting up environment files..."

# Backend .env
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo -e "${GREEN}✅ Created backend/.env from backend/.env.example${NC}"
    echo -e "${YELLOW}⚠️  Please update backend/.env with your database credentials${NC}"
else
    echo -e "${YELLOW}⚠️  backend/.env already exists, skipping...${NC}"
fi

# Frontend .env
if [ ! -f frontend/.env ]; then
    cp frontend/.env.example frontend/.env
    echo -e "${GREEN}✅ Created frontend/.env from frontend/.env.example${NC}"
else
    echo -e "${YELLOW}⚠️  frontend/.env already exists, skipping...${NC}"
fi

echo ""
echo "🗄️  Database Setup Instructions:"
echo "================================"
echo "1. Make sure PostgreSQL is running"
echo "2. Create the database:"
echo "   psql -U postgres"
echo "   CREATE DATABASE sweet_shop;"
echo "   \\q"
echo ""
echo "Or run: psql -U postgres -c 'CREATE DATABASE sweet_shop;'"
echo ""

# Ask if user wants to create the database now
read -p "Would you like to create the database now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Creating database..."
    if psql -U postgres -c 'CREATE DATABASE sweet_shop;' 2>/dev/null; then
        echo -e "${GREEN}✅ Database created successfully!${NC}"
    else
        echo -e "${YELLOW}⚠️  Database might already exist or there was an error.${NC}"
    fi
fi

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "To start the application:"
echo ""
echo "Option 1 - Run both servers concurrently:"
echo "  npm run dev"
echo ""
echo "Option 2 - Run servers separately:"
echo "  Terminal 1: cd backend && npm run dev"
echo "  Terminal 2: cd frontend && npm run dev"
echo ""
echo "Option 3 - Using Docker:"
echo "  docker-compose up"
echo ""
echo "Access the application:"
echo "  Frontend: http://localhost:5173"
echo "  Backend:  http://localhost:3001"
echo "  Health:   http://localhost:3001/health"
echo ""
echo "To run tests:"
echo "  Backend: cd backend && npm test"
echo "  Frontend: cd frontend && npm test"
echo ""
echo -e "${GREEN}Happy coding! 🍬${NC}"
