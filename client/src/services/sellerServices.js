import { sellerApi } from "@/api/sellerApi";
import { handleRequest } from "@/utils/apiHandler";

export async function getProducts() {
  return handleRequest(() => sellerApi.getProducts());
}

export async function createProduct(data) {
  return handleRequest(() => sellerApi.createProducts(data));
}
export async function deleteProduct(productId) {
  return handleRequest(() => sellerApi.deleteProducts(productId));
}
export async function viewMyProduct(productId) {
  return handleRequest(() => sellerApi.viewProduct(productId));
}
export async function updateProduct(productId, data) {
  return handleRequest(() => sellerApi.updateProduct(productId, data));
}
export async function getCategories() {
  return handleRequest(() => sellerApi.getCategories());
}
export async function getSellerDashboard() {
  return handleRequest(() => sellerApi.getSellerDashboard());
}
export async function getSellerOrders() {
  return handleRequest(() => sellerApi.getSellerOrders());
}
