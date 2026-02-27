import api from "../axios/axiosInstance";
export const transporterApi = {
  getOrders: () => api.get("/transporter/orders"),
  changeStatus: (data) => api.patch("/transporter/status", data),
};
