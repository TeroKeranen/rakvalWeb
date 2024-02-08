
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../../utils";


export const addWorkerToWorksite = createAsyncThunk(
  'company/addWorkertocompany',
  async({worksiteId,workerId}, {getState, rejectWithValue}) => {
    console.log("adddworkerss", workerId);
    try {
      const token = getState().userState.user.token;
      const response = await customFetch.post(`/worksites/${worksiteId}/add-worker`,{workerId}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.status !== 200) {
        throw new Error("Jotain meni vikaan työntekijän lisäämisessä työmaahan")
      }
      return response.data;
    } catch (error) {
      
    }
  }
)
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

  // Haetaan yhtiön työmaat
export const fetchCompanyWorksites = createAsyncThunk(
  'company/fetchWorksites',
  async (_, {getState, rejectWithValue}) => {
    try {
      const token = getState().userState.user.token;
      const response = await customFetch.get('/worksites', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.status !== 200) {
        throw new Error('Yritystä ei löydy');
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

// Haetaan yksittäinen työmaa
export const fetchSingleWorksite = createAsyncThunk(
  'worksite/singleWorksite',
  async(id, {getState, rejectWithValue}) => {
    try {
      console.log("sliceee", id);

      const token = getState().userState.user.token;
      const response = await customFetch.get(`/worksites/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.status !== 200) {
        throw new Error('Yritystä ei löydy');
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

// Lähetetään pohjakuvan keykoodi
export const addWorksiteFloorplanKey = createAsyncThunk(
  'worksite/addFloorplan',
  async({worksiteId, key, title}, {getState, rejectWithValue}) => {
    
    try {
      const token = getState().userState.user.token;
      const response = await customFetch.post(`/worksites/${worksiteId}/floorplan`,
        {key, title},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.status !== 200) {
          throw new Error("virhe lähettäessä floorplankey")
        }
        return response.data;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

//Etsitään työntekijät jotka ovat liittynyt yritykseen
export const companyWorkers = createAsyncThunk(
  'company/workers',
  async(companyId, {getState, rejectWithValue}) => {
    
    try {
      
      const token = getState().userState.user.token;
      const response = await customFetch.get(`company/${companyId}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.status !== 200) {
        throw new Error('virhe hakiessä yhtiön työntekijöitä')
      }
      return response.data

    } catch (error) {
      return rejectWithValue(error.message);
    }

  }
)

const initialState = {
    company: null,
    worksites: null,
    worksiteDetails: null,
    companyWorkers: null,
    loading: false,
    message: null,
    error: null
  };

const companySlice = createSlice({
    name:'company',
    initialState,
    reducers: {
      clearWorksiteDetails: (state) => {
        state.worksiteDetails = null;
      },
      clearCompanyDetails: (state) => {
        state.worksiteDetails = null,
        state.company = null,
        state.worksites = null
      },
      updateWorksiteDetails: (state,action) => {
        state.worksiteDetails = action.payload;
      }
      
  
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
      })

      // Käsittely fetchcompanyWorksites-toiminnolle
      .addCase(fetchCompanyWorksites.pending, (state) => {
        // Voit halutessasi käyttää erillistä lataustilaa työmaiden tiedoille
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyWorksites.fulfilled, (state, action) => {
        state.worksites = action.payload;
        state.loading = false;
      })
      .addCase(fetchCompanyWorksites.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      // Käsittely yksittäisen työmaan haulle
      .addCase(fetchSingleWorksite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleWorksite.fulfilled, (state, action) => {
        state.worksiteDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchSingleWorksite.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      // Käsitellellään yhtiön työntekijöitten haku
      .addCase(companyWorkers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(companyWorkers.fulfilled, (state, action) => {
        state.companyWorkers = action.payload;
        state.loading = false;
      })
      .addCase(companyWorkers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      //käsittely floorplankeyn lähettämiseen
      .addCase(addWorksiteFloorplanKey.fulfilled, (state,action) => {
        const updatedWorksite = action.payload;
        if (state.worksiteDetails && state.worksiteDetails._id === updatedWorksite._id) {
          state.worksiteDetails = updatedWorksite;
      }
      })

      // Lisätään työntekijö työmaalle
      .addCase(addWorkerToWorksite.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.message = action.payload.message;
        } else {
          const updatedWorksite = action.payload;

          if (state.worksiteDetails && state.worksiteDetails._id === updatedWorksite._id) {
            state.worksiteDetails = updatedWorksite;
          }
        }
      })
      .addCase(addWorkerToWorksite.rejected, (state,action) => {
        state.error = action.error.message;
      })
    }
})

export const {clearWorksiteDetails, clearCompanyDetails, updateWorksiteDetails} = companySlice.actions;

export default companySlice.reducer;