"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentPost_1 = require("../controllers/commentPost");
const checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
const routerCommentPost = express_1.default.Router();
routerCommentPost.get('/:id', commentPost_1.getComments);
routerCommentPost.post('/new', checkAuth_1.default, commentPost_1.newComment);
routerCommentPost.put('/update/:id', checkAuth_1.default, commentPost_1.updateComment);
routerCommentPost.delete('/delete/:id', checkAuth_1.default, commentPost_1.deleteComment);
exports.default = routerCommentPost;
