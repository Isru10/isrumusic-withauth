import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLoading:false,
    error:null,
    currDemo: "some null songs",
}

const demoSlice = createSlice({
    name:'demo',
    initialState,
    reducers:{
        firstFunction :(state,action) =>{
            state.currDemo = action.payload;
        } ,


    }
})

export const  {firstFunction} =  demoSlice.actions
export default  demoSlice.reducer