import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './database';
import routerPost from './routes/post';
import routerAuth from './routes/auth';
import routerCommentPost from './routes/commentPost';
import cloudinary from 'cloudinary';
import routerUserProfile from './routes/userProfile';

// Return "https" URLs by setting secure: true
cloudinary.v2.config({
  cloud_name: 'dxge0fbsg', 
  api_key: '717573123345951', 
  api_secret: 'DAENqQKwLdajA9V18_xdQ3seR9E',
  secure: true
});

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
connectDB();

app.use(cors())
app.use(express.json());
// app.use(express.urlencoded({ limit: 5000, extended: true }));


// routes
app.use('/post', routerPost);
app.use('/auth', routerAuth);
app.use('/comment', routerCommentPost);
app.use('/profile', routerUserProfile);

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
