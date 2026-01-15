import axios from 'axios';
import Cookies from 'js-cookie';

const hostURL = import.meta.env.VITE_API_URL || 'http://localhost:8000'; // Default fallback
const apiURL = `${hostURL}/api/`;

export const $instance = axios.create({
    baseURL: apiURL,
    headers: {
        Accept: 'application/json',
        withCredentials: true,
        'Content-Type': 'application/json',
    }
});

export const $instanceUnderground = axios.create({
    baseURL: apiURL,
    headers: {
        Accept: 'application/json',
        withCredentials: true,
        'Content-Type': 'application/json',
    }
});

export const $instanceForm = axios.create({
    baseURL: apiURL,
    headers: {
        Accept: 'application/json',
        withCredentials: true,
        'Content-Type': 'multipart/form-data',
    }
});

const setAuthorization = (config: any) => {
    const token = Cookies.get('condonote_tokn');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

$instance.interceptors.request.use(setAuthorization);
$instanceForm.interceptors.request.use(setAuthorization);

// Can add global error handling here if needed
