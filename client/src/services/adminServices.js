import { adminApi } from "@/api/adminApi";
import { handleRequest } from "@/utils/apiHandler";

export async function getAllUsers() {

   return handleRequest(()=>adminApi.getUsers())
}
export async function getPendingUsers() {
 
   return handleRequest(()=>adminApi.getPendingUsers())
}
export async function approveUser(userId) {
 
   return handleRequest(()=>adminApi.approveUser(userId))
}
export async function rejectUser(userId) {

   return handleRequest(()=>adminApi.rejectUser(userId))
}
export async function getAllProducts() {
  return handleRequest(() => adminApi.getProducts());
}
export async function getAdminStat() {
  return handleRequest(() => adminApi.getAdminInfo());
}
export async function deleteProduct(productId) {
 
 return handleRequest(()=>adminApi.deleteProduct(productId))
}
export async function getSingleProduct(productId) {
 
  return handleRequest(()=>adminApi.getSingleProduct(productId))
}
export async function getCategories() {
 
  return handleRequest(()=>adminApi.getCategories())
}
export async function addCategory(data) {
 
  return handleRequest(()=>adminApi.addCategory(data))
}

export async function addSubCategory(data, categoryId) {
 
  return handleRequest(()=>adminApi.addSubCategory(data, categoryId))
}

export async function getUsersByRole(type) {
 
  return handleRequest(()=>adminApi.getUsersByRole(type))
}
export async function deleteUser(userId) {
 
  return handleRequest(()=>adminApi.deleteUser(userId))
}
export async function getOrders() {

  return handleRequest(()=>adminApi.getOrders())
}
export async function getTransporters() {
 
  return handleRequest(()=>adminApi.getTransporters())
}
export async function assignTransporter(data) {

   return handleRequest(()=>adminApi.assignTransporter(data))
}
export async function editCategory(data, categoryId) {
 
   return handleRequest(()=> adminApi.editCategory(data, categoryId))
}
