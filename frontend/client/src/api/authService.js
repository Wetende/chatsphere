import { axiosInstance, axiosPrivate } from './axios';


export const register = async (userData) => {
    try {
        const response = await axiosInstance.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const login = async (credentials) => {
    try {
        const response = await axiosInstance.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getCurrentUser = async () => {
    try {
        const response = await axiosPrivate.get('/auth/me');
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const logout = async () => {
    try {
        const response = await axiosPrivate.post('/auth/logout');
        return response.data;
    } catch (error) {
        throw error;
    }
};

