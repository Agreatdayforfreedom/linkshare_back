import express from 'express';
import { getPosts, getPost, newPost, updatePost, deletePost } from '../controllers/posts';

const routerPost = express.Router();

routerPost.get('/', getPosts);
routerPost.get('/:id', getPost);
routerPost.post('/new', newPost);
routerPost.put('/update/:id', updatePost);
routerPost.delete('/delete/:id', deletePost);

export default routerPost;

