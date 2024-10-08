

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../../utils/index";

import apiMiddleware from "../middleWare/refresMiddleWare";

const themes = {
    retro: 'retro',
    dracula: 'dracula',
}

const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('user')) ||null;
}

const getThemeFromLocalStrorage = () => {
    const theme =  localStorage.getItem('theme') || themes.retro
    document.documentElement.setAttribute('data-theme', theme)
    return theme;
}


const initialState = {
    user: getUserFromLocalStorage(),
    theme: getThemeFromLocalStrorage(),
    urls: null,
    usersById: {}
}

export const logout = createAsyncThunk(
    'user/logout',
    async (_, { getState, dispatch }) => {
        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;

        // const refreshToken = getState().userState.user.refreshToken;
        const refreshToken = user ? user.refreshToken : null;

        
        if (refreshToken) {
            try {
                // Lähetä pyyntö backendiin poistamaan refresh token
                await customFetch.post('/logout', { refreshToken });

                // Päivitä Redux storen tila
                // dispatch(clearUserState());
            } catch (error) {
                // Käsittele mahdolliset virheet
                console.error("Logout error: ", error);
            }
        } else {
            // Päivitä Redux storen tila, jos ei refresh tokenia
            // dispatch(clearUserState());
        }
    }
)

export const changePassword = createAsyncThunk(
    'user/changepassword',
    async ({oldPassword, newPassword}, {getState, rejectWithValue}) => {
        return apiMiddleware(async () => {
            try {
                
                
                const token = getState().userState.user.token;
                const response = await customFetch.post(`/change-password`, {oldPassword, newPassword}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (response.status === 200) {
                    return response.data
                } else {
                    const errorData = await response.json();
                    // console.log("errordata", errorData)
                    
                    return rejectWithValue(response.data.error || "Password change failed");
                }
            } catch (error) {
                // console.log("error", error)
                if (error.response.data.passwordtypeError) {
                    return error.response.data
                }
                return rejectWithValue(error.message);
            }
        })
    }
)



// Käytetään tätä kun haetaan kirjautuneen käyttäjän tiedot ja laitetaan ne storageen
export const fetchUserDetails = createAsyncThunk(
    'company/fetchUserDetails',
    async (id, {getState,rejectWithValue}) => {
        
        return apiMiddleware(async () => {
            try {
                const token = getState().userState.user.token;
                
                const response = await customFetch.get(`/users/${id}`, {
                
                headers: {
                    'Authorization' : `Bearer ${token}`,
                    
                }
            });
            
            
            return response.data
            } catch (error) {
                // console.log("errrrooooooo");
                return rejectWithValue(error.message);
            }
        })
    }
)



// // haetaan backendistä aws url ja laitetaan se stateen
export const fetchAwsUrl = createAsyncThunk(
    'aws/url',
    async(_, {getState,rejectWithValue}) => {
        return apiMiddleware(async () => {
            try {
                const token = getState().userState.user.token;
                const response = await customFetch.get('/aws-url', {
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

export const getSignedUrl = createAsyncThunk(
    'aws/signedurl',
    async({bucketName, objectKey}, {getState, rejectWithValue}) => {
        return apiMiddleware(async () => {
            try {
                const token = getState().userState.user.token;
                const response = await customFetch.get(`/get-signed-url?bucketName=${encodeURIComponent(bucketName)}&objectKey=${encodeURIComponent(objectKey)}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                return response.data;
            } catch (error) {
                return rejectWithValue(error.message)
                
            }
        })
    }
)



// // haetaa käyttäjän halutun käyttäjän tiedot id avulla
export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async(userId, {getState,rejectWithValue}) => {
        return apiMiddleware(async () => {
            try {
                const token = getState().userState.user.token;
                const response = await customFetch.get(`users/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                return response.data;
            } catch (error) {
                return rejectWithValue(error.message)
            }
        })
    }
)

export const deleteAccount = createAsyncThunk(
    'user/deleteAccount',
    async(_, {getState, dispatch, rejectWithValue}) => {
        return apiMiddleware(async () => {
            try {
                const token = getState().userState.user.token;
                const response = await customFetch.delete('/deleteAccount', {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                })

                if (response.status === 200) {
                    dispatch(logout()); // Olettaen että logout kutsuu localStoragen puhdistusta
                    return response.data;
                }else {
                    const errorData = await response.json();
                    return rejectWithValue(errorData.error || "Failed to delete account");
                }
                
            } catch (error) {
                return rejectWithValue(error.message);
            }
        })
    }
)

export const resetPasswordRequest = createAsyncThunk(
    'user/resetPasswordRequest',
    async(email, {rejectWithValue}) => {
        try {
            const response = await customFetch.post('/password-reset', {email});

            
            if (response.status === 200) {
                return response.data;
            } else {
                const errorData = await response.json();
                return rejectWithValue(errorData.error || 'plääh')
            }
        } catch (error) {
            
            
                
            return rejectWithValue(error.response.data);
        }
    }
)

export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async({token, newPassword}, {rejectWithValue}) => {

        
        try {
            const response = await customFetch.post(`/reset-password/${token}`, {
                
                newPassword
            })
            
            if (response.status === 200) {
                return response.data;
            } else {
                const errorData = await response.json();
                
                return rejectWithValue(errorData.error || "password reset failed")
            }
        } catch (error) {
            
            
            // return rejectWithValue(error.request.data);
            return rejectWithValue(error.response.data);
        }
    }
)





/// EI OLE OLLUT KÄYTÖSSÄ
// export const fetchUserCompany = createAsyncThunk(
//     'company',
//     async (_, {getState, rejectWithValue}) => {
//         try {
//             const token = getState().userState.user.token;

//             const response = await customFetch.get('/testi', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
                    
//                 }
                
//             })
//             let testidata = {testi: response.data}
//             return testidata
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// )
const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearWorksiteWorkersNames: (state) => {
            state.usersById = {}
        },
        verifyUser: (state) => {
            if (state.user) {
                state.user.isVerified = true;
                
                localStorage.setItem('user', JSON.stringify({...state.user, isVerified: true}));
            }
        },
        loginUser: (state, action) => {
            
            const user = {...action.payload.user, token: action.payload.accessToken, refreshToken: action.payload.refreshToken, tokenExpiry: action.payload.tokenExpiry}
            
            state.user = user;
            
            localStorage.setItem('user', JSON.stringify(user))
        },
        updateAccessToken: (state, action) => {
            if (state.user) {
                state.user.token = action.payload.accessToken;
                state.user.tokenExpiry = action.payload.tokenExpiry;
                state.user.refreshToken = action.payload.refreshToken;
            }
        },
        logoutUser: (state) => {
            state.user = null;
            state.company = null;
            state.worksites = null
            localStorage.removeItem('user');
            
        },
        toggleTheme: (state) => {
            const {dracula, retro} = themes;
            state.theme = state.theme === dracula ? retro : dracula
            document.documentElement.setAttribute('data-theme', state.theme)
            localStorage.setItem('theme', state.theme)
        }
    },
    extraReducers: (builder) => {
        builder
        

      
      .addCase(fetchUserDetails.pending, (state) => {
        // Voit asettaa tilaan esimerkiksi lataustilan
        
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        // Tallenna käyttäjän tiedot, kun pyyntö onnistuu
        
        state.user = { ...state.user, ...action.payload };
        
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        // Käsittele virhetilanne, jos pyyntö epäonnistuu
        
        state.error = action.error.message;
        
      })
      .addCase(fetchAwsUrl.fulfilled, (state, action) => {
        
        state.urls = action.payload
      })
      .addCase(fetchUser.fulfilled, (state,action ) => {
        const userData = action.payload;
        state.usersById[userData._id] = userData;
      })
      .addCase(getSignedUrl.fulfilled, (state,action) => {
        state.urls = action.payload
      })

      // käyttäjän poisto
      .addCase(deleteAccount.pending, (state) => {
        // Voit lisätä tilaan indikaation, että poisto on käynnissä
        })
        .addCase(deleteAccount.fulfilled, (state, action) => {
            // Käsittele tila, kun käyttäjätili on onnistuneesti poistettu
            state.user = null; // Aseta käyttäjätila tyhjäksi
        })
        .addCase(deleteAccount.rejected, (state, action) => {
            // Käsittele virhetilanne, jos pyyntö epäonnistuu
            state.error = action.error.message;
        });

      // tokenin uusiminen
    //   .addCase(refreshAccessToken.fulfilled, (state,action) => {
    //     state.user = {
    //         ...state.user, token: action.payload.accessToken, tokenExpiry: action.payload.tokenExpiry
    //     }
    //     localStorage.setItem('user', JSON.stringify(state.user))
    //   })
    }
})

export const {loginUser,updateAccessToken,logoutUser,toggleTheme, verifyUser, clearWorksiteWorkersNames} = authSlice.actions;

export default authSlice.reducer;