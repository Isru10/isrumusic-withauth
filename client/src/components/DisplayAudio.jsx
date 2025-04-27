// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteAudioRequest, fetchAudiosRequest } from '../features/audioSlice';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const DisplayAudio = () => {
//   const { audios, loading, error } = useSelector((state) => state.audio);
//   const dispatch = useDispatch();
//   const {userInfo} = useSelector(state => state.auth)
//   console.log(audios);
//   useEffect(() => {
//     dispatch(fetchAudiosRequest());
//   }, [dispatch]);

//   const handleDelete = async () => {
//     const res = await axios.get('http://localhost:5000/api/audio-upload/demo');
//     console.log(res);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-3xl font-bold text-center text-[#1e4f5b] mb-8">🎧 My Music Collection</h2>

//         {loading && <p className="text-center text-gray-500">Loading...</p>}
//         {/* {error && <p className="text-center text-red-500">{error}</p>} */}

//         <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {audios.map((audio) => (
//             <div
//               key={audio._id}
//               className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all flex flex-col justify-between"
//             >
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-1">{audio.title}</h3>
//                 <p className="text-sm text-black mb-4">🎤 {audio.artist}</p>
//                 <audio controls className="w-full rounded">
//                   <source src={audio.audioUrl} type="audio/mpeg" />
//                   Your browser does not support the audio tag.
//                 </audio>
//               </div>

//               { (audio.user === userInfo._id) &&
//               (<div className="mt-4 flex gap-2">
//                 <button
//                   onClick={() => dispatch(deleteAudioRequest(audio._id))}
//                   className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
//                 >
//                   Delete
//                 </button>

//                 <Link
//                   to={`/update/${audio._id}`}
//                   state={{ audio }}
//                   className="w-full"
//                 >
//                   <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all">
//                     Update
//                   </button>
//                 </Link>
//               </div>)}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DisplayAudio;



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAudioRequest, fetchAudiosRequest } from '../features/audioSlice';
import { Link } from 'react-router-dom';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import './AudioPlayerOverrides.css';

// --- Import toast from react-toastify ---
import { toast } from 'react-toastify';

// --- Custom Confirmation Toast Component ---
const ConfirmDeleteToast = ({ closeToast, id, title, dispatch }) => {

    const handleConfirm = () => {
        // Dispatch the delete action
        dispatch(deleteAudioRequest(id));
        // Show optimistic success toast immediately
        toast.success(`"${title}" deleted successfully!`, { theme: "colored" });
        // Close this confirmation toast
        closeToast();
    };

    const handleCancel = () => {
        // Just close the confirmation toast
        closeToast();
    };

    return (
        <div className="p-2">
            <p className="font-semibold text-white mb-2">Confirm Deletion</p>
            <p className="text-sm text-gray-300 mb-4">
                Are you sure you want to permanently delete "{title}"?
            </p>
            <div className="flex justify-end gap-3">
                <button
                    onClick={handleCancel}
                    className="px-3 py-1 text-sm rounded bg-gray-600 hover:bg-gray-500 text-white transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleConfirm}
                     className="px-3 py-1 text-sm rounded bg-red-600 hover:bg-red-700 text-white transition-colors"
                >
                    Confirm Delete
                </button>
            </div>
        </div>
    );
};


