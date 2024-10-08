const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const monogURL = process.env.MONGO_URL;

mongoose
  .connect(monogURL as string)
  .then(() => console.log('DB接続中...'))
  .catch((err: Error) => console.log(err));

// プレフライトリクエストを処理
app.use(cors())
app.options('*', cors()); // これでOPTIONSメソッドのリクエストも処理されます
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

app.listen(port, () => {
  console.log('サーバーが立ち上がっています');
});
