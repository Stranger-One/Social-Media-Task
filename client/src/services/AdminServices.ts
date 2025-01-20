import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/admin`
})

interface AdminSignupData {
    name: string;
    password: string;
    email: string;
}

interface AdminSigninData {
    email: string;
    password: string;
}

export const adminSignup = async (adminData: AdminSignupData): Promise<any> => {
    try {
        const response = await axiosInstance.post(`/signup`, adminData);
        return response.data;
    } catch (error: any) {
        return error.response.data ? error.response.data : error.response;
    }
};

export const adminSignin = async (credentials: AdminSigninData): Promise<any> => {
    try {
        const response = await axiosInstance.post(`/login`, credentials);
        return response.data;
    } catch (error: any) {
        return error.response.data ? error.response.data : error.response;
    }
};

