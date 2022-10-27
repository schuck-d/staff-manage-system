import request from "../utils/request";

export const getDepartmentList = params => request({ url: '/company/department', params });