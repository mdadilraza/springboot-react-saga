import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchEmployees, addEmployee, editEmployee, removeEmployee, fetchEmployeeById } from '../slices/employeeSlice';
import { listOfEmployess, createEmployee, updateEmployee, deleteEmployee, getEmployee } from '../services/EmployeeService';
import { act } from 'react';

function* fetchEmployeesSaga() {
    try {
        const response = yield call(listOfEmployess);
        yield put(fetchEmployees.fulfilled(response.data));
    } catch (error) {
        yield put(fetchEmployees.rejected(error));
    }
}
function * fetchEmployeeByIdSaga(action) {
    try {
        const response = yield call(getEmployee ,action.payload.id) ;
        yield put(fetchEmployeeById.fulfilled(response.data));

    } catch (error) {
        yield put(fetchEmployeeById.rejected(error))
    }
}

function* addEmployeeSaga(action) {
    try {
        const response = yield call(createEmployee, action.payload);
        yield put(addEmployee.fulfilled(response.data));
    } catch (error) {
        yield put(addEmployee.rejected(error));
    }
}

function* editEmployeeSaga(action) {
    try {
        const response = yield call(updateEmployee, action.payload.id, action.payload.employee);
        yield put(editEmployee.fulfilled(response.data));
    } catch (error) {
        yield put(editEmployee.rejected(error));
    }
}

function* removeEmployeeSaga(action) {
    try {
        yield call(deleteEmployee, action.payload);
        yield put(removeEmployee.fulfilled(action.payload));
    } catch (error) {
        yield put(removeEmployee.rejected(error));
    }
}

export default function* employeeSaga() {
    yield takeEvery(fetchEmployees.type, fetchEmployeesSaga);
    yield takeEvery(addEmployee.type, addEmployeeSaga);
    yield takeEvery(editEmployee.type, editEmployeeSaga);
    yield takeEvery(removeEmployee.type, removeEmployeeSaga);
    yield takeEvery(fetchEmployeeById.type ,fetchEmployeeByIdSaga);
}
