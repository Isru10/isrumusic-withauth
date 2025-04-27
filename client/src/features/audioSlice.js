import { createSlice } from "@reduxjs/toolkit";

const audioSlice = createSlice({
  name: "audio",
  initialState: {
    audios: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchAudiosRequest: (state) => { state.loading = true; },
    fetchAudiosSuccess: (state, action) => { state.loading = false; state.audios = action.payload; },
    fetchAudiosFailure: (state, action) => { state.loading = false; state.error = action.payload; },

    
    uploadAudioRequest: (state) => { state.loading = true;    },
    uploadAudioSuccess: (state, action) => { state.loading = false; state.audios.push(action.payload); },
    uploadAudioFailure: (state, action) => { state.loading = false; state.error = action.payload; },


    updateAudioRequest: (state) => { state.loading = true; },
    updateAudioSuccess: (state, action) => {
      state.audios = state.audios.map(audio =>
        audio._id === action.payload._id ? action.payload : audio
      );
      state.loading = false;
    },
    updateAudioFailure: (state, action) => { state.error = action.payload; state.loading = false; },


    deleteAudioRequest: (state) => { state.loading = true; },
    deleteAudioSuccess: (state, action) => {
      state.audios = state.audios.filter(audio => audio._id !== action.payload);
      state.loading = false;
    },
    deleteAudioFailure: (state, action) => { state.loading = false; state.error = action.payload; },
  },
});

export const {
  fetchAudiosRequest, fetchAudiosSuccess, fetchAudiosFailure,
  uploadAudioRequest, uploadAudioSuccess, uploadAudioFailure, 
  deleteAudioRequest, deleteAudioSuccess, deleteAudioFailure,
  updateAudioRequest, updateAudioSuccess, updateAudioFailure
} = audioSlice.actions;

export default audioSlice.reducer;
