QuickChat - Real-time MERN Stack Chat Application

![image](https://github.com/user-attachments/assets/33986255-5ad0-48ef-866f-f4b68df68b85)
![image](https://github.com/user-attachments/assets/5672a4ae-2b72-4d0d-a36d-ae1f886ef2c8)
![image](https://github.com/user-attachments/assets/ebd22bdb-bbd6-4133-be90-453bf804e771)
![image](https://github.com/user-attachments/assets/fed94850-7ab6-4e35-8e1c-7aa2e5cfa69f)

Overview
QuickChat is a real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.IO. It enables instant messaging, live online status, and media sharing across devices.

Features
Real-time Messaging: Instant delivery and updates.

User Authentication: Secure signup/login with JWT.

Private Chats: One-on-one conversations.

User Profiles: Customizable avatars and bios.

Live Online Status: See who's active.

Unread Indicators: Track unseen messages.

Rich Media: Share images (Cloudinary integration).

Responsive Design: Optimized for all devices using Tailwind CSS.

Technologies Used
Frontend (React)
React.js: UI library.

Vite: Build tool.

Tailwind CSS: Styling.

Axios: HTTP client.

Socket.IO Client: Real-time communication.

React Router DOM: Routing.

React Hot Toast: Notifications.

Backend (Node.js/Express)
Node.js: Runtime.

Express.js: Web framework.

MongoDB/Mongoose: Database & ODM.

Socket.IO: Real-time engine.

bcryptjs: Password hashing.

jsonwebtoken (JWT): Authentication.

dotenv: Environment variables.

Cloudinary: Image storage.

cors: Cross-Origin Resource Sharing.

Project Structure
client/: React frontend (source, build output in dist/).

server/: Node.js/Express backend (controllers, models, routes, server.js).

Getting Started
Prerequisites
Node.js (v18+)

npm or Yarn

MongoDB Atlas Account

Local Setup
Clone: git clone <your-repo-url>

Backend (server/):

cd server

npm install

Create server/.env:

PORT=5000
MONGO_URI=<Your Atlas URI>
JWT_SECRET=<Your Secret>
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

npm start

Frontend (client/):

cd ../client

npm install

Create client/.env:

VITE_BACKEND_URL=http://localhost:5000

npm run dev

Deployment (Vercel)
For combined frontend (static) and backend (serverless) deployment on Vercel, use a vercel.json in your project root:

{
  "version": 2,
  "builds": [
    { "src": "client/index.html", "use": "@vercel/static-build", "config": { "distDir": "client/dist" } },
    { "src": "server/server.js", "use": "@vercel/node", "config": { "includeFiles": ["server/**"] } }
  ],
  "routes": [
    { "src": "/socket.io/(.*)", "dest": "server/server.js" },
    { "src": "/api/(.*)", "dest": "server/server.js" },
    { "src": "/(.*)", "dest": "client/$1" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "https://quick-chat-mern.vercel.app" },
        { "key": "Access-Control-Allow-Methods", "value": "GET, POST, PUT, DELETE, OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "X-Requested-With, Content-Type, Authorization, token" }
      ]
    }
  ]
}

Important Vercel Environment Variables:
Set MONGO_URI, JWT_SECRET, and CLOUDINARY_* in your backend Vercel project.
Set VITE_BACKEND_URL to your deployed backend URL (e.g., https://quick-chat-backend-ecru.vercel.app) in your frontend Vercel project.
