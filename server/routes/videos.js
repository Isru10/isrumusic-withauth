import express from "express";
import { createVideo } from "../controllers/video.js";
const router = express.Router()
router.post("/",createVideo);
// made a copy
export default router;