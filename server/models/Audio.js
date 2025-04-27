import mongoose from "mongoose";

const AudioSchema = new mongoose.Schema({
    title: {type:String, required: true},
    artist: {type:String, required: true},
    audioUrl: {type:String, required: true},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  
  {timestamps: true}
);
  
  const Audio = mongoose.model("Audio", AudioSchema);
  
  export default Audio;  