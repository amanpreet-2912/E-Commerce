import api from "../axios/axiosInstance.js";
export const userApi = {
  getCart: () => api.get("/user/cart"),
  addToCart: (data) => api.post("/user/cart", data),
  removeFromCart: (productId) => api.delete(`/user/cart/${productId}`),
  getProducts: (filters) => api.get("/user/products", { params: filters }),
  getCategories: () => api.get("/user/categories"),
  getSingleProduct: (productId) => api.get(`/user/product/${productId}`),
  updateCartQuantity: (productId, quantity) =>
    api.put(`/user/cart/${productId}`, { quantity }),
  createOrder: (data) => api.post("/user/cart/checkout", data),
  getOrders: () => api.get("/user/orders"),
  getAddresses: () => api.get("/user/addresses"),
  addAddress: (data) => api.post("/user/address", data),
  setDefaultAddress: (addressId) => api.put(`/user/cart/address/${addressId}`),
  buyNow: (data) => api.post("/user/order", data),
};
