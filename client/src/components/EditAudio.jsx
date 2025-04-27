// import { useDispatch } from "react-redux";
// import { useState } from "react";
// import { updateAudioRequest } from "../features/audioSlice";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const EditAudio = () => {
//   const dispatch = useDispatch();
//   const { state } = useLocation();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const fetched_audio = state.audio;

//   const [title, setTitle] = useState(fetched_audio.title || "");
//   const [artist, setArtist] = useState(fetched_audio.artist || "");
//   const [audioUrl, setAudioUrl] = useState(fetched_audio.audioUrl || "");
//   const [newAudio, setNewAudio] = useState(null);

//   const uploadFile = async (audioUrl) => {
//     const data = new FormData();
//     data.append("file", audioUrl);
//     data.append("upload_preset", "audios_preset");

//     try {
//       const cloudName = "dni9bl2pk";
//       const resourceType = "video";
//       const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

//       const res = await axios.post(api, data);
//       const { secure_url } = res.data;
//       return secure_url;
//     } catch (err) {
//       throw new Error(err.message);
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     let finalAudioUrl = audioUrl;
//     if (newAudio) {
//       const response = await uploadFile(newAudio);
//       finalAudioUrl = response;
//     }

//     dispatch(updateAudioRequest({ id, title, artist, audioUrl: finalAudioUrl }));
//     navigate("/");
//   };

//   return (
//     <div className="text-black flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleUpdate}
//         className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 border border-gray-200"
//       >
//         <h2 className="text-2xl font-bold text-center text-[#1e4f5b]">✏️ Edit Audio</h2>

