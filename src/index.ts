import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database';
import routerPost from './routes/post';
import routerAuth from './routes/auth';

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
connectDB();

app.use(express.json());

// routes
app.use('/post', routerPost);
app.use('/auth', routerAuth);

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
