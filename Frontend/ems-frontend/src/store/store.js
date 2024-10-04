
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../slices/employeeSlice'
import authReducer from "../slices/authSlice"

const store = configureStore({
    reducer: {
        employee: employeeReducer,
       auth: authReducer
    },
});

export default store;

