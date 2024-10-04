import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure, registerRequest, registerSuccess, registerFailure } from '../slices/authSlice';
 import { loginEmployee, registerEmployee } from '../services/AuthEmployeeService';


async function loginApi(employee) {
    try {
        const response = await loginEmployee(employee);
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);
        return error
    }
}

function* handleLogin(action) {
    console.log(action.payload)
    try {
        const response = yield call(loginApi, action.payload);
        localStorage.setItem("user", response.data);
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
    yield takeEvery(loginRequest.type , handleLogin);
    yield takeLatest(registerRequest.type, handleRegister);
}
