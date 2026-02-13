import api from "../axios/axiosInstance.js";
export const authApi = {
  register: (data) => api.post("auth/register", data),
  verify: (data) => api.post("auth/verify", data),
  login: (data) => api.post("auth/login", data),
  forgotPassword: (data) => api.post("auth/forgot-password", data),
  resetPassword: (data) => api.post("auth/reset-password", data),
};
