import { useState } from "react";
import {
  getProducts,
  createProduct,
  deleteProduct,
  viewMyProduct,
  updateProduct,
  getCategories,
  getSellerDashboard,
  getSellerOrders,
} from "@/services/sellerServices";
export function useSeller() {
  const [loading, setLoading] = useState();
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(null);
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
    setLoading(true);

    try {
      await updateProduct(productId, data);
    } finally {
      setLoading(false);
    }
  };
  const getcategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      return data.categories;
    } finally {
      setLoading(false);
    }
  };
  const fetchStats = async () => {
    setLoading(true);
    try {
      const data = await getSellerDashboard();
      return data;
    } finally {
      setLoading(false);
    }
  };
  const fetchSellerOrders = async () => {
    setLoading(true);
    try {
      const data = await getSellerOrders();
      console.log(data)
      return data.orders;
    
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
    updateMyProduct,
    getcategories,
    fetchStats,
    stats,
    fetchSellerOrders,
  };
}
