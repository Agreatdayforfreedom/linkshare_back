import express from 'express';
import {
  getPosts, getPost, newPost, updatePost, deletePost,
} from '../controllers/posts';
import checkAuth from '../middlewares/checkAuth';

const routerPost = express.Router();

routerPost.get('/', getPosts);
routerPost.get('/:id', getPost);
routerPost.post('/new', checkAuth, newPost);
routerPost.put('/update/:id', checkAuth, updatePost);
routerPost.delete('/delete/:id', checkAuth, deletePost);

export default routerPost;
