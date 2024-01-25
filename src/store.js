import { configureStore } from "@reduxjs/toolkit";

import authReducer from './features/auth/authSlice'
import companyReducer from './features/company/companySlice'
import worksiteReducer from './features/worksite/worksiteSlice'


export const store = configureStore({
    reducer: {
        userState: authReducer,
        companyState: companyReducer,
        worksiteState: worksiteReducer
    }
})