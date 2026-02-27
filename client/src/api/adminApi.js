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
  addSubCategory: (data, categoryId) =>
    api.post(`/admin/subcategory/${categoryId}`, data),
  deleteSubCategory: (categoryId, subId) =>
    api.delete(`/admin/categories/${categoryId}/subcategories/${subId}`),
  deleteCategory: (categoryId) => api.delete(`/admin/categories/${categoryId}`),
  getUsersByRole: (type) => api.get(`/admin/users/${type}`),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`),
  getOrders: () => api.get("/admin/orders"),
  assignTransporter: (data) => api.patch("/admin/assign",data),
  getTransporters: () => api.get("/admin/transporters"),
};
