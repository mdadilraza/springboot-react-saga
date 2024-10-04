
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8082/api/v1/employees',  
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        
        const user = JSON.parse(localStorage.getItem("user"));
        let token='';
       if(user) {
         token=user.token;
       }
       
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
       
        console.log("error at interceptor - ", error);
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => {
       
        return response;
    },
    (error) => {
        
        if(error.response.status ===401){
            console.log('Unauthorized, logging out...');
           
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;


