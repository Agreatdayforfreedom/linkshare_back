import express from 'express';
import { connectDB } from './database';
import routerPost from './routes/post';

const PORT: number = 4000;

const app = express();
connectDB();

app.use(express.json());
//routes
app.use('/post', routerPost);

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});