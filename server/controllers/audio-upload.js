import Audio from "../models/Audio.js";
import cloudinary from "cloudinary";
// i chanegd someting here 
export const createAudio = async(req,res)=>{
  // title: String,
    // artist: String,
    // audiourl: String,
    const {title,audioUrl,artist} = req.body;
    if(!title || !audioUrl || !artist){
        // res.status(400)
        // return next(new Error("imgurl & videourl needed"))
        return res.status(400).json({success:false , error:"title & audioUrl & artist needed"})
    }
        try{


            console.log(title,artist,audioUrl)
            const audio = await Audio.create({
                title,
                artist,
                audioUrl,
                user: req.user._id
            });
            res.status(201).json({success:true,audio});

            // my aduio url : https://res.cloudinary.com/dni9bl2pk/video/upload/v1743767995/zsnxuyz8sutslrkb5rm1.mp3
        }
        catch(error){
            console.log(error)
            res.status(500).json({success:false , error:error.message})
            // next(error);
        }    
}

export const getAudios = async (req, res) => {
    try {
      const audios = await Audio.find(); // Fetch audios with only relevant fields
      res.status(200).json(audios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
  export const updateAudio = async (req,res)=>{
    try {
        const { title, artist, audioUrl } = req.body;
        console.log(req.body)
      
        // Find existing audio
        const audio = await Audio.findById(req.params.id);
        if (!audio) return res.status(404).json({ error: "Audio not found" });
        
        // console.log(audio.audioUrl, audioUrl)

        // res.status(200).json({"audio url":audioUrl, "previos audio url":audio.audioUrl})
      if (audio.user.toString() !== req.user.id) {
        return res.status(401).json({ error: "Unauthorized update" });
      }
        // Delete old Cloudinary file if a new one is uploaded
        if ( audioUrl && audio.audioUrl !== audioUrl) {
          // Delete old Cloudinary file
        //await cloudinary.uploader.destroy(audio.public_id, { resource_type: "video" });
        // res.status(200).json({"inside audio url":audioUrl, "inside block previos audio url":audio.audioUrl})

        const urlParts = audio.audioUrl.split("/");
        const fileWithExt = urlParts.slice(-1)[0]; // e.g. song.mp3
        const folder = urlParts.slice(-2)[0];      // e.g. audio_uploads
        const publicId = `${folder}/${fileWithExt.split(".")[0]}`;
  
        // Optional: console.log to verify publicId
        console.log("Deleting Cloudinary file:", publicId);
  
        // await cloudinary.uploader.destroy(publicId, { resource_type: "video" }).then(result=>console.log(result));

               cloudinary.v2.uploader.destroy(publicId, {resource_type: "video", invalidate:true})
        // cloudinaryResult= JSON.stringify(cloudinaryResult)
        // console.log(cloudinaryResult)
        }        
        // Update audio details
        audio.title = title;
        audio.artist = artist;
        audio.audioUrl = audioUrl;
        console.log("this is audio url ",audio.audioUrl)
        // const finaldeal =  await audio.findOneAndUpdate({ _id: req.params.id }, audio);
        const finaldeal  = await audio.save();
        console.log(finaldeal)
        res.json(finaldeal);
    
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    
}

  







export const deleteAudio = async (req, res) => {
    try {
      const audio = await Audio.findById(req.params.id);
      if (!audio) return res.status(404).json({ error: "Audio not found" });
  
      // Extract public_id from URL
    //   let publicId = audio.audioUrl.split("/").pop().split(".")[0];
    //   publicId= `audios/${publicId}`
    
  if (audio.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized to delete this audio" });
  }


    const url = audio.audioUrl;
    const publicId = url.split('/')
      .slice(-2) // Takes last two parts (folder/filename or just filename)
      .join('/') // Joins them with /
      .replace(/\..+$/, ''); // Removes extension



    // const urlParts = audio.audioUrl.split("/");
    // const fileWithExt = urlParts.slice(-1)[0]; // e.g. song.mp3
    // const folder = urlParts.slice(-2)[0];      // e.g. audio_uploads
    // const publicId = `${folder}/${fileWithExt.split(".")[0]}`;

      // Delete from Cloudinary
//       const cloudinaryResult  = await cloudinary.uploader.destroy(publicId, { resource_type: "video", invalidate:true})
          

      console.log("before proceeding the public_id is ",publicId)
        cloudinary.v2.uploader.destroy(publicId, {resource_type: "video", invalidate:true})
      // cloudinaryResult= JSON.stringify(cloudinaryResult)
      // console.log("Cloudinary deletion result:", cloudinaryResult);
// HEY YOU THE BELOW CODE WORKS WELL
        // cloudinary.v2.uploader.destroy(publicId, {resource_type: "video", invalidate:true})
        //     .then(result=>{
        //       console.log(result)
        //     });
// HEY YOU THE ABOVE CODE WORKS WELL 


    // console.log("Cloudinary deletion result:", cloudinaryResult);
    // if (cloudinaryResult.result === 'not found') {
    //     console.warn("File not found in Cloudinary");
    //     return;
    //   }
  
    //   DONT WORK LIKE BELOW, ALREADY TRIED IT: 
            // /v1743767995/zsnxuyz8sutslrkb5rm1.mp3
            // https://res.cloudinary.com/dni9bl2pk/video/upload/v1743772944/nl0udsghhepzoipxo7el.mp3

  
      // Delete from MongoDB
      await audio.deleteOne();
  
      res.json({ message: "Audio deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  




  export const demoDelete = async(req,res)=>{
    try{

      // https://res.cloudinary.com/dni9bl2pk/video/upload/v1743797211/thud-sound-effect-319090_em3yvq.mp3
      
      // const cloudinaryResult  = await cloudinary.uploader.destroy('thud-sound-effect-319090_em3yvq', {resource_type: "video", invalidate:true})
 cloudinary.v2.uploader.destroy('thud-sound-effect-319090_em3yvq', {resource_type: "video", invalidate:true})
.then(result=>console.log(result));
      // console.log("deleted sucess",cloudinaryResult);
      // res.status(200).json({"cloudinarydata":cloudinaryResult})

    }
    catch(err){
      console.log(err)
    }
  }