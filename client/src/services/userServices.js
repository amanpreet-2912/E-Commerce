import { userApi } from "@/api/userApi";
import { handleRequest } from "@/utils/apiHandler";
export async function getCart() {
  return handleRequest(() => userApi.getCart());
}
export async function addToCart(data) {
  return handleRequest(() => userApi.addToCart(data));
}
export async function removeFromCart(productId) {
  return handleRequest(() => userApi.removeFromCart(productId));
}
export async function getProducts(filters = {}) {
  return handleRequest(() => userApi.getProducts(filters));
}
export async function getCategories() {
  return handleRequest(() => userApi.getCategories());
}

export async function getSingleProduct(productId) {
  return handleRequest(() => userApi.getSingleProduct(productId));
}
export async function updateCartQuantity(productId, quantity) {
  return handleRequest(() => userApi.updateCartQuantity(productId, quantity));
}
export async function createOrder(data) {
  return handleRequest(() => userApi.createOrder(data));
}
export async function getOrders() {
  return handleRequest(() => userApi.getOrders());
}
export async function getAddresses() {
  return handleRequest(() => userApi.getAddresses());
}
export async function addAddress(data) {
  return handleRequest(() => userApi.addAddress(data));
}

export async function setDefaultAddress(addressId) {
  return handleRequest(() => userApi.setDefaultAddress(addressId));
}
export async function buyNow(data) {
  return handleRequest(() => userApi.buyNow(data));
}
