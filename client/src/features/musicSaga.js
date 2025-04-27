import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure, addSongSuccess, addSongFailure, addSongRequest } from "./musicSlice";

function* fetchSongs() {
  try {
    console.log("Fetching songs from API...");
    const response = yield call(axios.get, "http://localhost:5000/api/songs");

    console.log("Full API Response:", response);
    console.log("Data inside response:", response?.data);

    if (response?.data) {
      yield put(fetchSongsSuccess(response.data));
    } else {
      yield put(fetchSongsFailure("Invalid API response"));
    }
  } catch (error) {
    console.error("Error fetching songs:", error.message);
    yield put(fetchSongsFailure(error.message));
  }
}


function* addSong(action) {
  try {
    const response = yield call(() => axios.post("http://localhost:5000/api/songs", action.payload));
    yield put(addSongSuccess(response.data));
  } catch (error) {
    yield put(addSongFailure(error.message));
  }
}


export default function* musicSaga() {
  yield takeLatest(fetchSongsRequest.type, fetchSongs);
  yield takeLatest(addSongRequest.type, addSong);

}
