import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    worksite: null,
    loading: null,
    error: null,
}

const worksiteSlice = createSlice({
    name: 'worksite',
    initialState,
    reducers: {
        
        

    },
    extraReducers: (builder) => {

    }

})

export const {} = worksiteSlice.actions;

export default worksiteSlice.reducer;