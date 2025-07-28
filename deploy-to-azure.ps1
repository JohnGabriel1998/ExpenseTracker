# Azure Deployment Script
# Run this script after restarting your terminal to ensure azd and az commands are available

Write-Host "🚀 Starting Azure deployment for Expense Tracker..." -ForegroundColor Green

# Step 1: Login to Azure
Write-Host "📝 Step 1: Logging into Azure..." -ForegroundColor Yellow
azd auth login

# Step 2: Initialize the project
Write-Host "📝 Step 2: Initializing Azure Developer project..." -ForegroundColor Yellow
azd init

# Step 3: Deploy to Azure
Write-Host "📝 Step 3: Deploying to Azure (this may take 10-15 minutes)..." -ForegroundColor Yellow
azd up

Write-Host "✅ Deployment completed! Check the output above for your app URLs." -ForegroundColor Green
Write-Host "📱 Your frontend will be available at the Static Web App URL" -ForegroundColor Cyan
Write-Host "🔗 Your backend API will be available at the Container App URL" -ForegroundColor Cyan
