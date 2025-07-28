<div align="center">

# 💰 ExpenseTracker

### **Modern Expense Management Solution**

[![TypeScript](https://img.shields.io/badge/TypeScript-76.5%25-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-15.1%25-yellow?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Azure](https://img.shields.io/badge/Azure-Bicep-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white)](https://azure.microsoft.com/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

<p align="center">
  <img src="https://img.shields.io/github/license/JohnGabriel1998/ExpenseTracker?style=flat-square&color=5D6D7E" alt="License" />
  <img src="https://img.shields.io/github/last-commit/JohnGabriel1998/ExpenseTracker?style=flat-square&color=5D6D7E" alt="Last Commit" />
  <img src="https://img.shields.io/github/issues/JohnGabriel1998/ExpenseTracker?style=flat-square&color=5D6D7E" alt="Issues" />
  <img src="https://img.shields.io/github/stars/JohnGabriel1998/ExpenseTracker?style=flat-square&color=5D6D7E" alt="Stars" />
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-api-documentation">API</a> •
  <a href="#-contributing">Contributing</a>
</p>

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="700">

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#-installation)
  - [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 About The Project

ExpenseTracker is a modern, full-stack expense management application designed to help individuals and teams track their financial activities efficiently. Built with TypeScript and cloud-native technologies, it provides a seamless experience for managing expenses, generating reports, and gaining insights into spending patterns.

### 🎨 Screenshots

<div align="center">
  <img src="https://via.placeholder.com/800x400/0d1117/58a6ff?text=Dashboard+Screenshot" alt="Dashboard" width="800">
  <p><em>Dashboard Overview</em></p>
</div>

---

## ✨ Features

<table>
<tr>
<td>

### 💳 Expense Management
- ✅ Create, edit, and delete expenses
- ✅ Categorize expenses by type
- ✅ Attach receipts and documents
- ✅ Set recurring expenses

</td>
<td>

### 📊 Analytics & Reports
- ✅ Visual expense analytics
- ✅ Monthly/yearly reports
- ✅ Category-wise breakdown
- ✅ Export to PDF/CSV

</td>
</tr>
<tr>
<td>

### 👥 Multi-user Support
- ✅ User authentication
- ✅ Role-based access control
- ✅ Team expense sharing
- ✅ Approval workflows

</td>
<td>

### 🔧 Advanced Features
- ✅ Real-time synchronization
- ✅ Mobile responsive design
- ✅ Dark mode support
- ✅ Multi-currency support

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Frontend** | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat-square) |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white) / ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white) |
| **Cloud & DevOps** | ![Azure](https://img.shields.io/badge/Microsoft_Azure-0089D0?style=flat-square&logo=microsoft-azure&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) ![PowerShell](https://img.shields.io/badge/PowerShell-5391FE?style=flat-square&logo=powershell&logoColor=white) |

</div>

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

```bash
node -v  # Node.js 16.x or higher
npm -v   # npm 8.x or higher
docker -v # Docker 20.x or higher (optional)
```

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JohnGabriel1998/ExpenseTracker.git
   cd ExpenseTracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run database migrations**
   ```bash
   npm run migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

### 🐳 Docker Installation

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build manually
docker build -t expensetracker .
docker run -p 3000:3000 expensetracker
```

### ⚙️ Configuration

Create a `.env` file in the root directory:

```env
# Application
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=mongodb://localhost:27017/expensetracker
# or
DATABASE_URL=postgresql://user:password@localhost:5432/expensetracker

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRE=30d

# Azure Configuration (if using Azure)
AZURE_STORAGE_CONNECTION_STRING=your-connection-string
AZURE_STORAGE_CONTAINER_NAME=receipts

# Email Service
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-password
```

---

## 📖 Usage

### Basic Usage

1. **Register a new account**
   - Navigate to `/register`
   - Fill in your details
   - Verify your email

2. **Create your first expense**
   - Click "Add Expense"
   - Fill in the details
   - Upload receipt (optional)
   - Save

3. **View reports**
   - Go to Analytics section
   - Select date range
   - Export as needed

### CLI Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run tests
npm run lint         # Run linter

# Database
npm run migrate      # Run migrations
npm run seed         # Seed database

# Deployment
npm run deploy       # Deploy to Azure
```

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/auth/profile` | Get user profile |

### Expense Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses |
| POST | `/api/expenses` | Create new expense |
| GET | `/api/expenses/:id` | Get expense by ID |
| PUT | `/api/expenses/:id` | Update expense |
| DELETE | `/api/expenses/:id` | Delete expense |

### Example Request

```javascript
// Create expense
const response = await fetch('/api/expenses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    amount: 150.00,
    category: 'Food',
    description: 'Lunch meeting',
    date: '2025-07-28'
  })
});
```

---

## 🚢 Deployment

### Deploy to Azure

1. **Using Azure CLI**
   ```bash
   # Login to Azure
   az login
   
   # Create resource group
   az group create --name expensetracker-rg --location eastus
   
   # Deploy using Bicep
   az deployment group create \
     --resource-group expensetracker-rg \
     --template-file ./infrastructure/main.bicep \
     --parameters @./infrastructure/parameters.json
   ```

2. **Using PowerShell script**
   ```powershell
   ./deploy.ps1 -ResourceGroup "expensetracker-rg" -Location "eastus"
   ```

### Deploy with Docker

```bash
# Build image
docker build -t expensetracker:latest .

# Tag for registry
docker tag expensetracker:latest your-registry/expensetracker:latest

# Push to registry
docker push your-registry/expensetracker:latest
```

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

<div align="center">

### John Gabriel

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JohnGabriel1998)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/johngabriel)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your-email@example.com)

**Project Link**: [https://github.com/JohnGabriel1998/ExpenseTracker](https://github.com/JohnGabriel1998/ExpenseTracker)

</div>

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

Made with ❤️ by [John Gabriel](https://github.com/JohnGabriel1998)

</div>
