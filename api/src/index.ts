import path from 'node:path';
import http from 'node:http';

import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import { router } from './router';

mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const PORT = 3001;

    const app = express();
    const server = http.createServer(app);
    const io = new Server(server);

    io.on('connect', () => {
      console.log('connected');
    });

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

    app.use(express.json());

    app.use(router);

    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(() => console.log('error connecting to MongoDB'));

