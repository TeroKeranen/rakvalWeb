

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../../utils/index";

const themes = {
    winter: 'winter',
    dracula: 'dracula',
}

const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('user')) ||null;
}

const getThemeFromLocalStrorage = () => {
    const theme =  localStorage.getItem('theme') || themes.winter
    document.documentElement.setAttribute('data-theme', theme)
    return theme;
}


const initialState = {
    user: getUserFromLocalStorage(),
    theme: getThemeFromLocalStrorage(),
    urls: null
}

export const fetchUserDetails = createAsyncThunk(
    'user/fetchDetails',
    async (id, {getState,rejectWithValue}) => {
        try {
            const token = getState().userState.user.token;
            
            
            const response = await customFetch.get(`/users/${id}`, {
                
                headers: {
                    'Authorization' : `Bearer ${token}`,
                    
                }
            });
            console.log("täh")
            if (!response.status === 200) {
                console.log("kskjs")
                throw new Error('käöyttähjäj ei ole')
            }
            let testidata = {data: response.data}
            return testidata
        } catch (error) {
            console.log("errrrooooooo");
            return rejectWithValue(error.message);
            
        }
    }
)

// haetaan backendistä aws url ja laitetaan se stateen
export const fetchAwsUrl = createAsyncThunk(
    'aws/url',
    async (_, {getState, rejectWithValue}) => {
        try {
            const token = getState().userState.user.token;
            const response = await customFetch.get('/aws-url', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            
        }
    }
)

// haetaa käyttäjän halutun käyttäjän tiedot id avulla
export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async(userId, {getState, rejectWithValue}) => {
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
    }
)
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
        verifyUser: (state) => {
            if (state.user) {
                state.user.isVerified = true;
                
                localStorage.setItem('user', JSON.stringify({...state.user, isVerified: true}));
            }
        },
        loginUser: (state, action) => {
            const user = {...action.payload.user, token: action.payload.token}
            
            state.user = user;
            
            localStorage.setItem('user', JSON.stringify(user))
        },
        logoutUser: (state) => {
            state.user = null;
            state.company = null;
            state.worksites = null
            localStorage.removeItem('user');
            
        },
        toggleTheme: (state) => {
            const {dracula, winter} = themes;
            state.theme = state.theme === dracula ? winter : dracula
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
        console.log(state,action);
        state.error = action.error.message;
        
      })
      .addCase(fetchAwsUrl.fulfilled, (state, action) => {
        state.urls = action.payload
      })
    }
})

export const {loginUser,logoutUser,toggleTheme, verifyUser} = authSlice.actions;

export default authSlice.reducer