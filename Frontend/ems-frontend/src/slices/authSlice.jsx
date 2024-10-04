import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null, // JWT or access token
    userRole: null, // Role of the user, e.g., 'ROLE_ADMIN' or 'ROLE_EMPLOYEE'
    loading: false, // Status of authentication or registration requests
    error: null, // Any authentication or registration error
    isAuthenticated: false, // Whether the user is authenticated
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
            state.userRole = action.payload.userRole; // Save the user role
            state.isAuthenticated = true; // Mark user as authenticated
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
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
        logout: (state) => {
            state.token = null;
            state.userRole = null;
            state.isAuthenticated = false; // Mark user as logged out
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
    logout,
} = authSlice.actions;

export default authSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     token: null,
//     loading: false,
//     error: null,
// };

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         loginRequest: (state) => {
//             state.loading = true;
//             state.error = null;
//         },
//         loginSuccess: (state, action) => {
//             state.loading = false;
//             state.token = action.payload.token;
//         },
//         loginFailure: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//         registerRequest: (state) => {
//             state.loading = true;
//             state.error = null;
//         },
//         registerSuccess: (state) => {
//             state.loading = false;
//         },
//         registerFailure: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//     },
// });

// export const {
//     loginRequest,
//     loginSuccess,
//     loginFailure,
//     registerRequest,
//     registerSuccess,
//     registerFailure,
// } = authSlice.actions;

// export default authSlice.reducer;
