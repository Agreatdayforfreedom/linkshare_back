import mongoose from "mongoose";

interface IPost {
  title: string;
  content: string;
}

const postSchema = new mongoose.Schema<IPost>({
  title: {type: String, required: true},
  content: {type: String, required: true},
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model('Post', postSchema);