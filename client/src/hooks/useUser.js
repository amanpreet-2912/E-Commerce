import {
  addAddress,
  addToCart,
  buyNow,
  createOrder,
  getAddresses,
  getCategories,
  getOrders,
  getProducts,
  getSingleProduct,
  removeFromCart,
  setDefaultAddress,
  updateCartQuantity,
} from "@/services/userServices";
import { getCart } from "@/services/userServices";
import { useState } from "react";

export function useUser() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const fetchCart = async () => {
    setLoading(true);
    try {
      const data = await getCart();
      setCart(data.cart);
    } finally {
      setLoading(false);
    }
  };
  const remove = async (productId) => {
    setLoading(true);
    try {
      const data = await removeFromCart(productId);
      setCart(data.cart);
    } finally {
      setLoading(false);
    }
  };
  const fetchProducts = async (filters = {}) => {
    setLoading(true);
    try {
      const data = await getProducts(filters);

      setProducts(data.products);
    } finally {
      setLoading(false);
    }
  };
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      return data.categories;
    } finally {
      setLoading(false);
    }
  };
  const fetchSingleProduct = async (productId) => {
    setLoading(true);
    try {
      const data = await getSingleProduct(productId);
      return data.product;
    } finally {
      setLoading(false);
    }
  };
  const addtocart = async (data) => {
    setLoading(true);
    try {
      const res = await addToCart(data);
      return res;
    } finally {
      setLoading(false);
    }
  };
  const updateCart = async (productId, quantity) => {
    setLoading(true);
    try {
      const data = await updateCartQuantity(productId, quantity);
      setCart(data.cart);
      return data.cart;
    } finally {
      setLoading(false);
    }
  };
  const placeOrder = async (addressId) => {
    setLoading(true);
    try {
      const res = await createOrder({ addressId });
      setCart(null);
      return res.order;
    } finally {
      setLoading(false);
    }
  };
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(data.orders);
    } finally {
      setLoading(false);
    }
  };
  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const data = await getAddresses();
      setAddresses(data.addresses);
    } finally {
      setLoading(false);
    }
  };
  const createAddress = async (data) => {
    setLoading(true);
    try {
      const res = await addAddress(data);
      setAddresses(res.addresses);
    } finally {
      setLoading(false);
    }
  };
  const makeDefault = async (addressId) => {
    setLoading(true);
    try {
      const data = await setDefaultAddress(addressId);
      setAddresses(data.addresses);
    } finally {
      setLoading(false);
    }
  };
  const BuyNow = async (data) => {
    setLoading(true);
    try {
      const res=await buyNow(data);
      return res.order;
    } finally {
      setLoading(false);
    }
  };

  return {
    addtocart,
    BuyNow,
    cart,
    fetchProducts,
    products,
    fetchCategories,
    fetchSingleProduct,
    fetchCart,
    updateCart,
    placeOrder,
    fetchOrders,
    orders,
    fetchAddresses,
    addresses,
    createAddress,
    makeDefault,
    createAddress,
    remove,
  };
}
