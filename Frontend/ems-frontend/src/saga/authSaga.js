import { call, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure, registerRequest, registerSuccess, registerFailure } from '../slices/authSlice';
 import { loginEmployee, registerEmployee } from '../services/AuthEmployeeService';


function* handleLogin(action) {
    try {
        const response = yield call(loginEmployee, action.payload);
        localStorage.setItem("token", response.data.token);
        yield put(loginSuccess(response.data));
    } catch (error) {
        yield put(loginFailure(error.response.data));
    }
}

function* handleRegister(action) {
    try {
        yield call(registerEmployee, action.payload);
        yield put(registerSuccess());
    } catch (error) {
        yield put(registerFailure(error.response.data));
    }
}

export function* authSaga() {
    yield takeLatest(loginRequest.type, handleLogin);
    yield takeLatest(registerRequest.type, handleRegister);
}
