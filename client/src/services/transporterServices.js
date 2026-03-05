import { transporterApi } from "@/api/transporterApi";
import { handleRequest } from "@/utils/apiHandler";
export async function getOrders() {
  return handleRequest(() => transporterApi.getOrders());
}
export async function changeStatus(data) {
  return handleRequest(() => transporterApi.changeStatus(data));
}
