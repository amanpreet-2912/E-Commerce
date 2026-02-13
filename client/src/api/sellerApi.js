import api from "../axios/axiosInstance.js";
export const sellerApi = {
  getProducts: () => api.get("seller/products"),
  createProducts: (data) => api.post("seller/products", data),
  deleteProducts: (productId) => api.delete(`seller/products/${productId}`),
  viewProduct: (productId) => api.get(`seller/product/${productId}`),
  updateProduct: (productId,data) => api.put(`seller/product/${productId}`,data),
};
