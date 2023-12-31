import axios from 'axios'
import { type ProgressFinisher, useProgress } from '@marcoschulte/vue3-progress';

const progresses = [] as ProgressFinisher[];

const hostURL = import.meta.env.VITE_API_URL;
const apiURL = `${hostURL}/api/`;


// create instances #######################################################

const $instance = axios.create({
    baseURL: apiURL,
    headers: {
        Accept: 'application/json',
        withCredentials: true,
        'Content-Type': 'application/json',
    }
})

const $instanceUnderground = axios.create({
    baseURL: apiURL,
    headers: {
        Accept: 'application/json',
        withCredentials: true,
        'Content-Type': 'application/json',
    }
});

const $instanceForm = axios.create({
    baseURL: apiURL,
    headers: {
        Accept: 'application/json',
        withCredentials: true,
        'Content-Type': 'multipart/form-data',
    }
})


// create interceptor for renewing token ##########################################3
const setAuthorizationAndAddProgress = (config: any) => {
    const token = localStorage.getItem('condonote:$authTkn');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    progresses.push(useProgress().start());

    return config;
};

const finishProgressAndReturnResponse = (resp: any) => {
    progresses.pop()?.finish();
    return resp;
}

// Set interceptors
$instance.interceptors.request.use(setAuthorizationAndAddProgress);
$instanceForm.interceptors.request.use(setAuthorizationAndAddProgress);

$instance.interceptors.response.use(finishProgressAndReturnResponse, error => {
    progresses.pop()?.finish();
    return Promise.reject(error);
});

$instanceForm.interceptors.response.use(finishProgressAndReturnResponse, error => {
    progresses.pop()?.finish();
    return Promise.reject(error);
});

export {
    $instance, $instanceForm, $instanceUnderground
}