@echo off
echo 🚀 Starting Azure deployment for Expense Tracker...
echo.

echo 📝 Step 1: Logging into Azure...
azd auth login
if %errorlevel% neq 0 (
    echo ❌ Failed to login to Azure. Please check if azd is installed and try again.
    pause
    exit /b 1
)

echo.
echo 📝 Step 2: Initializing Azure Developer project...
azd init
if %errorlevel% neq 0 (
    echo ❌ Failed to initialize project. Please check the azure.yaml file.
    pause
    exit /b 1
)

echo.
echo 📝 Step 3: Deploying to Azure (this may take 10-15 minutes)...
azd up
if %errorlevel% neq 0 (
    echo ❌ Deployment failed. Please check the error messages above.
    pause
    exit /b 1
)

echo.
echo ✅ Deployment completed successfully! 
echo 📱 Check the output above for your app URLs.
echo 🌐 Your frontend will be available at the Static Web App URL
echo 🔗 Your backend API will be available at the Container App URL
echo.
pause
