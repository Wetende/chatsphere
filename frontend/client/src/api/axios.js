import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/v1';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

const axiosPrivate = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

axiosPrivate.interceptors.request.use((config) => {
    const token = localStorage.getItem('craftyxhub_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosPrivate.interceptors.response.use((r) => r, (err) => {
    if (err.response?.status === 401) {
        localStorage.removeItem('craftyxhub_token');
        localStorage.removeItem('craftyxhub_user');
        window.location.href = '/auth/login';
    }
    return Promise.reject(err);
});

export default axiosInstance;
export { axiosInstance, axiosPrivate }; 