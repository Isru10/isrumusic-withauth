import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { uploadAudioRequest, uploadAudioSuccess, uploadAudioFailure, fetchAudiosSuccess, fetchAudiosFailure, fetchAudiosRequest, updateAudioRequest, updateAudioSuccess, updateAudioFailure, deleteAudioRequest, deleteAudioSuccess, deleteAudioFailure } from "../features/audioSlice";

// The upload function for Cloudinary
// const uploadFile = async (audioUrl) => {
//   const data = new FormData();
//   data.append("file", audioUrl);
//   data.append("upload_preset", 'audios_preset');

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

// Saga to handle the upload
function* uploadFileSaga(action) {
  try {
    // const { title, artist, audioUrl,upload_preset } = action.payload;
    // const formData = action.payload; // `FormData` from Redux action
    // const title = formData.get("title");
    // const artist = formData.get("artist");
    // const audioUrl = formData.get("audioUrl");
    const {title,artist,audioUrl} = action.payload
    console.log(audioUrl)
    // const audioSongsUrl = yield call(uploadFile, audioUrl);
    // const videoUrl = yield call(uploadFile, "video", img, video);

    // Once we get the Cloudinary URLs, post them to your backend saving them in mongoatlas
    
    const response = yield call(axios.post, `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/audio-upload/`, {
      title,
      artist,
      audioUrl
    },{
      withCredentials: true, // ✅ send cookies (including your jwt)
    });

    // Dispatch success action with data
    yield put(uploadAudioSuccess(response.data));
    console.log("File upload success");
    // window.href = '/'
    console.log('this is response of server',response)
    yield put(fetchAudiosRequest());  

  } catch (error) {
    yield put(uploadAudioFailure(error.message));
    console.log("File upload failed:", error.message);
  }
}

// API function to fetch songs from MongoDB
const fetchSongs = async () => {
  const response = await axios.get("https://isrumusic-backend.onrender.com/api/audio-upload",{
    withCredentials: true, // ✅ send cookies (including your jwt)
  }); // Fetching stored song URLs
  return response.data;
};



// Saga function
function* fetchAudioSaga() {
  try {
    const audios = yield call(fetchSongs);
    yield put(fetchAudiosSuccess(audios)); // Store songs in Redux
  } catch (error) {
    yield put(fetchAudiosFailure(error.message));
  }
}


function* updateAudioSaga(action) {
  try {
    const { id, title, artist, audioUrl } = action.payload;
    const response = yield call(axios.post, `https://isrumusic-backend.onrender.com/api/audio-upload/${id}`, {
      title,
      artist,
      audioUrl,
    },{
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true, 
    });
    console.log("song from update audio saga",response);
    yield put(updateAudioSuccess(response.data.audio));
  } catch (error) {
    yield put(updateAudioFailure(error.message));
  } 
}



function* deleteAudioSaga(action) {
  try {
    const response = yield call(axios.delete, `https://isrumusic-backend.onrender.com/api/audio-upload/${action.payload}`,{
      withCredentials: true,
    });
    if (response.data.message === "Audio deleted successfully"){
      yield put(deleteAudioSuccess(action.payload));
    }
    else {
      yield put(deleteAudioFailure(response.data.error || "Deletion failed"));
      // https://res.cloudinary.com/dni9bl2pk/video/upload/v1743772944/nl0udsghhepzoipxo7el.mp3
    }

  } catch (error) {
    yield put(deleteAudioFailure(error.message));
  }
}

// Watcher saga that watches for the upload request
 function* musicSaga() {
  yield takeLatest(uploadAudioRequest.type, uploadFileSaga);
  yield takeLatest(fetchAudiosRequest.type, fetchAudioSaga);
  yield takeLatest(updateAudioRequest.type, updateAudioSaga);
  yield takeLatest(deleteAudioRequest.type, deleteAudioSaga);


}






export default musicSaga;









