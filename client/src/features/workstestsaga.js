import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure } from "./musicSlice";

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

export default function* musicSaga() {
  yield takeLatest(fetchSongsRequest.type, fetchSongs);
}
