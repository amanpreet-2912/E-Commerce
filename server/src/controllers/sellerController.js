import { Product } from "../models/productSchema.js";
import { Category } from "../models/categorySchema.js";
import { Order } from "../models/orderSchema.js";

export async function createProduct(req, res) {
  try {
    console.log(req.body);
    const { name, description, price, stock, categoryId, subcategoryId } =
      req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }
    const subExists = category.subcategories.id(subcategoryId);
    if (!subExists) {
      return res.status(404).json({ message: "subcategory not found" });
    }

    let imagePaths = [];
    if (req.files) {
      imagePaths = req.files.map((file) => {
        return `/uploads/${file.filename}`;
      });
    }
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      images: imagePaths,
      categoryId,
      subcategoryId,
      seller: req.user.id,
    });
    res.status(201).json({
      message: "product created",
      product,
    });
  } catch (err) {
    console.log("error creating product", err);
    res.status(500).json({ message: "error creating new product" });
  }
}

export async function getProducts(req, res) {
  try {
    const { category, subcategory } = req.query;
    const filter = { seller: req.user.id };
    if (category) {
      filter.category = category;
    }
    if (subcategory) {
      filter.subcategory = subcategory;
    }
    const products = await Product.find(filter)
      .populate("categoryId")
      .sort({ createdAt: -1 });
    const newObj = products.map((product) => {
      const subcategory = product?.categoryId?.subcategories.id(
        product.subcategoryId,
      );
      return {
        ...product.toObject(),
        category: product?.categoryId?.name,
        subcategory: subcategory?.name,
      };
    });

    res.status(200).json({
      count: newObj.length,
      products: newObj,
    });
  } catch (err) {
    console.log("error getting products", err);
    res.status(500).json({ message: "error in getting propducts" });
  }
}
export async function deleteProduct(req, res) {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.log("error deleting product", err);
    res.status(500).json({ message: "error deleting product" });
  }
}
export async function viewProduct(req, res) {
  try {
    const { productId } = req.params;
    const { id } = req.user;
    const product = await Product.findById(productId).populate("categoryId");

    if (!product) {
      return res.json({ message: "product not found" });
    }
    if (id !== product.seller.toString()) {
      return res.json({ message: "You are not the seller of this product" });
    }
    const subcategory = product.categoryId.subcategories.id(
      product.subcategoryId,
    );
    const newObj = {
      ...product.toObject(),
      category: product.categoryId.name,
      subcategory: subcategory.name,
    };

    res.json(newObj);
  } catch (err) {
    console.log(err);
    res.json({ message: "failed to view product" });
  }
}
export async function updateProduct(req, res) {
  try {
    const { productId } = req.params;
    const product = await Product.findOneAndUpdate(
      { _id: productId, seller: req.user.id },
      req.body,
      { new: true },
    );

    res.json({ message: "product edited" });
  } catch (err) {
    console.log(err);
    res.json({ message: "error editing product" });
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
export async function getSellerDashboard(req, res) {
  try {
    const sellerId = req.user.id;

    const sellerProducts = await Product.find({ seller: sellerId }).select(
      "_id",
    );

    const productIds = sellerProducts.map((p) => p._id);

    const totalProducts = productIds.length;

    const orders = await Order.find({
      "orderItems.product": { $in: productIds },
    });

    let totalOrders = 0;
    let totalSales = 0;
    let pendingOrders = 0;

    orders.forEach((order) => {
      let sellerOrder = false;

      order.orderItems.forEach((item) => {
        if (
          productIds.some((id) => id.toString() === item.product.toString())
        ) {
          sellerOrder = true;

          totalSales += item.price * item.quantity;
        }
      });

      if (sellerOrder) {
        totalOrders++;

        if (order.status==="Placed"||order.status === "Assigned" || order.status === "Out for delievery") {
          pendingOrders++;
        }
      }
    });

    res.json({
      totalProducts,
      totalOrders,
      totalSales,
      pendingOrders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error loading dashboard" });
  }
}
export async function getSellerOrders(req, res) {
  try {
    const sellerId = req.user.id;
    const products = await Product.find({ seller: sellerId });
    const productIds = products.map((p) => p._id.toString());
    // console.log(productIds)
    const orders = await Order.find({
      "orderItems.product": { $in: productIds },
    }).populate("orderItems.product").sort({ createdAt: -1 });
    console.log(orders)
    const result = [];
    for (let order of orders) {
      const sellerItems = [];
      let orderTotal = 0;
      for (let item of order.orderItems) {
        console.log(item)
        if (productIds.includes(item.product._id.toString())) {
          const total = item.price * item.quantity;
          sellerItems.push({
            product: item.product.name,
            quantity: item.quantity,
            price: item.price,
            total: total,
          });
          orderTotal += total;
        }
      }
      
      result.push({
        _id: order._id,
        status: order.status,
        address: order.address,
        createdAt: order.createdAt,
        items: sellerItems,
        orderTotal: orderTotal,
      });
    }
    // console.log(result);
    res.json({ orders: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error fetching orders" });
  }
}
