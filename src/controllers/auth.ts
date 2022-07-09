import { Request, Response } from 'express';
import generateToken from '../utils/generateJwt';
import User from '../models/User';

const signup = async(request: Request, response: Response) => {
  const { username, email, password } = request.body;
  try {
    const userNameExists = await User.findOne({username});
    if(userNameExists){
      const err: Error = new Error(`Username already exists`);
      return response.status(400).json({msg: err.message});
    }

    const newUser = await User.create({username, email, password});
    response.status(201).json({
      token: generateToken(newUser._id)
    });

  } catch (error) {
    if (error instanceof Error) {
      response.status(500).json({error: error.message});
    }
  }
}
const login = async(request: Request, response: Response) => {
  const { username, password } = request.body;
  //email is optional
  try {
    const login = await User.findOne({username});
    if(!login) {
      const err: Error = new Error('Incorrect username or password');
      return response.status(400).json({msg: err.message});
    }
    if(login){
      if(!await login.verifyPassword(password)){
        const err: Error = new Error('Incorrect username or password');
        return response.status(400).json({msg: err.message});
      }
      response.json({token: generateToken(login._id)});
    }

  } catch (error) {
    if (error instanceof Error){
      response.status(500).json({error: error.message});
    } 
  }
}

const profile = async(request: Request, response: Response) => {
  response.json(request.user);
}


export { signup, login, profile };