import { StatusCodes } from "http-status-codes";
import userModel from "../models/userModel.js";
import jobModel from "../models/jobModel.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import cloudinary from "cloudinary";
import {promises as fs} from "fs";

export const getCurrentUsers = async (req, res) => {
    const user = await userModel.findById({_id: req.user.userId});

    if(!user) throw new UnauthenticatedError('You are not authorized');

    // Remove password from response
    const userWithoutPassword = user.toJSON();

    res.status(StatusCodes.OK).json({ user: userWithoutPassword });
}

export const getApplicationStats = async (req, res) => {
    const users = await userModel.countDocuments();
    const jobs = await jobModel.countDocuments();
    
    res.status(StatusCodes.OK).json({ users, jobs });
}

export const updateUser = async (req, res) => {
    // Remove password from the request
    const newUser = {...req.body};
    delete newUser.password;
    
    if(req.file) {
      // Upload image to cloudinary
      const uploadedImage = await cloudinary.v2.uploader.upload(req.file.path);

      // Deletes the file from the local file system
      await fs.unlink(req.file.path);

      // Save the image url and public_id to the database
      newUser.avatar = uploadedImage.secure_url;
      newUser.avatarPublicId = uploadedImage.public_id;
    }

    const updatedUser = await userModel.findByIdAndUpdate(req.user.userId, newUser)

    // Remove old image from cloudinary if user already uploaded a new one
    if(req.file && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }

     res.status(StatusCodes.OK).json({ message: "User Updated" });
}
