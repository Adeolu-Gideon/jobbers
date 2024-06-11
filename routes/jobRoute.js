import { Router } from "express";

const router = Router();

import {
  getSingleJob,
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobController.js";
import { validateIdParam, validateJobInput } from "../middleware/validationMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

router.get("/", getAllJobs);
router.get("/stats", showStats);
router.get("/:id", validateIdParam, getSingleJob);
router.post("/", upload.single("companyLogo"), validateJobInput, createJob);
router.patch(
  "/:id",
  upload.single("companyLogo"),
  validateJobInput,
  validateIdParam,
  updateJob
);
router.delete("/:id", validateIdParam, deleteJob);

export default router;