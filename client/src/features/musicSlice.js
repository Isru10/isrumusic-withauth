import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    songs:[],
    isLoading:false,
    error:null,
    currentSong: null,
}

const musicSlice = createSlice({
    name:"music",
    initialState,
    reducers:{
        fetchSongsRequest :(state)=>{
            state.isLoading = true;
            state.error = null;
        },
        fetchSongsSuccess:(state,action)=>{
            state.isLoading = false;
            state.songs = action.payload || []
        },
        fetchSongsFailure:(state,action)=>{
            state.isLoading = false;
            state.error = action.payload
        },


        playSong: (state, action) => {
            state.currentSong = action.payload;
          },
          addSongRequest: (state) => {
            state.isLoading = true;
          },
          addSongSuccess: (state, action) => {
            state.isLoading = false;
            state.songs.push(action.payload);
          },
          addSongFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
          },
    }
})
export const {fetchSongsRequest,fetchSongsSuccess,fetchSongsFailure,playSong,addSongRequest,addSongSuccess,addSongFailure} = musicSlice.actions
export default musicSlice.reducer;