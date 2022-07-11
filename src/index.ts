import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './database';
import routerPost from './routes/post';
import routerAuth from './routes/auth';
import routerCommentPost from './routes/commentPost';

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
connectDB();

app.use(cors())
app.use(express.json());

// routes
app.use('/post', routerPost);
app.use('/auth', routerAuth);
app.use('/comment', routerCommentPost);

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
