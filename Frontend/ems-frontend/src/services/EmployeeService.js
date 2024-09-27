import axios from 'axios'
import axiosInstance from '../interceptor/employeeInterceptor';

const REST_API_BASE_URL="http://localhost:8082/api/v1/employees";

export const listOfEmployess =() => axiosInstance.get();


export const createEmployee =(employee) =>axiosInstance.post('', employee);
export const getEmployee =(employeeId) =>axiosInstance.get('/'+employeeId);
export const updateEmployee =(employeeId , employee) =>axiosInstance.put('/'+ employeeId ,employee);

export const deleteEmployee =(employeeId) => axiosInstance.delete('/' + employeeId);