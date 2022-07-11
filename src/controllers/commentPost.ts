import { Request, Response } from "express";
import CommentPost from "../models/CommentPost";

const getComments = async(request: Request, response: Response) => {
  const { post } = request.body;    
  try {
    const comments = await CommentPost.find({post});
    response.json(comments) 
  } catch (error) {
    console.log(error);
  }
}
const newComment = async(request: Request, response: Response) => {
  const { comment, post } = request.body; 
  try {
    const newComment = new CommentPost({comment});
    newComment.post = post;
    newComment.emitter = request.user._id;
    const commentSaved = await newComment.save();
    response.status(201).json(commentSaved);
  } catch (error) {
    console.log(error);
  }
}

export { newComment, getComments };