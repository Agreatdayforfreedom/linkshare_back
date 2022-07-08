import { Request, Response } from 'express';
import Post from '../models/Post';

const getPosts = async(request: Request, response: Response) => {
  try {
    const posts = await Post.find();
    response.json(posts);
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).json({error: error.message});
    }
  }
}

const getPost = async(request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const post = await Post.findById({_id: id});
    response.json(post);
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).json({error: error.message});
    }
  }
}

const newPost = async(request: Request, response: Response) => {
  const { title, content } = request.body;
  try {
    const newPost = new Post({ title, content });
    const postSaved = await newPost.save();
    
    return response.status(201).json(postSaved);

  } catch (error) {
    if (error instanceof Error) {
      response.status(500).json({error: error.message});
    }
  }
}

const updatePost = async(request: Request, response: Response) => {
  const { title, content } = request.body;
  const { id } = request.params;

  try {
    const updatePost = await Post.findById({_id: id});
    if(updatePost) {
      updatePost.title = title || updatePost.title;
      updatePost.content = content || updatePost.content;
      const postUpdated = await updatePost.save();

      response.json(postUpdated);
    }

  } catch (error) {
    if (error instanceof Error) {
      response.status(500).json({error: error.message});
    }
  }
}

const deletePost = async(request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const deletePost = await Post.findById({_id: id});
    if(deletePost) {
      deletePost.delete();
      response.json({msg: 'ok'});
    }
  } catch (error) {
    if(error instanceof Error) {
      response.status(500).json({error: error.message});
    } 
  }
}

export { getPosts, getPost, newPost, updatePost, deletePost };