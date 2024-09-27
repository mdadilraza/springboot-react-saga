import axios from 'axios'

const REST_API_BASE_URL="http://localhost:8082/api/auth";
export const registerEmployee =(employee)=>axios.post(REST_API_BASE_URL+'/register' ,employee)
export const loginEmployee = (employee) =>axios.post(REST_API_BASE_URL+'/login' ,employee)
