import request from "../utils/request";


export const login = params => request({ method: 'post', url: '/sys/login', data: params });