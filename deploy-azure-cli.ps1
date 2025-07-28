# Alternative Azure Deployment using Azure CLI
# Use this if azd doesn't work

Write-Host "🚀 Alternative Azure deployment using Azure CLI..." -ForegroundColor Green

# Variables
$resourceGroup = "rg-expense-tracker"
$location = "East US"
$appName = "expense-tracker-$(Get-Random -Minimum 1000 -Maximum 9999)"

# Step 1: Login to Azure
Write-Host "📝 Step 1: Logging into Azure..." -ForegroundColor Yellow
az login

# Step 2: Create Resource Group
Write-Host "📝 Step 2: Creating resource group..." -ForegroundColor Yellow
az group create --name $resourceGroup --location $location

# Step 3: Deploy Bicep template
Write-Host "📝 Step 3: Deploying infrastructure..." -ForegroundColor Yellow
az deployment group create `
  --resource-group $resourceGroup `
  --template-file ./infra/main.bicep `
  --parameters environmentName=$appName location=$location

Write-Host "✅ Infrastructure deployment completed!" -ForegroundColor Green
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Build and push your Docker image to the created Container Registry" -ForegroundColor White
Write-Host "2. Update the Container App with your Docker image" -ForegroundColor White
Write-Host "3. Connect your GitHub repo to the Static Web App" -ForegroundColor White
