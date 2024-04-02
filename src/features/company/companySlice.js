
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../../utils";

import { handleTokenExpiry } from "../../utils/calculateTokenExp";
import apiMiddleware from "../middleWare/refresMiddleWare";


export const addNewWorksite = createAsyncThunk(
  'worksite/addnew',
  async(data, {getState, rejectWithValue}) => {
    return apiMiddleware(async () => {
      try {
        const {address,city, startTime, worktype} = data;
        // console.log("lisätäääääää", address, city,startTime,worktype)
        const token = getState().userState.user.token;
        const response = await customFetch.post(`/worksites`, {address, city,startTime,worktype}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.status !== 200) {
          throw new Error('Jotain meni vikaan työmaan lisäämisessä')
        }
      } catch (error) {
        return rejectWithValue(error.message);
      }
    })
  }
)

// työmaan poistaminen
export const deleteWorksite = createAsyncThunk(
  'worksite/delete',
  async(worksiteId, {getState, rejectWithValue}) => {
    return apiMiddleware(async () => {
      try {
        const token = getState().userState.user.token;
        const response = await customFetch.delete(`/worksites/${worksiteId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.status !== 200) {
          throw new Error('Jotain meni vikaan työmaan poistossa')
        }
      } catch (error) {
        return rejectWithValue(error.message);
      }
    })
  }
)


// Poistataan työntekijä työmaalta
export const deleteWorkerfromWorksite = createAsyncThunk(
  'company/deleteWorker',
  async({worksiteId, workerId}, {getState, rejectWithValue}) => {
    return apiMiddleware(async () => {
      try {
        const token = getState().userState.user.token;
        const response = await customFetch.delete(`worksites/${worksiteId}/workers/${workerId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
  
        if (response.status !== 200) {
          throw new Error('Jotain meni vikaan työntekijän poistamisessa työmaalta')
        }
        return response.data
      } catch (error) {
        return rejectWithValue(error.message);
      }
    })
  }
)



// Lisätään työntekijä työmaahan
export const addWorkerToWorksite = createAsyncThunk(
  'company/addWorkertocompany',
  async({worksiteId, workerId}, {getState, rejectWithValue}) => {
    return apiMiddleware(async () => {
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
        return rejectWithValue(error.message);
      }
    })
  }
)



// AsyncThunk yrityksen tietojen hakemiseen
export const fetchCompanyDetails = createAsyncThunk(
    'company/fetchDetails',
    async (_, { getState, dispatch, rejectWithValue }) => {
      return apiMiddleware(async () => {
        try {
          const token = getState().userState.user.token;

          console.log("companySlice token", token);
          
          const response = await customFetch.get('/company', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          
          if (response.status !== 200) {
            throw new Error('yritystä ei ole')
          }
         
          return response.data
        } catch (error) {
          return rejectWithValue(error.message);
        }
      })
    }
  );


  // Haetaan yhtiön työmaat
export const fetchCompanyWorksites = createAsyncThunk(
  'company/fetchWorksites',
  async(_, {getState, rejectWithValue}) => {
    return apiMiddleware(async () => {
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
        return response.data
      } catch (error) {
        return rejectWithValue(error.message);
        
      }
    })
  }
)




// Haetaan yksittäinen työmaa
export const fetchSingleWorksite = createAsyncThunk(
  'worksite/singleWorksite',
  async(id, {getState, rejectWithValue}) => {
    return apiMiddleware(async () => {
      try {
        const token = getState().userState.user.token;
        const response = await customFetch.get(`/worksites/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.status !== 200) {
          throw new Error('Yritystä ei lyödy')
        }
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    })
  }
)


// Lähetetään pohjakuvan keykoodi

export const addWorksiteFloorplanKey = createAsyncThunk(
  'worksite/addFloorplan',
  async({worksiteId, key,title}, {getState, rejectWithValue}) => {
    return apiMiddleware(async () => {
      try {
        const token = getState().userState.user.token;
        const response = await customFetch.post(`/worksites/${worksiteId}/floorplan`, {key,title}, {
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
    })
  }
)


//Etsitään työntekijät jotka ovat liittynyt yritykseen
export const companyWorkers = createAsyncThunk(
  'company/workers',
  async(companyId, {getState, rejectWithValue}) => {
    return apiMiddleware(async () => {
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
    })
  }
)



const initialState = {
    company: null,
    worksites: null,
    worksiteDetails: null,
    companyWorkers: null,
    loading: false,
    message: null,
    error: null,
    testi: null
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
      .addCase(addWorkerToWorksite.pending, (state) => {
        
        // state.loading = true;
        state.error = null;
      })
      .addCase(addWorkerToWorksite.fulfilled, (state, action) => {
       
        if (action.payload.message) {
          state.message = action.payload.message;
        } else {
          const updatedWorksite = action.payload;

          if (state.worksiteDetails && state.worksiteDetails._id === updatedWorksite._id) {
            state.worksiteDetails = updatedWorksite;
          }
        }
        state.loading = false;
      })
      .addCase(addWorkerToWorksite.rejected, (state,action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      // poistetaan työntekijö työmaalta
      .addCase(deleteWorkerfromWorksite.pending, (state) => {
        
      })
      .addCase(deleteWorkerfromWorksite.fulfilled, (state, action) => {
        
        const updatedWorksite = action.payload.worksite;
        if (state.worksiteDetails && state.worksiteDetails._id === updatedWorksite._id) {
          // Päivitä worksiteDetails työmaan uudella tiedolla
          state.worksiteDetails = updatedWorksite;
        }
        // Voi tallentaa viestin, jos haluaa näyttää ilmoituksen käyttäjälle
        state.message = action.payload.message;
        state.loading = false;
      })
    }
})

export const {clearWorksiteDetails, clearCompanyDetails, updateWorksiteDetails} = companySlice.actions;

export default companySlice.reducer;