import {StatusCodes} from "http-status-codes";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async(req, res) => {
    const isFirstUser = await userModel.countDocuments() === 0;
    req.body.role = isFirstUser ? "admin" : "user";

    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    const user = await userModel.create(req.body);
    res.status(StatusCodes.CREATED).json({message: "User registered successfully"});
}                                      

export const login = async (req, res) => {
  const user = await userModel.findOne({email:req.body.email});
  const isValidUser = user && (await comparePassword(req.body.password, user.password));
 if (!isValidUser) throw new UnauthenticatedError("Invalid credential");
 
const token = createJWT({userId:user._id, role:user.role});

const oneDay = 1000 *60*60*24;

res.cookie("token", token, {
  httpOnly:true, expires:new Date(Date.now()+oneDay),
  secure: process.env.NODE_ENV ==="production",
});
 res.status(StatusCodes.OK).json({message:"user logged in"})
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly:true, expires:new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({message:"user logged out"})
}