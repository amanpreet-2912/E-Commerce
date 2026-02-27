import { useState } from "react";
import {
  getAllUsers,
  getPendingUsers,
  approveUser,
  rejectUser,
  getAllProducts,
  getAdminStat,
  getSingleProduct,
  deleteProduct,
  getCategories,
  addCategory,
} from "@/services/adminServices";
export function useAdmin() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [data, setData] = useState({
    totalUsers: 0,
    pendingRequests: 0,
    totalProducts: 0,
  });
  const [categories, setCategories] = useState([]);

  const allUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };
  const pendingUsers = async () => {
    setLoading(true);
    try {
      const data = await getPendingUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };
  const approve = async (userId) => {
    setLoading(true);
    try {
      await approveUser(userId);
      setUsers((prevUser) => {
        const newUsers = prevUser.filter((user) => {
          return user._id !== userId;
        });
        return newUsers;
      });
    } finally {
      setLoading(false);
    }
  };
  const reject = async (userId) => {
    setLoading(true);
    try {
      await rejectUser(userId);
      setUsers((prevUser) => {
        const newUsers = prevUser.filter((user) => {
          return user._id !== userId;
        });
        return newUsers;
      });
    } finally {
      setLoading(false);
    }
  };
  const allProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data.products);
    } finally {
      setLoading(false);
    }
  };
  const adminInfo = async () => {
    setLoading(true);
    try {
      const data = await getAdminStat();
      setData(data);
    } finally {
      setLoading(false);
    }
  };
  const viewProduct = async (productId) => {
    setLoading(true);
    try {
      const data = await getSingleProduct(productId);
      return data.product;
    } finally {
      setLoading(false);
    }
  };
  const deleteSellerProduct = async (productId) => {
    setLoading(true);
    try {
      const data = await deleteProduct(productId);
      setProducts((prev) => {
        const newProducts = prev.filter((product) => {
          return product._id !== productId;
        });
        return newProducts;
      });
    } finally {
      setLoading(false);
    }
  };
  const allCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data.categories);
      
    } finally {
      setLoading(false);
    }
  };
  const addNewCategory = async (data) => {
    setLoading(true);
    try {
      const data = await addCategory(data);
      return data;
    } finally {
      setLoading(false);
    }
  };
  return {
    deleteSellerProduct,
    viewProduct,
    loading,
    reject,
    approve,
    pendingUsers,
    users,
    allUsers,
    products,
    allProducts,
    adminInfo,
    data,
    categories,
    addNewCategory,
    allCategories,
  };
}
