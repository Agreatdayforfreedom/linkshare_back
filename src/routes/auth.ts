import express from 'express';
import { login, profile, signup } from '../controllers/auth';
import checkAuth from '../middlewares/checkAuth';

const routerAuth = express.Router();

routerAuth.post('/signup', signup);
routerAuth.post('/login', login);
routerAuth.get('/profile', checkAuth, profile);

export default routerAuth;
