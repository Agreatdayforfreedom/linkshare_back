"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schemaCommentPost = new mongoose_1.default.Schema({
    comment: { type: String, required: true, trim: true },
    post: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Post' },
    emitter: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = mongoose_1.default.model('CommentPost', schemaCommentPost);
