import api from "../axios/axiosInstance.js";
export const adminApi = {
  getUsers: () => api.get("admin/users"),
  getPendingUsers: () => api.get("admin/pending"),
  approveUser: (userId) => api.patch(`admin/approve/${userId}`),
  rejectUser: (userId) => api.patch(`admin/reject/${userId}`),
  getProducts: () => api.get("/admin/products"),
  getAdminInfo: () => api.get("/admin/adminInfo"),
  deleteProduct: (productId) => api.delete(`/admin/products/${productId}`),
  getSingleProduct: (productId) => api.get(`/admin/products/${productId}`),
  getCategories: () => api.get("/admin/categories"),
  addCategory: (data) => api.post("/admin/category", data),
};
