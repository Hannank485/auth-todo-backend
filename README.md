#  Task Management API

A RESTful API for managing tasks with user authentication, built with Node.js and Express following MVC architecture.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-121212?style=for-the-badge)

##  Features

-  **Secure Authentication** - JWT-based auth with bcrypt password hashing
-  **Task CRUD** - Full create, read, update, delete operations
-  **Data Isolation** - Users only see their own tasks
-  **Clean Architecture** - MVC pattern with separated concerns
-  **Security** - SQL injection prevention, protected routes

##  Tech Stack

**Runtime:** Node.js  
**Framework:** Express.js  
**Database:** SQLite     
**Authentication:** JWT, bcrypt  
**Architecture:** MVC (Routes → Controllers → Services → Models)

##  API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | ❌ |
| POST | `/auth/login` | Login user | ❌ |

### Tasks
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/tasks` | Get all user tasks | ✅ |
| POST | `/tasks` | Create new task | ✅ |
| PUT | `/tasks/:id` | Toggle task completion | ✅ |
| DELETE | `/tasks/:id` | Delete task | ✅ |

##  Project Structure
```
backend/
├── routes/              # API endpoint definitions
│   ├── auth.js
│   └── tasks.js
├── controllers/         # Request/response handling
│   ├── authController.js
│   └── taskController.js
├── services/            # Business logic layer
│   ├── authService.js
│   └── taskService.js
├── models/              # Database access layer
│   ├── userModel.js
│   └── taskModel.js
├── middleware/
│   └── authMiddleware.js
├── db.js                # Database configuration
├── server.js            # Application entry point
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Hannank485/auth-todo-backend
cd auth-todo-backend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```env
JWT_SECRET= your-super-secret-key-here
PORT=3000
```

4. Run the development server
```bash
npm run dev
```

Server will run on `http://localhost:3000`

##  Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `JWT_SECRET` | Secret key for JWT token signing | ✅ |
| `PORT` | Server port (default: 3000) | ❌ |

##  API Testing (REST Client)

```bash
### Register
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "password123"
}

###

### Login
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "password123"
}

###

### Get Tasks (Protected)
GET http://localhost:3000/tasks
Authorization: YOUR_JWT_TOKEN

###

### Create Task (Protected)
POST http://localhost:3000/tasks
Content-Type: application/json
Authorization: YOUR_JWT_TOKEN

{
"task": "Create a Job Tracker to track job applications"
}

###

### Toggle Task Completion (Protected)
PUT http://localhost:3000/tasks/1
Authorization: YOUR_JWT_TOKEN

###

### Delete Task (Protected)
DELETE http://localhost:3000/tasks/1
Authorization: YOUR_JWT_TOKEN
```
