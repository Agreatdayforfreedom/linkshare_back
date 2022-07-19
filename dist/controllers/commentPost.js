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
exports.deleteComment = exports.updateComment = exports.getComments = exports.newComment = void 0;
const CommentPost_1 = __importDefault(require("../models/CommentPost"));
const getComments = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    try {
        const comments = yield CommentPost_1.default.find({ post: id }).populate('emitter').populate('post');
        response.json(comments);
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ error: error.message });
        }
    }
});
exports.getComments = getComments;
const newComment = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { comment, post } = request.body;
    try {
        if (comment === '') {
            const err = new Error('The comment cannot be empty');
            return response.status(400).json({ msg: err.message });
        }
        const newComment = new CommentPost_1.default({ comment });
        newComment.post = post;
        newComment.emitter = request.user._id;
        const commentSaved = yield newComment.save();
        response.status(201).json(commentSaved);
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ error: error.message });
        }
    }
});
exports.newComment = newComment;
const updateComment = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    try {
        const updateComment = yield CommentPost_1.default.findById({ _id: id });
        if (updateComment) {
            if (updateComment.emitter.toString() !== request.user._id.toString()) {
                const err = new Error('Only the emitter can update this comment');
                return response.status(401).json({ msg: err.message });
            }
            updateComment.comment = request.body.comment || updateComment.comment;
            const commentSaved = yield updateComment.save();
            response.json(commentSaved);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ error: error.message });
        }
    }
});
exports.updateComment = updateComment;
const deleteComment = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    try {
        const deleteComment = yield CommentPost_1.default.findById({ _id: id });
        if (deleteComment) {
            if (deleteComment.emitter.toString() !== request.user._id.toString()) {
                const err = new Error('Only the emitter can delete this comment');
                return response.status(401).json({ msg: err.message });
            }
            yield deleteComment.deleteOne();
            response.json({ msg: 'ok' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ error: error.message });
        }
    }
});
exports.deleteComment = deleteComment;
