"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    owner: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
// postSchema.virtual('messages', {
//   ref: 'CommentPost',
//   localField: '_id',
//   foreignField: 'post',
//   count: true
// });
exports.default = mongoose_1.default.model('Post', postSchema);
