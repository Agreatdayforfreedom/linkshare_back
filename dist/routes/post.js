"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_1 = require("../controllers/posts");
const checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
const routerPost = express_1.default.Router();
routerPost.get('/', posts_1.getPosts);
routerPost.get('/:id', posts_1.getPost);
routerPost.post('/new', checkAuth_1.default, posts_1.newPost);
routerPost.put('/update/:id', checkAuth_1.default, posts_1.updatePost);
routerPost.delete('/delete/:id', checkAuth_1.default, posts_1.deletePost);
exports.default = routerPost;
