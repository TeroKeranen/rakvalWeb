
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../../utils";



// AsyncThunk yrityksen tietojen hakemiseen
export const fetchCompanyDetails = createAsyncThunk(
    'company/fetchDetails',
    async (_, { getState, rejectWithValue }) => {
      try {
        const token = getState().userState.user.token;
  
        const response = await customFetch.get('/company', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (response.status !== 200) {
          throw new Error('Yritystä ei löydy');
        }
  
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


const initialState = {
    company: null,
    loading: false,
    error: null
  };

const companySlice = createSlice({
    name:'company',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
      .addCase(fetchCompanyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyDetails.fulfilled, (state, action) => {
        state.company = action.payload;
        state.loading = false;
      })
      .addCase(fetchCompanyDetails.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
    }
})

export default companySlice.reducer;