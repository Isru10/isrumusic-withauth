import mongoose from "mongoose";

// Define Schema
const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  url: { type: String, required: true },
});

// Create Model
const Song = mongoose.model("Song", songSchema);

export default Song;
