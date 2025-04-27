// import { useDispatch } from "react-redux";
// // import { uploadAudioRequest } from "../features/imageSlice";
// import { uploadAudioRequest } from "../features/audioSlice";
// import { useState } from "react";
// import axios from "axios";
// import DisplayAudio from "./DisplayAudio";
// import { useNavigate } from "react-router-dom";

// const UploadAudio = () => {
//   const dispatch = useDispatch();
//   const [title, setTitle] = useState("");
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [artist, setArtist] = useState("");
//   const navigate = useNavigate();


// const uploadFile = async (audioUrl) => {
//   const data = new FormData();
//   data.append("file", audioUrl);
//   data.append("upload_preset", 'audios_preset');
//   data.append("folder", "audios"); // Explicitly set the folder

//   try {
//     const cloudName = "dni9bl2pk"; // Replace with your Cloudinary cloud name
//     const resourceType ="video";
//     const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

//     const res = await axios.post(api, data);
//     const { secure_url } = res.data;
//     return secure_url;
//   } catch (err) {
//     throw new Error(err.message);
//   }
// };




//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // setArtist(true);
//     // const audio = {
//     //   title,
//     //   audioUrl,
//     //   artist
//     // }
//     if (!audioUrl){
//       alert("audio needed")
//       return
//     }
//     const audioData = new FormData()
//     audioData.append("title",title)
//     // audioData.append("audioUrl",audioUrl)  wait a minute!!
//     audioData.append("artist",artist)
//     audioData.append("upload_preset","audios_preset");
//     // Dispatch the action to trigger the saga
//     // console.log(audioData.values())
//     // for (let [key, value] of audioData.entries()) {
//     //   console.log(key, value);
//     // }

//     // just before the dipatch call the upload function and carry the secure url and give it to dispatch function 
//     const  responseUrl = await uploadFile(audioUrl)
//     console.log(responseUrl )
//     dispatch(uploadAudioRequest({title,artist,audioUrl:responseUrl} ));
//     navigate("/")
//     // setTitle(null);
//     // setAudioUrl(null);
//   };

//   return (

//     // <div>


//     // <form onSubmit={handleSubmit}>
//     //   {/* Image and video file input fields */}
//     //   {/* <input type="file" onChange={(e) => setTitle(e.target.files[0])} /> */}
//     //   <input placeholder="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
//     //   <input type="text" placeholder="artist name" value={artist} onChange={(e) => setArtist(e.target.value)}/>
//     //   <input type="file" accept='audio/*' onChange={(e) => setAudioUrl(e.target.files[0])} required />
//     //   <button type="submit">Upload</button>
//     // </form>


//     //     {/* <DisplayAudio/> */}

//     // </div>
//     <div className="text-black flex items-center justify-center min-h-screen bg-gray-100">
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 border border-gray-200"
//     >
//       <h2 className="text-2xl font-bold text-center text-[#1e4f5b]">🎵 Upload Audio</h2>
  
