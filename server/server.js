import express from 'express';
import cors from 'cors';
import http from 'http';
import 'dotenv/config';
import { connectDB } from './lib/db.js';
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { Server } from 'socket.io';

// creating app and HTTP server
const app = express();
const server = http.createServer(app);

// initializing socket.io
export const io = new Server(server, {
  cors: {
    origin: [
      'https://quick-chat-backend-ecru.vercel.app',
      'http://localhost:5173',
    ],
    credentials: true,
  },
  path: '/socket.io/',
  transports: ['websocket', 'polling'],
  allowEIO3: true,
});

//store online users
export const userSocketMap = {}; //{userId:socketId}

// io.on [receive event]
// io.emit [send event]

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('WebSocket connection established');
  const userId = socket.handshake.query.userId;

  console.log(`User ${userId} connected`);
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // emit online users to all connected client
  io.emit('getOnlineUsers', Object.keys(userSocketMap));
  socket.on('disconnect', () => {
    console.log(`User ${userId} disconnected`);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

// middlewares
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/status', (req, res) => {
  res.status(200).json({ message: 'Server is live..' });
});
app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);

// connecting to DB
connectDB();

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
}

// export server for vercel
export default server;
