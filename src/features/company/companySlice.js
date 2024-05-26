
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../../utils";

import { handleTokenExpiry } from "../../utils/calculateTokenExp";
import apiMiddleware from "../middleWare/refresMiddleWare";
import { addCalendarEntry, deleteCalendarEntry,addProductToWorksite, deleteProductFromWorksite, updateProductOnWorksite } from "../worksite/worksiteSlice";


export const addNewWorksite = createAsyncThunk(
  'worksite/addnew',
  async(data, {getState, rejectWithValue}) => {
    return apiMiddleware(async () => {
      try {
        const {address,city, startTime, worktype, duehours} = data;
        console.log("lisätäääääää", address, city,startTime,worktype,duehours)
        const token = getState().userState.user.token;
        const response = await customFetch.post(`/worksites`, {address, city,startTime,worktype, duehours}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        console.log("API response received", response);
        
        
        if (!response.status === 200) {
          
          throw new Error(`Jotain meni vikaan työmaan lisäämisessä`);
        }
        
        return response.data;
      } catch (error) {
        if (error.response.data.success === false && error.response.status === 403);
        
        return rejectWithValue({paidUser: false}); // TÄMÄ PALAUETTEAAN SIVULLE
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
        
        console.log("DELETE",response);
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

export const fetchEvents = createAsyncThunk(
  'company/events',
  async(_, {getState, rejectWithValue}) => {
    return apiMiddleware(async () => {
      try {
        const token = getState().userState.user.token;
        const response = await customFetch.get('/events', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.status !== 200) {
          throw new Error("tapahtumien haku epäonnistui")
        }

        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    })
  }

)

export const addCompany = createAsyncThunk(
  'company/addCompany',
  async(data, {getState, rejectWithValue}) => {
      return apiMiddleware(async () => {
          try {
              const token = getState().userState.user.token;
              const response = await customFetch.post(`/createCompany`, data, {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              })

              return {success: true, data:response.data};
          } catch (error) {
              return rejectWithValue(error.message);
          }
      })
  }
)

export const joinCompany = createAsyncThunk(
  'user/joinCompany',
  async({userId, companyCode}, {getState, rejectWithValue}) => {
    return apiMiddleware(async () => {
      try {
          const token = getState().userState.user.token;
          const response = await customFetch.post(`/join-company`,{
            userId,
            companyCode
          }, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
          
          return response.data;
      } catch (error) {
        return rejectWithValue({success:false})
      }
    })
  }
  
)
export const leaveCompany = createAsyncThunk(
  'user/leaveCompany',
  async(userId, {getState, rejectWithValue}) => {
    return apiMiddleware(async () => {
      try {
          const token = getState().userState.user.token;
          const response = await customFetch.post(`/leave-company`,{userId}, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
          return response.data;
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
    events: null,
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
        state.worksites = null,
        state.events = null
      },
      updateWorksiteDetails: (state,action) => {
        state.worksiteDetails = action.payload;
      }
      
  
    },
    extraReducers: (builder) => {
        builder
      
        .addCase(addNewWorksite.fulfilled, (state, action) => {

          console.log("AADCASE", action.payload);
          // state.worksites.push(action.payload);  // Olettaen, että palautat uuden työmaan datan
          // state.loading = false;
        })
      .addCase(fetchCompanyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyDetails.fulfilled, (state, action) => {
        
        console.log("KSKSKSK", action.payload)
        state.company = action.payload;
        state.loading = false;
      })
      .addCase(fetchCompanyDetails.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // Yrityksen lisäys
      .addCase(addCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })  
      .addCase(addCompany.fulfilled, (state,action) => {
        
        state.company = action.payload.data;
        state.loading = false;
      })
      .addCase(addCompany.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // Liity yhtiöön
      .addCase(joinCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })  
      .addCase(joinCompany.fulfilled, (state,action) => {
        // console.log("JOINCOMPANY", action.payload.company)
        
        state.company = action.payload.data.company;
        // console.log("joincompany", action.payload)
        state.loading = false;
      })
      .addCase(joinCompany.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(leaveCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(leaveCompany.fulfilled, (state) => {
        state.company = null;
        state.worksiteDetails = null,
        state.company = null,
        state.worksites = null,
        state.events = null  // Poista yritys, koska käyttäjä on poistunut yrityksestä
        state.loading = false;
        state.error = null;
      })
      .addCase(leaveCompany.rejected, (state, action) => {
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
          const updatedWorksite = action.payload.data;
          console.log("updatedworksite", updatedWorksite)
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

      // työmaan poistaminen
      .addCase(deleteWorksite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWorksite.fulfilled, (state,action) => {
        
        state.loading = false;
        state.worksites = state.worksites.filter(worksite => worksite._id !== action.meta.arg); 
        state.error = null;
      })
      .addCase(deleteWorksite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // tapahtumien hakuun
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Päivitetään worksiteDetailit kun tehdään uusi kalenteri merkintä
      .addCase(addCalendarEntry.fulfilled, (state, action) => {
        state.worksiteDetails = action.payload;
      })

      // Päivitetään worksitedetailit kun poistetaan kalenteri merkintä
      .addCase(deleteCalendarEntry.fulfilled, (state,action) => {
        state.worksiteDetails = action.payload;
      })

      // Tuotteen lisäys
      .addCase(addProductToWorksite.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(addProductToWorksite.fulfilled, (state, action) => {
          state.loading = false;
                // console.log("AAAAAAAACTION",action.payload);
          state.worksiteDetails.products = action.payload.worksite.products;
                // Voit päivittää worksiten tuotteita tai muita tietoja tässä
                // Esimerkiksi:
                // state.worksite.products.push(action.payload.newProduct);
      })
      .addCase(addProductToWorksite.rejected, (state, action) => {
          state.error = action.payload;
          state.loading = false;
      })

      // Tuotteen poisto
      .addCase(deleteProductFromWorksite.fulfilled, (state, action) => {
        if (state.worksiteDetails && state.worksiteDetails._id === action.payload.worksite._id) {
            state.worksiteDetails.products = action.payload.worksite.products;
        }
      })
      .addCase(updateProductOnWorksite.fulfilled, (state, action) => {
        // Päivitä tuotetiedot työmaan tuoteluettelossa
        if (state.worksiteDetails && state.worksiteDetails._id === action.payload.worksite._id) {
            state.worksiteDetails.products = action.payload.worksite.products;
        }
      })

    }
})

export const {clearWorksiteDetails, clearCompanyDetails, updateWorksiteDetails} = companySlice.actions;

export default companySlice.reducer;