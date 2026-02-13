import { adminApi } from "@/api/adminApi";
export async function getAllUsers() {
  try {
    const response = await adminApi.getUsers();
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message || "error in getting users");
  }
}
export async function getPendingUsers() {
  try {
    const response = await adminApi.getPendingUsers();
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(
      err.response?.data?.message || "error getting pending users",
    );
  }
}
export async function approveUser(userId) {
  try {
    const response = await adminApi.approveUser(userId);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message || "error approving user");
  }
}
export async function rejectUser(userId) {
  try {
    const response = await adminApi.rejectUser(userId);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message || "error in rejecting user");
  }
}
export async function getAllProducts() {
  try {
    const response = await adminApi.getProducts();

    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message);
  }
}
export async function getAdminStat() {
  try {
    const response = await adminApi.getAdminInfo();
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message);
  }
}
export async function deleteProduct(productId) {
  try {
    const response = await adminApi.deleteProduct(productId);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message);
  }
}
export async function getSingleProduct(productId) {
  try {
    const response = await adminApi.getSingleProduct(productId);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message);
  }
}
