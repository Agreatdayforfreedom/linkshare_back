import express from 'express';
import { newComment, getComments, updateComment, deleteComment } from '../controllers/commentPost';
import checkAuth from '../middlewares/checkAuth';

const routerCommentPost = express.Router();

routerCommentPost.get('/:id', getComments);
routerCommentPost.post('/new', checkAuth, newComment);
routerCommentPost.put('/update/:id', checkAuth, updateComment);
routerCommentPost.delete('/delete/:id', checkAuth, deleteComment);

export default routerCommentPost;

