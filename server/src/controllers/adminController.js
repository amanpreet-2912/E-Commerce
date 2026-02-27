import { User } from "../models/userSchema.js";
import { Product } from "../models/productSchema.js";
import { Category } from "../models/categorySchema.js";
import { Order } from "../models/orderSchema.js";
import { sendEmail } from "../utils/sendEmail.js";
export async function getUsers(req, res) {
  try {
    const users = await User.find({
      role: { $in: ["seller", "transporter", "user"] },
    }).select("name email role createdAt");
    res.json(users);
  } catch (err) {
    console.log("error getting users", err);
    return res.json({ message: "error in fetching users" });
  }
}
export async function getPendingRequests(req, res) {
  try {
    const users = await User.find({
      role: { $in: ["seller", "transporter"] },
      approvalStatus: "pending",
    }).select("_id name email role createdAt");
    res.json(users);
  } catch (err) {
    console.log("error fetching users", err);
    return res.json({ message: "error fetching users" });
  }
}
export async function approveRequest(req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (user.role !== "seller" && user.role !== "transporter") {
      return res
        .status(400)
        .json({ message: "user does not require approval" });
    }
    user.approvalStatus = "approved";
    await user.save();
    res.json({ message: "user approved" });
  } catch (err) {
    console.log("error approving user", err);
    return res.json({ error: "error approving request" });
  }
}
export async function rejectRequest(req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (user.role !== "seller" && user.role !== "transporter") {
      return res
        .status(400)
        .json({ message: "user does not require rejection" });
    }
    await User.findByIdAndDelete(userId);

    res.json({ message: "user rejected" });
  } catch (err) {
    console.log("failed to reject err", err);
    return res.json({ message: "failed to reject user" });
  }
}
export async function getAllProducts(req, res) {
  try {
    const { seller, category, subcategory } = req.query;
    const filter = {};
    if (seller) filter.seller = seller;
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    const products = await Product.find(filter)
      .populate("seller", "name role email createdAt")
      .populate("categoryId")
      .sort({ createdAt: -1 });
    const newObj = products.map((product) => {
      const subcategory = product.categoryId.subcategories.id(
        product.subcategoryId,
      );
      return {
        ...product.toObject(),
        category: product.categoryId.name,
        subcategory: subcategory.name,
      };
    });

    res.json({
      count: products.length,
      newObj,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "error fetching products" });
  }
}
export async function getAdminInfo(req, res) {
  try {
    const totalUsers = await User.countDocuments();
    const pendingRequests = await User.countDocuments({
      approvalStatus: "pending",
    });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    res.status(200).json({
      totalUsers,
      pendingRequests,
      totalProducts,
      totalOrders,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "error fetching stats" });
  }
}
export async function deleteProduct(req, res) {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.json({ message: "product not found" });
    }
    await product.deleteOne();
    res.status(200).json({ message: "product deleted" });
  } catch (err) {
    console.log(err);
    res.json({ message: "error deleting product" });
  }
}
export async function getSingleProduct(req, res) {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId)
      .populate("seller", "name email role createdAt")
      .populate("categoryId");
    if (!product) {
      return res.json({ message: "product not found" });
    }
    const subcategory = product.categoryId.subcategories.id(
      product.subcategoryId,
    );

    const newProduct = {
      ...product.toObject(),
      category: product.categoryId.name,
      subcategory: subcategory.name,
    };

    return res.json({ newProduct });
  } catch (err) {
    console.log(err);
    res.json({ message: "Error getting product" });
  }
}
export async function addCategory(req, res) {
  try {
    const { name } = req.body;
    const exists = await Category.findOne({ name });
    const categories = await Category.find();
    const duplicates = categories.find((category) => {
      return category.name.toLowerCase() === name.toLowerCase();
    });
    if (duplicates) {
      return res.status(404).json({ message: "Category already exists" });
    }

    if (exists) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const category = await Category.create({ name });
    res.status(200).json({ message: "Category Created", category });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error adding Category" });
  }
}
export async function addSubCategory(req, res) {
  try {
    const { categoryId } = req.params;

    const { name } = req.body;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: "No such catgeory exists" });
    }
    const subcategories = category.subcategories;

    const exists = subcategories.find((sub) => {
      return sub.name.toLowerCase() === name.toLowerCase();
    });
    if (exists) {
      return res.status(400).json({ message: "subcategory already exists" });
    }
    category.subcategories.push({ name });
    await category.save();
    res.status(200).json({ message: "subcategory added", category });
  } catch (err) {
    console.log(err);
    res.json(400).json({ message: "Error adding subcategory" });
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

export async function deleteSubCategory(req, res) {
  try {
    const { categoryId, subcategoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }
    category.subcategories.id(subcategoryId).deleteOne();
    await category.save();
    res.status(200).json({ message: "Subcategory deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting Subcategory" });
  }
}
export async function deleteCategory(req, res) {
  try {
    const { categoryId } = req.params;
    console.log(categoryId);
    await Category.findByIdAndDelete(categoryId);
    res.status(200).json({ message: "Category Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleteing category" });
  }
}
export async function getUsersByRole(req, res) {
  try {
    const { type } = req.params;
    const users = await User.find({
      role: { $in: type },
      approvalStatus: "approved",
    }).select("name email role createdAt");
    res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching users by role" });
  }
}
export async function deleteUser(req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const email = user.email;
    if (user.role === "seller") {
      await Product.deleteMany({ seller: userId });
    }
    await User.findByIdAndDelete(userId);
    console.log(email);
    await sendEmail({
      to: email,
      subject: "Account Removed",
      html: "<h2>Your MernMart Account has been removed by the admin",
    });
    res.status(200).json({ message: "User Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting user" });
  }
}
export async function getOrders(req, res) {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product", "name price");
    res.json({ orders: orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching orders" });
  }
}
export async function assignTransporter(req, res) {
  try {
    const { orderId, transporterId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }
    order.transporter = transporterId;
    order.status = "Assigned";
    await order.save();
    res.json({ message: "Transporter Assigned" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error assigning Transporter" });
  }
}
export async function getTransporters(req, res) {
  try {
    const transporters = await User.find({
      role: "transporter",
      approvalStatus: "approved",
    }).select("name email");
    res.json({ transporters });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error fetching transporters" });
  }
}
export async function editCategory(req, res) {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(categoryId,{name},{new:true});
    category.name = name;
    await category.save();
    res.json({ category });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding category" });
  }
}
