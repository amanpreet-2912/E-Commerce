import { useState } from "react";
import {
  getProducts,
  createProduct,
  deleteProduct,
  viewMyProduct,
  updateProduct,
} from "@/services/sellerServices";
export function useSeller() {
  const [loading, setLoading] = useState();
  const [products, setProducts] = useState([]);
  const getMyProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data.products);
    } finally {
      setLoading(false);
    }
  };
  const createNewProduct = async (data) => {
    setLoading(true);
    try {
      const response = await createProduct(data);
      setProducts((prev) => [response.product, ...prev]);
    } finally {
      setLoading(false);
    }
  };

  const deleteMyProduct = async (productId) => {
    setLoading(true);
    try {
      const data = await deleteProduct(productId);
      setProducts((prev) =>
        prev.filter((product) => product._id !== productId),
      );
    } finally {
      setLoading(false);
    }
  };
  const viewProduct = async (productId) => {
    setLoading(true);
    try {
      const data = await viewMyProduct(productId);
      
      return data;
    } finally {
      setLoading(false);
    }
  };
  const updateMyProduct = async (productId, data) => {
    try {
      await updateProduct(productId, data);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    products,
    deleteMyProduct,
    createNewProduct,
    getMyProducts,
    viewProduct,
    updateMyProduct
  };
}
