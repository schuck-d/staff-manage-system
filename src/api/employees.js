import request from "../utils/request";

export const getSysUserList = params => request({ url: `/sys/user?page=${params.page}&size=${params.size}` });