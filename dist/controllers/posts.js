"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.newPost = exports.getPost = exports.getPosts = void 0;
const CommentPost_1 = __importDefault(require("../models/CommentPost"));
const Post_1 = __importDefault(require("../models/Post"));
const getPosts = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find().populate('owner');
        response.json(posts);
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ error: error.message });
        }
    }
});
exports.getPosts = getPosts;
const getPost = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    try {
        const post = yield Post_1.default.findById({ _id: id }).populate('owner');
        response.json(post);
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ error: error.message });
        }
    }
});
exports.getPost = getPost;
const newPost = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = request.body;
    try {
        const newPost = new Post_1.default({ title, content });
        newPost.owner = request.user._id;
        const postSaved = yield newPost.save();
        return response.status(201).json(postSaved);
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ error: error.message });
        }
    }
});
exports.newPost = newPost;
const updatePost = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = request.body;
    const { id } = request.params;
    try {
        const updatePost = yield Post_1.default.findById({ _id: id });
        if (updatePost) {
            if (updatePost.owner.toString() === request.user._id.toString()) {
                updatePost.title = title || updatePost.title;
                updatePost.content = content || updatePost.content;
                const postUpdated = yield updatePost.save();
                response.json(postUpdated);
            }
            else { // error for front
                const err = new Error('Error in auth, please only the user who submitted this project can update it.');
                response.status(401).json({ err: err.message });
            }
        }
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ error: error.message });
        }
    }
});
exports.updatePost = updatePost;
const deletePost = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    // response.json({cascadeCommentsDelete});
    try {
        const deletePost = yield Post_1.default.findById({ _id: id });
        if (deletePost) {
            if (deletePost.owner.toString() === request.user._id.toString()) {
                Promise.all([
                    yield deletePost.deleteOne(),
                    yield CommentPost_1.default.deleteMany({ post: id }),
                ]);
                response.json({ msg: 'ok' });
            }
            else { // error for front
                const err = new Error('Error in auth, please only the user who submitted this project can remove it.');
                return response.status(401).json({ err: err.message });
            }
        }
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ error: error.message });
        }
    }
});
exports.deletePost = deletePost;
