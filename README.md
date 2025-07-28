# Expense Tracker Web Application

A full-stack expense tracking application built with React, Node.js, Express, and MongoDB.

## Features

- 🔐 User authentication (login/register)
- 📊 Dashboard with expense analytics and charts
- 💰 Add, edit, and delete expenses
- 🏷️ Custom expense categories (Boarding House, Gas, Water, Electric Bill, Foods, Shopping, Travel, Others)
- 💴 Japanese Yen (¥) currency support
- 📅 Date filtering and search
- 📱 Responsive design with Material-UI

## Tech Stack

### Frontend
- React 18 with TypeScript
- Material-UI (MUI) for UI components
- Chart.js for data visualization
- React Router for navigation
- Axios for API calls

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd ExpensesTrackWebapp
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd frontend
npm install
```

### Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your-jwt-secret-key
PORT=5000
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
ExpensesTrackWebapp/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # Express routes
│   ├── middleware/      # Custom middleware
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── contexts/    # React contexts
│   │   ├── pages/       # Page components
│   │   └── types/       # TypeScript types
│   └── public/
└── README.md
```

## Deployment

This application can be deployed to various platforms:

- **Azure**: Using Azure App Service for both frontend and backend
- **Vercel/Netlify**: For frontend with backend on Heroku/Railway
- **Docker**: Containerized deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
