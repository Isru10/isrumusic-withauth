import React from 'react'
import { useState } from 'react'
import axios from 'axios'
const Upload = () => {

    const [img,setImg] = useState(null)
    const [video,setVideo] = useState(null)
    const [loading,setLoading] = useState(false)
    const uploadFile = async (type)=>{
        const data = new FormData()
        data.append("file",type === "image" ? img : video)
        data.append("upload_preset",type==='image'?'images_preset':'videos_preset');
        try{
                let cloudName = "dni9bl2pk";
                // import.meta.env.REACT_APP_CLOUDINARY_CLOUD_NAME
                let resourceType = type === "image" ? "image" : "video"
                let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`
                const res = await axios.post(api,data)
                const {secure_url} = res.data
                console.log(secure_url)
                return secure_url
        }
        catch(err){
            console.log('====================================');
            console.log(err);
            console.log('====================================');
        }
    }
        const handleSubmit=async(e)=>{
            e.preventDefault();
            try{
                setLoading(true)
                const imgUrl = await uploadFile("image")
                const videoUrl = await uploadFile("video")
                await axios.post("http://localhost:5000/api/videos",{
                    imgUrl,
                    videoUrl
                });
                setImg(null)
                setVideo(null)
            console.log("file upload success")
            setLoading(false)
            }
            catch(error){
                console.log('====================================');
                console.log(error);
                console.log('====================================');
            }
        }
    return (
    <div>
        <form action="" onSubmit={handleSubmit}> 
            <div className="">
                <label htmlFor="video">
                    video:
                </label>

                    <br />
                    <input type="file" accept='video/*'  id="video" onChange={(e)=>setVideo((prev)=>e.target.files[0])}/>
            </div>

            <br />
            <div className="">
                <label htmlFor="img">
                    image:
                </label>

                    <br />
                    <input type="file" accept='image/*'  id="img" onChange={(e)=>setImg((prev)=>e.target.files[0])}/>
            </div>


            <br />

            <button type='submit'> upload</button>

        </form>

        {loading && <h3>uploading...</h3> }
    </div>
  )
}

export default Upload









