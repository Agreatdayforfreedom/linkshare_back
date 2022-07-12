import mongoose from 'mongoose';

interface IPost {
  title: string;
  content: string;
  owner: mongoose.Types.ObjectId;
}

const postSchema = new mongoose.Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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

export default mongoose.model('Post', postSchema);
