import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    title:"nothing"
}
export const danSlice = createSlice({
    name:'dan',
    initialState:initialState,
    reducers:{
      qFunction: (state,action)=>{
        state.title = action.payload
      }
    }
})
export const {qFunction} = danSlice.actions
export default danSlice.reducer