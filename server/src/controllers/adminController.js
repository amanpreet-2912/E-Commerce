import { User } from "../models/userSchema.js";
import { Product } from "../models/productSchema.js";
import { Category } from "../models/categorySchema.js";
export async function getUsers(req, res) {
  try {
    const users = await User.find({
      role: { $in: ["seller", "transporter"] },
    }).select("name email role createdAt");
    res.json(users);
  } catch (err) {
    console.log("error geeting users", err);
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
    console.log(req.params);
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
      .sort({ createdAt: -1 });
    console.log(products);
    res.json({
      count: products.length,
      products,
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
    res.status(200).json({
      totalUsers,
      pendingRequests,
      totalProducts,
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
    const product = await Product.findById(productId).populate(
      "seller",
      "name email role createdAt",
    );
    if (!product) {
      return res.json({ message: "product not found" });
    }
    return res.json({ product });
  } catch (err) {
    console.log(err);
    res.json({ message: "error getting product" });
  }
}
export async function addCategory(req, res) {
  try {
    const { name } = req.body;
    const exists = await Category.findOne({ name });
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
    console.log(categoryId);
    const { name } = req.body;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: "NO such catgeory exists" });
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
    res.json(400).json({ message: "error adding subcategory" });
  }
}
export async function getAllCategories(req, res) {
  try {
    const categories = await Category.find();
    console.log(categories)
    res.status(200).json({ categories });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "error getting categories" });
  }
}
  