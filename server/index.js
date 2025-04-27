import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from 'path';
import cors from 'cors';
import { log } from "console";
import mongoose from "mongoose";
import Song from "./models/songs.model.js";
import videoRoutes from "./routes/videos.js";
import signUploadRoutes from "./routes/sign-upload.js"
import { errorHandler, notFound } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary"
import multer from "multer"
import audioRoutes from "./routes/audio-upload.js"
import authRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";
dotenv.config();
const app  = express();
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
const allowedOrigins = [process.env.FRONTEND_URL];
if (process.env.NODE_ENV === 'development') {
  allowedOrigins.push('http://localhost:5173'); // Allow local dev
}

app.use(express.urlencoded({ extended: true }));
const storage = multer.memoryStorage();
const upload = multer({ storage });

  cloudinary.config({
    cloud_name:process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    api_key:process.env.REACT_APP_CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
  })

app.use(cors({
  origin: process.env.FRONTEND_URL,  // Make sure this is the correct URL for your frontend
  credentials: true, 
}));
app.use(express.json()); 









// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },  credentials: true,               // ✅ Allow cookies
// }));


app.use("/api/videos",videoRoutes)
app.use("api/sign-upload" , signUploadRoutes)
app.use("/api/audio-upload",audioRoutes)
app.use('/api/users',authRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT , ()=>{
    console.log(process.env.MONGOURI);
  
    connectDB();
      console.log('server at' + PORT); 
  }); 