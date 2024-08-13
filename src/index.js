'use strict';
const express = require('express');
const app = express();
const PORT = 3002;
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const monogURL = process.env.MONGO_URL;
mongoose
  .connect(monogURL)
  .then(() => console.log('DB接続中...'))
  .catch((err) => console.log(err));

app.use(
  cors({
  origin: '*', // すべてのオリジンを許可
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 許可するHTTPメソッド
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'X-CSRF-Token'
  ] // 許可するヘッダー
  })
);
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.listen(PORT, () => {
  console.log('サーバーが立ち上がっています');
});
