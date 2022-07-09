import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface IPayload {
  _id: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user: any //to build interface
    }
  }
}

const checkAuth = async (request: Request, response: Response, next: NextFunction) => {
  let token: string = '';
  let simple: string = request.headers.authorization as string;

  try {
    if(simple && simple.toLowerCase().startsWith('bearer')) {
      token = simple.split(' ')[1];

      //decoded
      const payload = jwt.verify(token, process.env.JWT_SECRET as string) as IPayload;

      request.user = await User.findById({_id: payload._id as string}).select('-password');

      return next();
    }
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).json({msg: error.message});
    }
  }

  if(!token) {
    const err: Error = new Error('There was a mistake');
    return response.status(500).json({err});
  }
}

export default checkAuth;