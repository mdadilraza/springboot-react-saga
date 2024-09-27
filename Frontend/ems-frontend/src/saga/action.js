import { createAction } from '@reduxjs/toolkit';

export const fetchEmployees = createAction('employee/fetchEmployees');
export const fetchEmployee = createAction('employee/fetchEmployee');
export const addEmployee = createAction('employee/addEmployee');
export const updateEmployee = createAction('employee/updateEmployee');
export const deleteEmployee = createAction('employee/deleteEmployee');
