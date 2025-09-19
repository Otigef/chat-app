# 💬 Chat Application

A modern, real-time chat application built with React, Node.js, Express, Socket.IO, and MongoDB. Features user authentication, real-time messaging, and a responsive design.

## ✨ Features

- 🔐 **User Authentication**: Sign up, login, and secure session management
- 💬 **Real-time Messaging**: Instant message delivery using Socket.IO
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS and DaisyUI
- 🔍 **User Search**: Find and connect with other users
- 📱 **Mobile Responsive**: Works seamlessly on desktop and mobile devices
- 🔊 **Sound Notifications**: Audio alerts for new messages
- 🎭 **Emoji Support**: Rich emoji picker for expressive conversations
- 💾 **Message Persistence**: All messages stored in MongoDB

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library
- **React Router DOM** - Client-side routing
- **Socket.IO Client** - Real-time communication
- **Zustand** - State management
- **React Hot Toast** - Notification system

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Cookie Parser** - Cookie handling

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chat-app
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_DB_URI=mongodb://localhost:27017/chat-app
   JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
   ```

## 🚀 Running the Application

### Option 1: Quick Start (Recommended)
```bash
# Install all dependencies and start both servers
npm run install-all
npm run dev
```

### Option 2: Using the PowerShell Startup Script
```bash
.\start-servers.ps1
```

### Option 3: Manual Setup

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Start the backend server**
   ```bash
   npm run server
   # or
   node backend/server.js
   ```

3. **Start the frontend development server** (in a new terminal)
   ```bash
   npm run client
   # or
   cd frontend && npm run dev
   ```

## 🌐 Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Socket.IO**: http://localhost:5000

## 📁 Project Structure

```
chat-app/
├── backend/
│   ├── controllers/          # Route controllers
│   │   ├── auth.controller.js
│   │   ├── message.controller.js
│   │   └── user.controller.js
│   ├── db/
│   │   └── connectToMongoDB.js
│   ├── middleware/
│   │   └── protectRoute.js
│   ├── models/               # MongoDB models
│   │   ├── conversation.model.js
│   │   ├── message.model.js
│   │   └── user.model.js
│   ├── routes/               # API routes
│   │   ├── auth.routes.js
│   │   ├── message.routes.js
│   │   └── user.routes.js
│   ├── socket/
│   │   └── socket.js         # Socket.IO configuration
│   ├── utils/
│   │   └── generateToken.js
│   └── server.js             # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── messages/     # Message-related components
│   │   │   ├── sidebar/      # Sidebar components
│   │   │   └── skeletons/    # Loading skeletons
│   │   ├── context/          # React contexts
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Page components
│   │   ├── utils/            # Utility functions
│   │   └── zustand/          # State management
│   ├── public/               # Static assets
│   └── package.json
├── .env                      # Environment variables
├── start-servers.ps1         # Startup script
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users/` - Get all users
- `GET /api/users/profile/:username` - Get user profile

### Messages
- `GET /api/messages/:id` - Get messages for a conversation
- `POST /api/messages/send/:id` - Send a message

## 🔌 Socket.IO Events

### Client to Server
- `sendMessage` - Send a new message
- `joinRoom` - Join a conversation room

### Server to Client
- `newMessage` - Receive a new message
- `typing` - User typing indicator
- `stopTyping` - User stopped typing

## 🎨 UI Components

### Message Components
- `MessageInput` - Message composition
- `Messages` - Message display container
- `Message` - Individual message component
- `MessageContainer` - Message wrapper

### Sidebar Components
- `Sidebar` - Main sidebar
- `Conversations` - Conversation list
- `SearchInput` - User search
- `LogoutButton` - User logout

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes middleware
- CORS configuration
- Input validation and sanitization

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or use a cloud MongoDB service
2. Update the `MONGO_DB_URI` in your `.env` file
3. Deploy to services like Heroku, Vercel, or AWS

### Frontend Deployment
1. Build the frontend: `npm run build --prefix frontend`
2. Deploy the `frontend/dist` folder to services like Netlify, Vercel, or AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by popular chat applications
- Uses open-source libraries and frameworks

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/your-repo/chat-app/issues) page
2. Create a new issue with detailed information
3. Contact the development team

---

**Happy Chatting! 💬✨**