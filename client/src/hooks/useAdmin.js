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
  addSubCategory,
  getUsersByRole,
  deleteUser,
  getOrders,
  getTransporters,
  assignTransporter,
  editCategory,
} from "@/services/adminServices";
export function useAdmin() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

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
      setProducts(data.newObj);
    } finally {
      setLoading(false);
    }
  };
  const adminInfo = async () => {
    setLoading(true);
    try {
      const data = await getAdminStat();
      return data;
    } finally {
      setLoading(false);
    }
  };
  const viewProduct = async (productId) => {
    setLoading(true);
    try {
      const data = await getSingleProduct(productId);

      return data.newProduct;
    } finally {
      setLoading(false);
    }
  };
  const deleteSellerProduct = async (productId) => {
    setLoading(true);
    try {
      await deleteProduct(productId);
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
      const response = await addCategory(data);
      setCategories((prev) => [...prev, response.category]);
    } finally {
      setLoading(false);
    }
  };

  const addSubcategory = async (data, categoryId) => {
    setLoading(true);
    try {
      const res = await addSubCategory(data, categoryId);
      setCategories((prev) =>
        prev.map((cat) => (cat._id === categoryId ? res.category : cat)),
      );
      return res.category;
    } finally {
      setLoading(false);
    }
  };

  const usersByRole = async (type) => {
    setLoading(true);
    try {
      const data = await getUsersByRole(type);
      return data.users;
    } finally {
      setLoading(false);
    }
  };
  const deleteuser = async (userId) => {
    setLoading(true);
    try {
      await deleteUser(userId);
    } finally {
      setLoading(false);
    }
  };
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      return data.orders;
    } finally {
      setLoading(false);
    }
  };
  const fetchTransporters = async () => {
    setLoading(true);
    try {
      const data = await getTransporters();
      return data.transporters;
    } finally {
      setLoading(false);
    }
  };
  const assign = async (data) => {
    setLoading(true);
    try {
      const res = await assignTransporter(data);
      return res;
    } finally {
      setLoading(false);
    }
  };
  const editcategory = async (data, categoryId) => {
    setLoading(true);
    try {
      const res = await editCategory(data, categoryId);
      setCategories((prev) => 
        prev.map((category) =>
          category._id === categoryId ? res.category : category,
        )
      );
      return res;
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
    editcategory,
    categories,
    addNewCategory,
    allCategories,

    addSubcategory,
    usersByRole,
    deleteuser,
    fetchOrders,
    fetchTransporters,
    assign,
  };
}
