import { Cart } from "../models/cartSchema.js";
import { Product } from "../models/productSchema.js";
import { Order } from "../models/orderSchema.js";
import { User } from "../models/userSchema.js";

export async function addToCart(req, res) {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        cartItems: [{ product: productId, quantity }],
      });
    } else {
      const item = cart.cartItems.find(
        (i) => i.product.toString() === productId,
      );
      if (item) {
        item.quantity += quantity;
      } else {
        cart.cartItems.push({ product: productId, quantity });
      }
      await cart.save();
    }
    const updatedCart = await Cart.findOne({ user: req.user.id }).populate(
      "cartItems.product",
    );
    res.status(200).json({ cart: updatedCart });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding Product to cart" });
  }
}
export async function getCart(req, res) {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate(
      "cartItems.product",
    );
    res.status(200).json({ cart });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetchinh cart" });
  }
}
export async function removeFromCart(req, res) {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: userId });
    cart.cartItems = cart.cartItems.filter(
      (item) => item.product.toString() !== productId,
    );
    await cart.save();
    const updatedCart = await Cart.findOne({ user: req.user.id }).populate(
      "cartItems.product",
    );

    res.status(200).json({ cart: updatedCart });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error removing product from cart" });
  }
}
export async function getAllProducts(req, res) {
  try {
    const { categoryId, subcategoryId } = req.query;

    const filter = {};
    if (categoryId) filter.categoryId = categoryId;
    if (subcategoryId) filter.subcategoryId = subcategoryId;
    const products = await Product.find(filter)
      .populate("seller", "name")
      .populate("categoryId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: products.length,
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching products" });
  }
}
export async function updateCartQuantity(req, res) {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const item = cart.cartItems.find(
      (item) => item.product.toString() === productId,
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    if (quantity <= 0) {
      cart.cartItems = cart.cartItems.filter(
        (item) => item.product.toString() !== productId,
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user.id }).populate(
      "cartItems.product",
    );

    res.status(200).json({ cart: updatedCart });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update cart" });
  }
}
export async function getAllCategories(req, res) {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error getting categories" });
  }
}
export async function getSingleProduct(req, res) {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId)
      .populate("seller")
      .populate("categoryId");

    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json({ product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fethcing product" });
  }
}

export async function createOrder(req, res) {
  try {
    console.log(req.body);
    const { addressId, newAddress } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    let address;
    if (addressId) {
      address = user.addresses.id(addressId);
    } else if (newAddress) {
      user.addresses.push(newAddress);
      await user.save();
      address = newAddress;
    } else {
      const defaultAddress = user.addresses.find((a) => a.default);
      if (!defaultAddress) {
        return res.status(400).json({ message: "No Address Available" });
      }
      address = defaultAddress;
    }
    const cart = await Cart.findOne({ user: userId }).populate(
      "cartItems.product",
    );
    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }
    const orderItems = cart.cartItems.map((item) => {
      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      };
    });
    let totalAmount = 0;
    orderItems.forEach((item) => {
      totalAmount += item.quantity * item.price;
    });

    const order = await Order.create({
      user: userId,
      orderItems,
      totalAmount,
      address,
    });
    cart.cartItems = [];
    await cart.save();
    res.status(200).json({ message: "Order Placed", order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error createing order" });
  }
}
export async function getOrders(req, res) {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).populate(
      "orderItems.product",
    );
    console.log(orders);

    res.status(200).json({ orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting orders" });
  }
}
export async function addAddress(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const newAddress = req.body;
    if (user.addresses.length === 0) {
      newAddress.default = true;
    }
    user.addresses.push(newAddress);
    await user.save();
    res.status(200).json({
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding address" });
  }
}
export async function getAddresses(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    res.status(200).json({ addresses: user.addresses });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting addresses" });
  }
}
export async function setDefaultAddress(req, res) {
  try {
    const { addressId } = req.params;
    const userId = req.user.id;
    const user = await User.findById(userId);
    user.addresses.forEach((add) => {
      add.default = add._id.toString() === addressId;
    });
    await user.save();
    res
      .status(200)
      .json({ message: "Default address updated", addresses: user.addresses });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error setting address as default" });
  }
}
export async function buyNow(req, res) {
  try {
    const { productId, quantity, address } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const order = await Order.create({
      user: req.user.id,
      orderItems: [{ product: product._id, quantity, price: product.price }],
      totalAmount: product.price * quantity,
      address,
    });
    res.status(201).json({ order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error buying product" });
  }
}
