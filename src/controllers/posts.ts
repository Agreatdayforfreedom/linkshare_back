import { Request, Response } from 'express';
import CommentPost from '../models/CommentPost';
import Post from '../models/Post';

const getPosts = async (request: Request, response: Response) => {
  try {
    const posts = await Post.find().populate('owner');
    response.json(posts);
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).json({ error: error.message });
    }
  }
};

const getPost = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const post = await Post.findById({ _id: id }).populate('owner');
    response.json(post);
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).json({ error: error.message });
    }
  }
};

const newPost = async (request: Request, response: Response) => {
  const { title, content } = request.body;
  try {
    const newPost = new Post({ title, content });
    newPost.owner = request.user._id;
    const postSaved = await newPost.save();

    return response.status(201).json(postSaved);
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).json({ error: error.message });
    }
  }
};

const updatePost = async (request: Request, response: Response) => {
  const { title, content } = request.body;
  const { id } = request.params;

  try {
    const updatePost = await Post.findById({ _id: id });
    if (updatePost) {
      if (updatePost.owner.toString() === request.user._id.toString()) {
        updatePost.title = title || updatePost.title;
        updatePost.content = content || updatePost.content;
        const postUpdated = await updatePost.save();

        response.json(postUpdated);
      } else { // error for front
        const err: Error = new Error('Error in auth, please only the user who submitted this project can update it.');
        response.status(401).json({ err: err.message });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).json({ error: error.message });
    }
  }
};

const deletePost = async (request: Request, response: Response) => {
  const { id } = request.params;
  console.log(id)
  // response.json({cascadeCommentsDelete});
  try {
    const deletePost = await Post.findById({ _id: id });
    if (deletePost) {
      if (deletePost.owner.toString() === request.user._id.toString()) {
        Promise.all([
          await deletePost.deleteOne(),
          await CommentPost.deleteMany({post: id}),
        ]);
        response.json({ msg: 'ok' });
      } else { // error for front
        const err: Error = new Error('Error in auth, please only the user who submitted this project can remove it.');
        return response.status(401).json({ err: err.message });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).json({ error: error.message });
    }
  }
};

export {
  getPosts, getPost, newPost, updatePost, deletePost,
};
