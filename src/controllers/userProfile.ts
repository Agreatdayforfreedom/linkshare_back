import { Request, Response } from "express";
import cloudinary from 'cloudinary';
import User from "../models/User";


const uploadProfileAvatar = async(request: Request, response: Response) => {
  
  if(!request.file){
    const err: Error = new Error('There is an error uploading profile image'); 
    return response.status(500).json({err: err.message});
  }
  try {
    const { path } = request.file;
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      width: 200, height: 200, gravity: "face", radius: "max", effect: "sharpen", crop: "thumb"
    };
    const uploadUserAvatar = await User.findById({_id: request.user._id});
    if(!uploadUserAvatar){
      const err: Error = new Error('There is an error uploading profile image');
      return response.status(500).json({err: err.message});
    }

    if(uploadUserAvatar.avatar){
      const { avatar } = uploadUserAvatar;
      const splitSlash = avatar.split('/');
      const idCloud = splitSlash[splitSlash.length - 1].split('.')[0];

      await cloudinary.v2.uploader.destroy(idCloud);
    }


      // Upload the image
    const result = await cloudinary.v2.uploader.upload(path, options);
    uploadUserAvatar.avatar = result.secure_url;
    await uploadUserAvatar.save(); 
    response.json({msg: 'Profile image uploaded successfully'})
      
  } catch (error) {
    if(error instanceof Error) {
      response.status(500).json({message: error.message});
    }
  }
}

export { uploadProfileAvatar };