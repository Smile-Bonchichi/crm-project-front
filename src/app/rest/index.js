import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACK_URL
});

axiosInstance.interceptors.response.use(
    async (response) => {
        return await response.data;
    },
    async (err) => {
        throw err;
    }
);

axiosInstance.interceptors.request.use(
    async (config) => {
        return config;
    }
);

export default axiosInstance;
