import { userApi } from "@/api/userApi";
export async function getCart() {
  try {
    const response = await userApi.getCart();
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}
export async function addToCart(data) {
  try {
    const response = await userApi.addToCart(data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}
export async function removeFromCart(productId) {
  try {
    const response = await userApi.removeFromCart(productId);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}
export async function getProducts(filters = {}) {
  try {
    const response = await userApi.getProducts(filters);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}
export async function getCategories() {
  try {
    const response = await userApi.getCategories();
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}

export async function getSingleProduct(productId) {
  try {
    const response = await userApi.getSingleProduct(productId);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}
export async function updateCartQuantity(productId, quantity) {
  try {
    const response = await userApi.updateCartQuantity(productId, quantity);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}
export async function createOrder(data) {
  try {
    const response = await userApi.createOrder(data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}
export async function getOrders() {
  try {
    const response = await userApi.getOrders();
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}
export async function getAddresses() {
  try {
    const response = await userApi.getAddresses();
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}
export async function addAddress(data) {
  try {
    const response = await userApi.addAddress(data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}

export async function setDefaultAddress(addressId) {
  try {
    const response = await userApi.setDefaultAddress(addressId);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}
export async function buyNow(data) {
  try {
    const response = await userApi.buyNow(data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.message);
  }
}
