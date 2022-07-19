import mongoose from 'mongoose';

interface ICommentPost {
  comment: string;
  post: mongoose.Types.ObjectId;
  emitter: mongoose.Types.ObjectId;
}

const schemaCommentPost = new mongoose.Schema<ICommentPost>({
  comment: { type: String, required: true, trim: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  emitter: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model('CommentPost', schemaCommentPost);