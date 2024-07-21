# Task Manager Application

This project is a task management application similar to Trello. It allows users to create, update, and manage tasks within different columns, with drag-and-drop functionality. Users can sign up, log in, and log in via Google.

## Features

- User authentication (sign up, login, Google login)
- Create, update, and delete tasks
- Drag-and-drop tasks between columns
- Server-side validation
- Responsive user interface

## Technologies Used

- **Frontend:**
  - Vite
  - React
  - Tailwind CSS
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB Atlas account (or a local MongoDB instance)

## Installation

### Frontend

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager/frontend
   
2. **Install dependencies:**
 ```bash  
# Using npm
npm install
```

3. **Start the development server:**
```bash
### Using npm
npm run dev
```

### Backend

1. **Navigate to the backend directory:**
```bash
cd ../backend
```

2. **Install dependencies:**

```bash
# Using npm
npm install
```

3. **Set up environment variables:**

Create a .env file in the backend directory with the following content:

```bash
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
Start the server:


# Using npm
npm start
```

### Usage
1. Open your browser and go to http://localhost:5173/ to view the application.
2. Sign up for a new account or log in with your existing account.
3. Create, update, and manage tasks within different columns.

### Contribution
1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature-branch).
5. Create a new Pull Request.
