import express from "express";
import { createAudio, deleteAudio, demoDelete, getAudios, updateAudio } from "../controllers/audio-upload.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router()
router.post("/",protect,createAudio);

router.get("/",getAudios);

router.post("/:id",protect,updateAudio);
  
router.delete('/:id',protect,deleteAudio);
router.get('/demo',demoDelete);
export default router;