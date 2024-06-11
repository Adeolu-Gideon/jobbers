import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/customErrors.js";
import { JOB_EXPERIENCE, JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import jobModel from "../models/jobModel.js";
import userModel from "../models/userModel.js";

const withValidationErrors = (validateValues) =>{
    return [
      validateValues,
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const errorMessages = errors.array().map((error) => error.msg);
          if (errorMessages[0].startsWith("No job")) {
            throw new NotFoundError(errorMessages);
          }
          if (errorMessages[0].startsWith("Not authorized")) {
            throw new UnauthorizedError(errorMessages);
          }
          throw new BadRequestError(errorMessages);
        }
        next();
      },
    ];
};

export const validateJobInput = withValidationErrors([
  body("company")
    .notEmpty()
    .withMessage("Company is required")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Company name must be between 3 and 20 characters"),
  body("position").notEmpty().withMessage("Position is required").trim(),
  body("jobLocation").notEmpty().withMessage("Job Location is required").trim(),
  body("jobSalary").notEmpty().withMessage("Job Salary is required").trim(),
  body("jobDescription").notEmpty().withMessage("Job Description is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Invalid status value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("Invalid type value"),
  body("jobExperience")
    .isIn(Object.values(JOB_EXPERIENCE))
    .withMessage("Invalid type value"),
]);   
export const validateIdParam = withValidationErrors([
    param("id").custom(async (value, {req}) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value);
       if (!isValidId) throw new BadRequestError("Invalid MongoDB ID");

         const job = await jobModel.findById(value);
         if (!job) throw new NotFoundError(`No job found with this ID: ${value}`);
         const isAdmin = req.user.role === "admin";
         const isOwner = req.user.userId === job.createdBy.toString();
         if (!isAdmin && !isOwner) throw new UnauthorizedError("Not authorized to access this resource")
    })
]);

export const validateRegisterInput = withValidationErrors([
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email address").custom(async(email)=> {
        const user = await userModel.findOne({email});
        if (user) throw new BadRequestError("Email already exist");
    }),
    body("lastName").notEmpty().withMessage("Last Name is required"),
    body("password").notEmpty().withMessage("Password is required").isLength({min: 8}).withMessage("Password must be at least 8 characters"),
    body("location").notEmpty().withMessage("Location is required"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (email, { req }) => {
      const user = await userModel.findOne({ email });
      if (user && user._id.toString() !== req.user.userId)
        throw new BadRequestError("Email already exist");
    }),
  body("lastName").notEmpty().withMessage("Last Name is required"),
  body("location")
    .notEmpty()
    .withMessage("Location is required")
    .isLength({ min: 3 })
    .withMessage("Location must be a minimum of 3 characters"),
]);