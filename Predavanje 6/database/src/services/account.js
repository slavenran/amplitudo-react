import axios from 'axios';

export const login = (data) => {
    return axios({
        method: 'POST',
        baseURL: 'http://localhost:8080/api/',
        url: 'authenticate',
        data: data
      });
    
    // another way of doing it
    // return axiosInstance.post('authenticate', data);
}