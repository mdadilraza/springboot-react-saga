import { combineReducers } from 'redux';
import employeeReducer from '../slices/employeeSlice';

const rootReducer = combineReducers({
    employee: employeeReducer,
    // Add other slices here
});

export default rootReducer;
