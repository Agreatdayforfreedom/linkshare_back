import { Request, Response } from "express";
import CommentPost from "../models/CommentPost";

const getComments = async(request: Request, response: Response) => {
  const { id } = request.params;  
  try {
    const comments = await CommentPost.find({post: id}).populate('emitter').populate('post');
    response.json(comments) 
  } catch (error) {
    if(error instanceof Error){
      response.status(500).json({error: error.message});
    }
  }
}
const newComment = async(request: Request, response: Response) => {
  const { comment, post } = request.body; 
  try {
    if(comment === '') {
      const err: Error = new Error('The comment cannot be empty');
      return response.status(400).json({ msg: err.message });
    }
    const newComment = new CommentPost({comment});
    newComment.post = post;
    newComment.emitter = request.user._id;
    const commentSaved = await newComment.save();
    response.status(201).json(commentSaved);
  } catch (error) {
    if(error instanceof Error){
      response.status(500).json({error: error.message});
    }
  }
}

const updateComment = async(request: Request, response: Response) => {
  const { id } = request.params;    
  try {
    const updateComment = await CommentPost.findById({_id: id}); 
    if(updateComment){
      if(updateComment.emitter.toString() !== request.user._id.toString()){
        const err: Error = new Error('Only the emitter can update this comment');
        return response.status(401).json({ msg: err.message});
      } 
      
      updateComment.comment = request.body.comment || updateComment.comment;
      const commentSaved = await updateComment.save();
      response.json(commentSaved);
    }
  } catch (error) {
    if(error instanceof Error){
      response.status(500).json({error: error.message});
    }
  }
}
const deleteComment = async(request: Request, response: Response) => {
  const { id } = request.params;    
  try {
    const deleteComment = await CommentPost.findById({_id: id}); 
    if(deleteComment){
      if(deleteComment.emitter.toString() !== request.user._id.toString()){
        const err: Error = new Error('Only the emitter can delete this comment');
        return response.status(401).json({ msg: err.message});
      } 
      
      await deleteComment.deleteOne();
      response.json({msg: 'ok'});
    }
  } catch (error) {
    if(error instanceof Error){
      response.status(500).json({error: error.message});
    }
  }
}


export { newComment, getComments, updateComment, deleteComment };