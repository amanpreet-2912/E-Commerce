import { sellerApi } from "@/api/sellerApi";

export async function getProducts() {
  try {
    const response = await sellerApi.getProducts();
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message || "error getting products");
  }
}

export async function createProduct(data) {
  try {
    const response = await sellerApi.createProducts(data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(
      err.response?.data?.message || "error creating a new product",
    );
  }
}
export async function deleteProduct(productId) {
  try {
    const response = await sellerApi.deleteProducts(productId);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(
      err.response?.data?.message || "error deleting the product",
    );
  }
}
export async function viewMyProduct(productId) {
  try {
    const response = await sellerApi.viewProduct(productId);

    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message);
  }
}
export async function updateProduct(productId,data) {
  try {
    const response = await sellerApi.updateProduct(productId,data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message);
  }
}
