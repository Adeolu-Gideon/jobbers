import "express-async-errors";
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

// Routers
import jobRouter from "./routes/jobRoute.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

// Public
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";

// Error Middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Alternative to __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.static(path.resolve(__dirname, './public')));
app.use(cookieParser());
app.use(express.json());


app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.get("*", (req, res) => { res.sendFile(path.resolve(__dirname, "./public", "index.html")); });

app.use("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000
try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}
