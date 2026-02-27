import { transporterApi } from "@/api/transporterApi";
export async function getOrders() {
  try {
    const response = await transporterApi.getOrders();
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}
export async function changeStatus(data) {
  try {
    const response = await transporterApi.changeStatus(data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}
