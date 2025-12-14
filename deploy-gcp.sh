#!/bin/bash

# GCP Deployment Script for Sweet Shop Management System
# Prerequisites: gcloud CLI installed and authenticated

set -e

echo "🚀 Sweet Shop GCP Deployment Script"
echo "===================================="

# Configuration - UPDATE THESE
PROJECT_ID="${GCP_PROJECT_ID:-your-gcp-project-id}"
REGION="${GCP_REGION:-us-central1}"
DB_INSTANCE_NAME="sweet-shop-db"
DB_NAME="sweet_shop"
DB_USER="postgres"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Using Project: $PROJECT_ID${NC}"
echo -e "${YELLOW}Using Region: $REGION${NC}"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}Error: gcloud CLI is not installed${NC}"
    echo "Install from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Set project
echo -e "\n${GREEN}Setting GCP project...${NC}"
gcloud config set project $PROJECT_ID

# Enable required APIs
echo -e "\n${GREEN}Enabling required APIs...${NC}"
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable sqladmin.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Create Cloud SQL instance (if not exists)
echo -e "\n${GREEN}Checking Cloud SQL instance...${NC}"
if ! gcloud sql instances describe $DB_INSTANCE_NAME &> /dev/null; then
    echo "Creating Cloud SQL PostgreSQL instance..."
    gcloud sql instances create $DB_INSTANCE_NAME \
        --database-version=POSTGRES_14 \
        --tier=db-f1-micro \
        --region=$REGION \
        --root-password=$(openssl rand -base64 32)
    
    # Create database
    gcloud sql databases create $DB_NAME --instance=$DB_INSTANCE_NAME
    
    # Set password (you should change this!)
    DB_PASSWORD=$(openssl rand -base64 24)
    gcloud sql users set-password $DB_USER \
        --instance=$DB_INSTANCE_NAME \
        --password=$DB_PASSWORD
    
    echo -e "${YELLOW}Database password: $DB_PASSWORD${NC}"
    echo -e "${RED}SAVE THIS PASSWORD! It won't be shown again.${NC}"
else
    echo "Cloud SQL instance already exists"
fi

# Get Cloud SQL connection name
CONNECTION_NAME=$(gcloud sql instances describe $DB_INSTANCE_NAME --format='value(connectionName)')
echo -e "Connection name: $CONNECTION_NAME"

# Build and deploy backend
echo -e "\n${GREEN}Building and deploying backend...${NC}"
cd backend

# Build the image
gcloud builds submit --tag gcr.io/$PROJECT_ID/sweet-shop-backend

# Deploy to Cloud Run
gcloud run deploy sweet-shop-backend \
    --image gcr.io/$PROJECT_ID/sweet-shop-backend \
    --region $REGION \
    --platform managed \
    --allow-unauthenticated \
    --add-cloudsql-instances $CONNECTION_NAME \
    --set-env-vars "NODE_ENV=production" \
    --set-env-vars "DB_HOST=/cloudsql/$CONNECTION_NAME" \
    --set-env-vars "DB_PORT=5432" \
    --set-env-vars "DB_DATABASE=$DB_NAME" \
    --set-env-vars "DB_USERNAME=$DB_USER" \
    --set-secrets "DB_PASSWORD=db-password:latest" \
    --set-secrets "JWT_SECRET=jwt-secret:latest"

# Get backend URL
BACKEND_URL=$(gcloud run services describe sweet-shop-backend --region $REGION --format='value(status.url)')
echo -e "${GREEN}Backend deployed at: $BACKEND_URL${NC}"

cd ..

# Build and deploy frontend
echo -e "\n${GREEN}Building and deploying frontend...${NC}"
cd frontend

# Update environment variable for production API URL
echo "VITE_API_URL=$BACKEND_URL/api" > .env.production

# Build the image
gcloud builds submit --tag gcr.io/$PROJECT_ID/sweet-shop-frontend

# Deploy to Cloud Run
gcloud run deploy sweet-shop-frontend \
    --image gcr.io/$PROJECT_ID/sweet-shop-frontend \
    --region $REGION \
    --platform managed \
    --allow-unauthenticated

# Get frontend URL
FRONTEND_URL=$(gcloud run services describe sweet-shop-frontend --region $REGION --format='value(status.url)')
echo -e "${GREEN}Frontend deployed at: $FRONTEND_URL${NC}"

cd ..

# Update backend CORS
echo -e "\n${GREEN}Updating backend CORS settings...${NC}"
gcloud run services update sweet-shop-backend \
    --region $REGION \
    --set-env-vars "CORS_ORIGIN=$FRONTEND_URL"

echo -e "\n${GREEN}===================================${NC}"
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo -e "${GREEN}===================================${NC}"
echo -e "Frontend: ${YELLOW}$FRONTEND_URL${NC}"
echo -e "Backend API: ${YELLOW}$BACKEND_URL${NC}"
echo -e "\n${YELLOW}Next steps:${NC}"
echo "1. Create secrets in Secret Manager:"
echo "   gcloud secrets create db-password --data-file=-"
echo "   gcloud secrets create jwt-secret --data-file=-"
echo "2. Grant Cloud Run access to secrets"
echo "3. Test the application at $FRONTEND_URL"
