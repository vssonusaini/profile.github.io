import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("auth");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
    error => {
        return Promise.reject(error)
    }
);
api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        let message = "Something went wrong!";
        if (error.response && error.response.data && error.response.data.message) {
            message = error.response.data.message
        } else if (error.message) {
            message = error.message
        }
        return Promise.reject(new Error(message));
    }
);

export default api;