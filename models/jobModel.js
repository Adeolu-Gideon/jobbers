import mongoose from "mongoose";
import { JOB_EXPERIENCE, JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    jobExperience: {
      type: String,
      enum: Object.values(JOB_EXPERIENCE),
      default: JOB_EXPERIENCE.ENTRY_LEVEL,
    },
    jobLocation: {
      type: String,
      default: "remote",
    },
    jobSalary: {
      type: String,
      default: "To be decided",
    },
    jobDescription: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    companyLogo: String,
    companyLogoPublicId: String,
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema)