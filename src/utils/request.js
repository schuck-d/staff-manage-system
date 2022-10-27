import axios from 'axios';


const service = axios.create({
    baseURL: '/api',
    timeout: 5 * 1000
});

service.interceptors.request.use(config => {

    if (config.url !== '/sys/login') {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    }

    return config
}, error => {
    return Promise.reject(error)
});

service.interceptors.response.use(res => {
    return res.data
}, error => {
    return Promise.reject(error)
});

export default service;