const DisplayAudio = () => {
  // --- Redux State ---
  const { audios, loading: audioLoading } = useSelector((state) => state.audio);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // --- Component State ---
  const [currentPage, setCurrentPage] = useState(1);
  const audiosPerPage = 9;

  // --- Fetch Audios on Mount ---
  useEffect(() => {
    dispatch(fetchAudiosRequest());
  }, [dispatch]);

  // --- Pagination Logic ---
  const indexOfLastAudio = currentPage * audiosPerPage;
  const indexOfFirstAudio = indexOfLastAudio - audiosPerPage;
  const currentAudios = audios.slice(indexOfFirstAudio, indexOfLastAudio);
  const totalPages = Math.ceil(audios.length / audiosPerPage);

  // --- Event Handlers ---

  // --- UPDATED handleDelete ---
  const handleDelete = (id, title) => {
      // Replace window.confirm with a toast notification
      toast(
         // Render the custom component inside the toast
          <ConfirmDeleteToast
            id={id}
            title={title}
            dispatch={dispatch}
           // closeToast prop is automatically passed by react-toastify
           />,
        {
             toastId: `confirm-delete-${id}`, // Prevent duplicate confirmation toasts if clicked quickly
             position: "top-center", // Good position for confirmation
             autoClose: false, // Don't automatically close confirmation
             closeOnClick: false, // Don't close by clicking background
             draggable: false, // Don't allow dragging confirmation
             theme: "dark", // Use dark theme
             closeButton: false, // Hide default close button, use custom buttons
             style: { // Optional custom styling for the container
                  border: '1px solid #4B5563', // border-gray-600
                  borderRadius: '8px',
                  background: '#1f1f1f', // bg-gray-800/900 range
             }
         }
     );
   };
  // --- End of UPDATED handleDelete ---


  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    handlePageChange(currentPage + 1);
  };

  // --- Render ---
  // The rest of the return (...) JSX remains the same as your previous version
  return (
    <div className="min-h-screen bg-[#101010] py-10 px-4 sm:px-6 lg:px-8 text-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12">
          🎧 IsruMusic Collection
        </h2>

        {/* Loading State */}
        {audioLoading && (
          <div className="flex justify-center items-center py-20">
             <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
          </div>
        )}

        {/* Empty State */}
        {!audioLoading && audios.length === 0 && (
           <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No music found!</p>
                 {/* Optional: Add Upload Link */}
                 {/* <Link to="/upload" className="mt-4 inline-block px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md text-white font-medium transition-colors">Upload Music</Link> */}
           </div>
        )}

        {/* Display Audios Grid */}
        {!audioLoading && audios.length > 0 && (
          <>
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {currentAudios.map((audio) => (
                <div
                  key={audio?._id}
                  className="relative bg-[#1f1f1f] p-5 rounded-lg shadow-lg border border-gray-700 hover:shadow-cyan-500/30 hover:border-cyan-600 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Edit/Delete Buttons */}
                  {userInfo && audio.user === userInfo._id && (
                      <div className="absolute top-3 right-3 flex items-center gap-2 z-20 rounded-md bg-black bg-opacity-40 p-1">
                        <Link
                          to={`/update/${audio._id}`}
                          state={{ audio }}
                          className="p-1.5 sm:p-2 text-green-400 hover:text-green-300 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                          title="Update Audio"
                          aria-label="Update Audio"
                        >
                           {/* Edit SVG */}
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </Link>
                        <button
                          onClick={() => handleDelete(audio._id, audio.title)} // Pass ID and title
                          className="p-1.5 sm:p-2 text-red-400 hover:text-red-300 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                          title="Delete Audio"
                          aria-label="Delete Audio"
                        >
                          {/* Delete SVG */}
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    )}
                  {/* Card Content */}
                  <div className="relative z-10 flex flex-col flex-grow pt-8">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-100 mb-1 truncate" title={audio.title}>
                        {audio.title || 'Untitled'}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                        🎤 {audio.artist || 'Unknown Artist'}
                    </p>
                    <div className="audio-player-wrapper mt-auto pt-4 mb-4">
                        {audio.audioUrl ? (
                             <AudioPlayer
                                src={audio.audioUrl}
                                showJumpControls={false}
                                autoPlayAfterSrcChange={false}
                                className="audio-player-custom"
                             />
                         ) : (
                           <p className="text-xs text-red-400">Audio URL missing</p>
                         )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2 flex-wrap" aria-label="Audio pagination">
                {/* Prev Button */}
                <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-4 py-2 rounded-md font-medium text-sm bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors" aria-label="Previous Page">← <span className="hidden sm:inline">Prev</span></button>
                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => (<button key={`page-${i + 1}`} onClick={() => handlePageChange(i + 1)} disabled={currentPage === i + 1} className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${currentPage === i + 1 ? 'bg-cyan-600 text-white shadow-md cursor-default' : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]' }`} aria-label={`Go to page ${i + 1}`} aria-current={currentPage === i + 1 ? 'page' : undefined}>{i + 1}</button>))}
                {/* Next Button */}
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 rounded-md font-medium text-sm bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors" aria-label="Next Page"><span className="hidden sm:inline">Next</span> →</button>
               </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayAudio;