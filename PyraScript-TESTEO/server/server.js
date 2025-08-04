import express from 'express';
import cors from 'cors';
import http from 'http';
import WebSocket from 'ws';
import connectDB from './db.js';
import config from './config.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors());
app.use(express.json());

// WebSocket
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('🔌 Nuevo cliente conectado');
  ws.on('message', (message) => {
    console.log('📩 Mensaje recibido:', message.toString());
  });
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Iniciar servidor
connectDB().then(() => {
  server.listen(config.PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${config.PORT}`);
  });
});