//         <div>
//           <label className="block mb-1 text-sm font-semibold text-gray-700">Title</label>
//           <input
//             placeholder="Edit title"
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1e4f5b] focus:border-[#1e4f5b] outline-none"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-semibold text-gray-700">Artist Name</label>
//           <input
//             placeholder="Edit artist name"
//             type="text"
//             value={artist}
//             onChange={(e) => setArtist(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1e4f5b] focus:border-[#1e4f5b] outline-none"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-semibold text-gray-700">Replace Audio (optional)</label>
//           <input
//             type="file"
//             accept="audio/*"
//             onChange={(e) => setNewAudio(e.target.files[0])}
//             className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#1e4f5b] file:text-white hover:file:bg-[#163b44]"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full py-2 px-4 bg-[#1e4f5b] hover:bg-[#163b44] text-white font-semibold rounded-lg transition-all"
//         >
//           Update Audio
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditAudio;

import React, { useState, useEffect } from 'react'; // Need useEffect for redirect check
import { useDispatch, useSelector } from "react-redux";
import { updateAudioRequest } from "../features/audioSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// --- Import react-toastify ---
import { toast } from 'react-toastify';

const EditAudio = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const fetched_audio = state?.audio;

  // --- Moved redirect logic inside useEffect ---
  useEffect(() => {
    if (!fetched_audio || !id) {
       console.error("EditAudio: Missing audio data or ID in location state.");
       toast.error("Error: Audio data not found. Redirecting..."); // Notify user
       navigate('/'); // Redirect
     }
  }, [fetched_audio, id, navigate]);
  // Render nothing or a loading state while redirecting or if data is missing initially
   if (!fetched_audio || !id) {
     return <div className="min-h-screen bg-[#101010] flex items-center justify-center text-gray-400">Loading or Redirecting...</div>;
   }
   // --- End of Redirect Logic ---


  const [title, setTitle] = useState(fetched_audio.title || "");
  const [artist, setArtist] = useState(fetched_audio.artist || "");
  const [currentAudioUrl] = useState(fetched_audio.audioUrl || "");
  const [newAudioFile, setNewAudioFile] = useState(null);
  const [newFileName, setNewFileName] = useState("No new file chosen");

  // Placeholder loading state - ideally use one from your state management for updates
  const [isSubmitting, setIsSubmitting] = useState(false); // Local loading state example

  // --- UPDATED uploadFile function ---
  const uploadFile = async (fileToUpload) => {
    const data = new FormData();
    data.append("file", fileToUpload);
    data.append("upload_preset", "audios_preset");

    try {
      const cloudName = "dni9bl2pk";
      const resourceType = "video";
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
      console.log("Starting Cloudinary upload for new file:", fileToUpload.name);
      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log("Cloudinary Upload Success:", secure_url);
      return secure_url;
    } catch (err) {
      console.error("Cloudinary Upload Error:", err.response?.data || err.message);
      // --- Replace alert with toast.error ---
      toast.error(`Upload failed: ${err.response?.data?.error?.message || err.message}`);
      throw new Error(err.message); // Re-throw
    }
  };
  // --- End of UPDATED uploadFile function ---


   // --- UPDATED handleUpdate logic ---
   const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      // --- Replace alert with toast.warning ---
      toast.warning("Please enter a title.");
      return;
    }

    setIsSubmitting(true); // Set local loading state
    let finalAudioUrl = currentAudioUrl;

    try {
      if (newAudioFile) {
        console.log("New audio file selected, attempting upload...");
        // Can add a toast message for upload start if desired
        // toast.info(`Uploading replacement file "${newAudioFile.name}"...`);
        const newUrl = await uploadFile(newAudioFile);
        if (newUrl) {
           finalAudioUrl = newUrl;
        } else {
           // Upload error is handled by toast inside uploadFile
           setIsSubmitting(false); // Reset loading on failure
           return; // Stop update if new file upload failed
        }
      }

      console.log("Dispatching update request for ID:", id);
      dispatch(
        updateAudioRequest({
          id,
          title,
          artist: artist || "Unknown Artist",
          audioUrl: finalAudioUrl,
        })
      );

       // --- Replace alert with toast.success ---
       toast.success(`"${title}" updated successfully!`);
       navigate("/");

    } catch (err) {
      // This catch block will primarily handle errors NOT related to the uploadFile function
      // (like dispatch errors, though less common if using Redux Toolkit correctly)
      // It will also catch errors re-thrown from uploadFile.
      console.error("handleUpdate Error:", err);
      // No redundant toast needed here as uploadFile toasts its own errors
      // If needed, you could add a generic fallback toast here for non-upload errors:
      // if (!err.message.startsWith('Upload failed:')) { // Avoid double-toasting
      //     toast.error("An error occurred while saving changes.");
      // }
    } finally {
       setIsSubmitting(false); // Reset loading state
    }
  };
   // --- End of UPDATED handleUpdate logic ---

   // --- Handler to update new file state and filename display (Unchanged) ---
   const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAudioFile(file);
      setNewFileName(file.name);
    } else {
      setNewAudioFile(null);
      setNewFileName("No new file chosen");
    }
  };

   // --- displayCurrentUrl Helper (Unchanged) ---
   const displayCurrentUrl = (url) => { /* ... */ };

  // --- JSX Structure (Updated Button State) ---
  return (
    <div className="min-h-screen bg-[#101010] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8">
        <form
          onSubmit={handleUpdate}
          className="bg-[#1f1f1f] p-8 rounded-xl shadow-2xl space-y-6 border border-gray-700"
        >
           <h2 className="text-3xl font-bold text-center text-gray-100 mb-8">
             ✏️ Edit Audio Details
           </h2>

            {/* Inputs: Add disabled state based on isSubmitting */}
             {/* Title Input */}
           <div>
             <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-300">
               Track Title <span className="text-red-500">*</span>
             </label>
             <input
               id="title"
               placeholder="Edit title"
               type="text"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               required
               disabled={isSubmitting} // Disable when submitting
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
                placeholder="Edit artist name"
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                 disabled={isSubmitting} // Disable when submitting
                 className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 shadow-sm disabled:opacity-60"
              />
            </div>

           {/* Current File Info (Unchanged) */}
           <div>
                <label className="block mb-1 text-sm font-medium text-gray-400">Current Audio File</label>
                <p className="text-xs text-gray-500 bg-[#2a2a2a] px-3 py-2 rounded truncate" title={currentAudioUrl}>
                   {displayCurrentUrl(currentAudioUrl)}
                </p>
                <p className="text-xs text-gray-500 mt-1">Select a file below only if you want to replace this one.</p>
            </div>

            {/* Fancy File Input Area */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Replace Audio File (Optional)
              </label>
                {/* Added visual disabling based on isSubmitting */}
               <div className={`mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg bg-[#2a2a2a] transition duration-200 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:border-gray-500 border-gray-600'}`}>
                <div className="space-y-1 text-center">
                  {/* SVG Icon */}
                   <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <div className="flex text-sm text-gray-400 justify-center">
                    <label
                      htmlFor="new-audio-upload"
                      className={`relative rounded-md font-medium text-cyan-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-800 focus-within:ring-cyan-500 ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer hover:text-cyan-400'}`}
                    >
                       <span>{newFileName === "No new file chosen" ? 'Upload a replacement' : 'Change replacement file'}</span>
                       <input
                        id="new-audio-upload"
                        name="new-audio-upload"
                        type="file"
                        accept="audio/*"
                        onChange={handleFileChange}
                        disabled={isSubmitting} // Disable actual input
                        className="sr-only"
                      />
                    </label>
                    {!isSubmitting && <p className="pl-1">or drag and drop</p>}
                  </div>
                  <p className="text-xs text-gray-500">MP3, WAV, FLAC etc.</p>
                   {newFileName !== "No new file chosen" && (
                    <p className="text-sm text-cyan-300 pt-2 truncate px-4" title={newFileName}>
                      Replace with: {newFileName}
                    </p>
                  )}
                </div>
              </div>
            </div>

             {/* Submit Button - Updated with isSubmitting state */}
           <div>
             <button
               type="submit"
               disabled={isSubmitting} // Disable button based on local state
               className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1f1f1f] focus:ring-cyan-500 ${
                    isSubmitting
                       ? 'bg-cyan-800 cursor-not-allowed opacity-70' // Loading style
                       : 'bg-cyan-600 hover:bg-cyan-700' // Normal style
               }`}
             >
               {isSubmitting ? (
                 <>
                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                   Saving Changes...
                 </>
               ) : (
                 'Save Changes'
               )}
             </button>
           </div>

        </form>
         {/* Optional: Back button (Unchanged) */}
         <div className="text-center mt-4">
             <button onClick={() => navigate(-1)} className="text-sm text-gray-400 hover:text-cyan-400 transition duration-150">Cancel</button>
         </div>
      </div>
    </div>
  );
};

export default EditAudio;