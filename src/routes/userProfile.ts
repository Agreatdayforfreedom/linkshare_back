import express from 'express';
import { uploadProfileAvatar } from '../controllers/userProfile';
import checkAuth from '../middlewares/checkAuth';
import upload from '../utils/multer';

const routerUserProfile = express.Router();


routerUserProfile.put('/upload', checkAuth, upload.single('avatar'), uploadProfileAvatar);

export default routerUserProfile;