//       <div>
//         <label className="block mb-1 text-sm font-semibold text-gray-700">Title</label>
//         <input
//           placeholder="Enter title"
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1e4f5b] focus:border-[#1e4f5b] outline-none"
//         />
//       </div>
  
//       <div>
//         <label className="block mb-1 text-sm font-semibold text-gray-700">Artist Name</label>
//         <input
//           placeholder="Enter artist name"
//           type="text"
//           value={artist}
//           onChange={(e) => setArtist(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1e4f5b] focus:border-[#1e4f5b] outline-none"
//         />
//       </div>
  
//       <div>
//         <label className="block mb-1 text-sm font-semibold text-gray-700">Audio File</label>
//         <input
//           type="file"
//           accept="audio/*"
//           onChange={(e) => setAudioUrl(e.target.files[0])}
//           required
//           className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#1e4f5b] file:text-white hover:file:bg-[#163b44]"
//         />
//       </div>
  
//       <button
//         type="submit"
//         className="w-full py-2 px-4 bg-[#1e4f5b] hover:bg-[#163b44] text-white font-semibold rounded-lg transition-all"
//       >
//         Upload
//       </button>
//     </form>
//   </div>
  
//   );
// };

// export default UploadAudio;









import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { uploadAudioRequest } from "../features/audioSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// --- Import react-toastify ---
import { toast } from 'react-toastify';
// --- Make sure you've added <ToastContainer /> and its CSS import in App.js ---

const UploadAudio = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [artist, setArtist] = useState("");
  const [fileName, setFileName] = useState("No file chosen");
  const navigate = useNavigate();

  // Using RTK Query? Assume 'isLoading' is managed within its hook for UI feedback.
  // If not, you might need a local loading state: const [isUploading, setIsUploading] = useState(false);
  const loading = false; // Placeholder from your code, replace if you have actual loading state
  const error = null;   // Placeholder


  const uploadFile = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", 'audios_preset');
    data.append("folder", "audios");

    try {
      const cloudName = "dni9bl2pk";
      const resourceType = "video";
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (err) {
      console.error("Cloudinary Upload Error:", err.response?.data || err.message);
      // --- Replace alert with toast.error in upload failure ---
      toast.error(`Upload failed: ${err.response?.data?.error?.message || err.message}`);
      throw new Error(err.message); // Re-throw
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audioFile) {
      // --- Use toast for validation ---
      toast.warning("Please select an audio file first.");
      return;
    }
    if (!title.trim()) {
       // --- Use toast for validation ---
      toast.warning("Please enter a title.");
      return;
    }

    // Example: Set local loading state if not using RTK Query's isLoading
    // setIsUploading(true);

    try {
      console.log("Starting Cloudinary upload for:", audioFile.name);
      const responseUrl = await uploadFile(audioFile);

      if (responseUrl) {
        console.log("Dispatching upload request with URL:", responseUrl);
        dispatch(uploadAudioRequest({ title, artist: artist || "Unknown Artist", audioUrl: responseUrl }));

        // --- Replace alert with toast.success ---
        // Provide a more informative message using the title
        toast.success(`"${title || 'Track'}" uploaded successfully!`);

        // Navigate *after* showing the toast
        navigate("/");

        // Optionally reset state here *if* navigation doesn't unmount the component fully
        // setTitle('');
        // setArtist('');
        // setAudioFile(null);
        // setFileName('No file chosen');

      } else {
         console.error("handleSubmit: Failed to get URL from uploadFile");
         // No need for alert/toast here, uploadFile already handles its error toast
      }
    } catch (err) {
      console.error("handleSubmit Error:", err);
      // Handle potential errors *other* than Cloudinary upload (e.g., dispatch failure)
      // The alert is removed because uploadFile handles its errors.
      // You could add a generic toast here for other potential issues if needed:
      // toast.error("An unexpected error occurred during the upload process.");
    } finally {
      // Example: Reset local loading state
      // setIsUploading(false);
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      setFileName(file.name);
    } else {
      setAudioFile(null);
      setFileName("No file chosen");
    }
  };

  // --- The rest of your return JSX (form UI) remains the same ---
  return (
    <div className="min-h-screen bg-[#101010] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8">
        <form
          onSubmit={handleSubmit}
          className="bg-[#1f1f1f] p-8 rounded-xl shadow-2xl space-y-6 border border-gray-700"
        >
           <h2 className="text-3xl font-bold text-center text-gray-100 mb-8">
             🎵 Upload Your Track
           </h2>
            {/* Title Input */}
          <div>
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-300">
              Track Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              placeholder="Enter title (e.g., Summer Vibes)"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading} // Disable inputs while loading (using placeholder 'loading')
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 shadow-sm disabled:opacity-60"
            />
          </div>

           {/* Artist Input */}
           <div>
             <label htmlFor="artist" className="block mb-2 text-sm font-medium text-gray-300">
               Artist Name
             </label>
             <input
               id="artist"
               placeholder="Enter artist name (Optional)"
               type="text"
               value={artist}
               onChange={(e) => setArtist(e.target.value)}
               disabled={loading}
               className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 shadow-sm disabled:opacity-60"
             />
           </div>

           {/* Fancy File Input Area */}
           <div>
             <label className="block mb-2 text-sm font-medium text-gray-300">
               Audio File <span className="text-red-500">*</span>
             </label>
             {/* Add 'disabled' style effect visually if needed */}
              <div className={`mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg bg-[#2a2a2a] transition duration-200 ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:border-gray-500 border-gray-600'}`}>
               <div className="space-y-1 text-center">
                 <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                   <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                 </svg>
                 <div className="flex text-sm text-gray-400 justify-center">
                   <label
                     htmlFor="audio-upload"
                     className={`relative rounded-md font-medium text-cyan-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-800 focus-within:ring-cyan-500 ${loading ? 'cursor-not-allowed' : 'cursor-pointer hover:text-cyan-400'}`}
                    >
                     <span>{fileName === "No file chosen" ? 'Upload a file' : 'Change file'}</span>
                     <input
                       id="audio-upload"
                       name="audio-upload"
                       type="file"
                       accept="audio/*"
                       onChange={handleFileChange}
                       required
                       disabled={loading} // Disable actual input during upload
                       className="sr-only"
                     />
                   </label>
                   {!loading && <p className="pl-1">or drag and drop</p>} {/* Hide D&D text when loading */}
                 </div>
                 <p className="text-xs text-gray-500">MP3, WAV, FLAC up to 10MB</p>
                  {fileName !== "No file chosen" && (
                    <p className="text-sm text-cyan-300 pt-2 truncate px-4" title={fileName}>
                      Selected: {fileName}
                    </p>
                 )}
               </div>
             </div>
           </div>

          {/* Submit Button (Use actual 'loading' state if available) */}
           <div>
             <button
               type="submit"
               disabled={loading || !audioFile} // Disable if loading or no file selected
               className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1f1f1f] focus:ring-cyan-500 ${
                    loading
                       ? 'bg-cyan-800 cursor-not-allowed opacity-70'
                       : 'bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed' // Added disabled styles for no file case
                 }`}
              >
               {loading ? (
                 <>
                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                   Uploading...
                 </>
               ) : (
                 'Upload Audio'
               )}
             </button>
           </div>

             {/* Placeholder for error messages (can also use toast) */}
              {error && (
                  <p className="mt-2 text-center text-sm text-red-500">{typeof error === 'string' ? error : 'An error occurred.'}</p>
               )}

        </form>
      </div>
    </div>
  );
};

export default UploadAudio;