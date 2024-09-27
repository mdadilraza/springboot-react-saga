import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { listOfEmployess, createEmployee, updateEmployee, deleteEmployee } from '../services/EmployeeService';

// Async Thunks
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
    const response = await listOfEmployess();
    return response.data;
});

export const addEmployee = createAsyncThunk('employees/addEmployee', async (employee) => {
    const response = await createEmployee(employee);
    return response.data;
});

export const editEmployee = createAsyncThunk('employees/editEmployee', async ({ id, employee }) => {
    const response = await updateEmployee(id, employee);
    return response.data;
});

export const removeEmployee = createAsyncThunk('employees/removeEmployee', async (id) => {
    await deleteEmployee(id);
    return id; // return the id of the deleted employee
});

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employees: [],
        employee: null,
        loading: false,
        error: null,
    },
    reducers: {
        setEmployee: (state, action) => {
            state.employee = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.employees.push(action.payload);
            })
            .addCase(editEmployee.fulfilled, (state, action) => {
                const index = state.employees.findIndex(emp => emp.id === action.payload.id);
                if (index !== -1) {
                    state.employees[index] = action.payload;
                }
            })
            .addCase(removeEmployee.fulfilled, (state, action) => {
                state.employees = state.employees.filter(emp => emp.id !== action.payload);
            });
    },
});

export const { setEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
