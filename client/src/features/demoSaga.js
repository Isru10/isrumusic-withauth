import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { uploadAudioRequest, uploadAudioSuccess, uploadAudioFailure } from "../features/audioSlice";

// The upload function for Cloudinary
const uploadFile = async (type, img, video) => {
  const data = new FormData();
  data.append("file", type === "image" ? img : video);
  data.append("upload_preset", type === 'image' ? 'images_preset' : 'videos_preset');

  try {
    const cloudName = "dni9bl2pk"; // Replace with your Cloudinary cloud name
    const resourceType = type === "image" ? "image" : "video";
    const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const res = await axios.post(api, data);
    const { secure_url } = res.data;
    return secure_url;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Saga to handle the upload
function* uploadFileSaga(action) {
  try {
    const { img, video } = action.payload;
    const imgUrl = yield call(uploadFile, "image", img, video);
    const videoUrl = yield call(uploadFile, "video", img, video);

    // Once we get the Cloudinary URLs, post them to your backend
    const response = yield call(axios.post, "http://localhost:5000/api/videos", {
      imgUrl,
      videoUrl
    });

    // Dispatch success action with data
    yield put(uploadAudioSuccess(response.data));
    console.log("File upload success");
  } catch (error) {
    yield put(uploadAudioFailure(error.message));
    console.log("File upload failed:", error.message);
  }
}

// Watcher saga that watches for the upload request
 function* musicSaga() {
  yield takeLatest(uploadAudioRequest.type, uploadFileSaga);
}


export default musicSaga;
