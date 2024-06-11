import jobModel from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";


// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { jobLocation: { $regex: search, $options: "i" } },
    ];
  }

  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // Pagination
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;

  const jobs = await jobModel
    .find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalJobs = await jobModel.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
};

// GET SINGLE JOB
export const getSingleJob = async (req, res) => {
  const job = await jobModel.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

// CREATE JOB
export const createJob = async (req, res) => {
  try {
    const { company } = req.body;
    req.body.createdBy = req.user.userId;

    // Check if a logo for this company already exists
    const existingCompanyJob = await jobModel.findOne({ company });
    if (
      existingCompanyJob &&
      existingCompanyJob.companyLogo &&
      existingCompanyJob.companyLogoPublicId
    ) {
      req.body.companyLogo = existingCompanyJob.companyLogo;
      req.body.companyLogoPublicId = existingCompanyJob.companyLogoPublicId;
    } else if (req.file) {
      // Upload image to Cloudinary
      const uploadedImage = await cloudinary.v2.uploader.upload(req.file.path);

      // Delete the file from the local file system
      await fs.unlink(req.file.path);

      // Save the image URL and public_id to the req.body
      req.body.companyLogo = uploadedImage.secure_url;
      req.body.companyLogoPublicId = uploadedImage.public_id;
    }

    // Create the job with the provided data
    const job = await jobModel.create(req.body);

    // Send the response
    res.status(StatusCodes.CREATED).json({ job });
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while creating the job." });
  }
};


// UPDATE JOB
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const existingJob = await jobModel.findById(jobId);

    if (!existingJob) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Job not found." });
    }

    const { company } = req.body;
    let oldLogoPublicId;

    if (req.file) {
      // Check if the logo already exists for this company
      const existingCompanyJob = await jobModel.findOne({ company });
      if (existingCompanyJob && existingCompanyJob.companyLogoPublicId) {
        req.body.companyLogo = existingCompanyJob.companyLogo;
        req.body.companyLogoPublicId = existingCompanyJob.companyLogoPublicId;
      } else {
        // Upload new image to Cloudinary
        const uploadedImage = await cloudinary.v2.uploader.upload(
          req.file.path
        );

        // Delete the file from the local file system
        await fs.unlink(req.file.path);

        // Save the new image URL and public_id to the update object
        req.body.companyLogo = uploadedImage.secure_url;
        req.body.companyLogoPublicId = uploadedImage.public_id;

        // Store the old logo public_id
        oldLogoPublicId = existingJob.companyLogoPublicId;
      }
    }

    // Update the job in the database
    const updatedJob = await jobModel.findByIdAndUpdate(jobId, req.body, {
      new: true,
      runValidators: true,
    });

    // Remove old logo from Cloudinary if a new one was uploaded and the old one exists
    if (
      req.file &&
      oldLogoPublicId &&
      req.body.companyLogoPublicId !== oldLogoPublicId
    ) {
      await cloudinary.v2.uploader.destroy(oldLogoPublicId);
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while updating the job." });
  }
};


// export const updateJob = async (req, res) => {
//  try {
//   const jobId = req.params.id;
//   const existingJob = await jobModel.findById(jobId);

//   if (!existingJob) {
//     return res.status(StatusCodes.NOT_FOUND).json({ message: "Job not found" });
//   }

//    const newJobUpdate = req.body;
//    let oldLogoPublicId;
   
//    if (req.file) {
//      // Upload image to cloudinary
//      const uploadedImage = await cloudinary.v2.uploader.upload(req.file.path);

//      // Deletes the file from the local file system
//      await fs.unlink(req.file.path);

//      // Save the new image url and public_id to the database
//      newJobUpdate.companyLogo = uploadedImage.secure_url;
//      newJobUpdate.companyLogoPublicId = uploadedImage.public_id;

//      // Save the old image public_id
//      oldLogoPublicId = existingJob.companyLogoPublicId;
//    }

//    // Update the job in the database
//    const updatedJob = await jobModel.findByIdAndUpdate(jobId, newJobUpdate, {
//      new: true, runValidators: true
//    });

//    // Remove old logo from cloudinary if user already uploaded a new one
//    if (req.file && oldLogoPublicId) {
//      await cloudinary.v2.uploader.destroy(oldLogoPublicId);
//    }

//    res
//      .status(StatusCodes.OK)
//      .json({ message: "Job updated successfully", job: updatedJob });
//  } catch (error) {
//   console.error(error);
//   res
//     .status(StatusCodes.INTERNAL_SERVER_ERROR)
//     .json({ error: "An error occurred while updating the job." });
//  }
// };

// DELETE JOB
export const deleteJob = async (req, res) => {
  const deletedJob = await jobModel.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ message: "Job deleted successfully", job: deletedJob });
};

// SHOW STATISTICS
export const showStats = async (req, res) => {
  let stats = await jobModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let dailyApplications = await jobModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 } },
    { $limit: 6 },
  ]);

  dailyApplications = dailyApplications.map((item) => {
    const {
      _id: { year, month, day },
      count,
    } = item;

    return {
      date: `${day}/${month}/${year}`,
      count,
    };
  });
  // .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, dailyApplications });
};

