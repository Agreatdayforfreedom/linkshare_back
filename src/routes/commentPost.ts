import express from 'express';
import { newComment, getComments } from '../controllers/commentPost';
import checkAuth from '../middlewares/checkAuth';

const routerCommentPost = express.Router();

routerCommentPost.get('/', getComments)
routerCommentPost.post('/new', checkAuth, newComment)

export default routerCommentPost;

