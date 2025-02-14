# EduTech Scholarship Platform 🎓

![EduTech Platform](https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80)

## 📋 Overview

EduTech is a comprehensive scholarship management platform that connects students with educational opportunities. The platform facilitates the entire scholarship lifecycle, from discovery to application management, making it easier for students to find and apply for scholarships while helping administrators efficiently manage the process.

Live Demo : [Shivam Singh](https://edtech-platform.vercel.app)

### ✨ Key Features

- 🔐 User Authentication & Role-based Access
- 🎯 Smart Scholarship Matching
- 📝 Easy Application Process
- 📊 Admin Dashboard & Analytics
- 🌓 Dark/Light Theme Support
- 📱 Responsive Design
- 👥 User Management
- 📨 Application Tracking

## 🛠️ Tech Stack

### Frontend
- ⚛️ React 18
- 🎨 Tailwind CSS
- 📦 Vite
- 🔄 React Router
- 📝 TypeScript
- 🎯 Lucide React Icons
- 🍞 React Hot Toast

### Backend
- 🚀 Node.js
- 🛣️ Express.js
- 🔐 JWT Authentication
- 📦 MongoDB
- 🔄 Mongoose
- ✅ Express Validator

## 🗂️ Project Structure

```
edtech-platform/
├── frontend/                # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/       # React context providers
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript type definitions
│   └── public/            # Static assets
│
└── backend/               # Backend Node.js application
    ├── src/
    │   ├── middleware/    # Express middlewares
    │   ├── models/        # Mongoose models
    │   ├── routes/        # API routes
    │   └── index.js       # Server entry point
    └── .env              # Environment variables
```

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Git

### Clone the Repository

```bash
git clone https://github.com/yourusername/edtech-platform.git
cd edtech-platform
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/edtech
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

Start the backend server:

```bash
npm run dev
```

## 🌐 Environment Setup

### Frontend Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend Environment Variables

Required variables in `.env`:

- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `JWT_EXPIRES_IN`: JWT expiration time

## 🚦 Running the Application

### Development Mode

Frontend:
```bash
cd frontend
npm run dev
```

Backend:
```bash
cd backend
npm start
```

### Production Build

Frontend:
```bash
cd frontend
npm run build
```

Backend:
```bash
cd backend
npm start
```

## 👥 User Roles

1. **Student**
   - Browse scholarships
   - Apply for scholarships
   - Track applications

2. **Agent**
   - Manage student profiles
   - Track student applications
   - Provide guidance

3. **Admin**
   - Manage scholarships
   - User management
   - View analytics
   - System configuration


## 🔗 Connect with Me

[![Portfolio](https://img.shields.io/badge/Portfolio-255E63?style=for-the-badge&logo=About.me&logoColor=white)](https://shivam04.tech)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/shivamsingh57680/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/shibbu04/)

## 💖 Support

If you find this project helpful, please consider giving it a ⭐️!

---

Made with ❤️ by [Shivam Singh](https://shivam04.tech)