import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../../utils";

import companySlice from "../company/companySlice";
import {updateWorksiteDetails} from '../company/companySlice'




export const startWorkDay = createAsyncThunk(
    'worksite/startWorkDay',
    async ({worksiteId}, thunkAPI) => {
        try {
            const token = thunkAPI.getState().userState.user.token;
            
            const response = await customFetch.post(`/worksites/${worksiteId}/startday`,{}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const updatedWorksiteDetails = response.data;
            thunkAPI.dispatch(updateWorksiteDetails(updatedWorksiteDetails))
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const endWorkDay = createAsyncThunk(
    'worksite/endWorkDay',
    async({worksiteId}, thunkAPI) => {
        try {
            const token = thunkAPI.getState().userState.user.token;
            const response = await customFetch.post(`/worksites/${worksiteId}/endday`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // Päivitä worksiteDetails companySlicessa
            const updatedWorksiteDetails = response.data; // Oletetaan, että tämä on päivitetty worksite
            thunkAPI.dispatch(updateWorksiteDetails(updatedWorksiteDetails));
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)




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
        builder
        // Työpäivän aloitus
            .addCase(startWorkDay.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(startWorkDay.fulfilled, (state, action) => {
                
                state.loading = false;
                
            })
            .addCase(startWorkDay.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
        // työpäivän lopetus
            .addCase(endWorkDay.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(endWorkDay.fulfilled, (state, action) => {
                
                state.loading = false;
            })
            .addCase(endWorkDay.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            
    }

})

export const {} = worksiteSlice.actions;

export default worksiteSlice.reducer;