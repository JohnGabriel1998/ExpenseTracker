# 🚀 Azure Deployment Guide for Expense Tracker

## Prerequisites
- ✅ Azure Developer CLI (azd) - **INSTALLED**
- ✅ Azure CLI (az) - **INSTALLED**
- ✅ Git repository pushed to GitHub - **COMPLETED**

## 🎯 Quick Deployment (Recommended)

### Option 1: Using Azure Developer CLI (azd)

1. **Restart your terminal/PowerShell** to ensure `azd` and `az` commands are available
2. **Run the deployment script:**
   ```powershell
   .\deploy-to-azure.ps1
   ```

### Option 2: Manual Steps

1. **Restart your terminal** and run these commands:
   ```bash
   # Login to Azure
   azd auth login
   
   # Initialize project (reads azure.yaml)
   azd init
   
   # Deploy everything to Azure
   azd up
   ```

## 🛠️ Alternative: Azure CLI Deployment

If `azd` doesn't work, use Azure CLI:

```powershell
.\deploy-azure-cli.ps1
```

## 📋 What Gets Created in Azure

Your deployment will create these resources:

| Resource | Type | Purpose |
|----------|------|---------|
| **Resource Group** | Container | Groups all resources |
| **Static Web App** | Frontend | Hosts your React app |
| **Container App** | Backend | Runs your Node.js API |
| **Container Registry** | Registry | Stores Docker images |
| **Cosmos DB** | Database | MongoDB-compatible database |
| **Container Apps Environment** | Platform | Container hosting environment |
| **Log Analytics** | Monitoring | Application logs and metrics |
| **Managed Identity** | Security | Secure service-to-service auth |

## 🌐 Expected Deployment Flow

1. **Authentication**: Login to Azure
2. **Resource Creation**: ~5-10 minutes
3. **Backend Build**: Docker image creation and push
4. **Frontend Build**: React app build and deployment
5. **Configuration**: Environment variables setup

## 📱 Post-Deployment

After successful deployment, you'll get:

- **Frontend URL**: `https://your-app.azurestaticapps.net`
- **Backend API URL**: `https://your-backend.azurecontainerapps.io`

## 🔧 Troubleshooting

### If `azd` command not found:
1. Restart your terminal/PowerShell
2. Or use full path: `"C:\Program Files\Microsoft SDKs\Azure\Azure Dev CLI\azd.cmd"`

### If deployment fails:
1. Check Azure subscription permissions
2. Ensure resource names are unique
3. Try alternative deployment method

### If apps don't work after deployment:
1. Check Container App logs in Azure Portal
2. Verify environment variables are set
3. Check CORS settings in backend

## 💡 Next Steps After Deployment

1. **Custom Domain**: Add your own domain to Static Web App
2. **SSL Certificate**: Enable HTTPS (automatic with Static Web Apps)
3. **Monitoring**: Set up Application Insights
4. **CI/CD**: Configure GitHub Actions for automatic deployments
5. **Scaling**: Configure auto-scaling rules for Container App

## 🔒 Security Considerations

- All secrets are stored securely in Azure
- Managed Identity is used for service-to-service authentication
- HTTPS is enforced on all endpoints
- Database connection strings are encrypted

## 💰 Cost Estimation

With Azure Free Tier:
- **Static Web App**: Free tier (100GB bandwidth/month)
- **Container App**: ~$10-20/month for basic usage
- **Cosmos DB**: ~$25/month minimum
- **Container Registry**: ~$5/month for storage

**Total estimated cost**: ~$40-50/month for basic usage

---

## 🚀 Ready to Deploy?

1. **Restart your terminal**
2. **Navigate to your project**: `cd c:\ExpensesTrackWebapp`
3. **Run**: `.\deploy-to-azure.ps1`

Good luck with your deployment! 🎉
