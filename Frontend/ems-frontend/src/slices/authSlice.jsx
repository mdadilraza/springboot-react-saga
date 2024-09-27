import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.token = action.payload.token;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        registerRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state) => {
            state.loading = false;
        },
        registerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
} = authSlice.actions;

export default authSlice.reducer;
