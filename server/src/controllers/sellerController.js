import { Product } from "../models/productSchema.js";

export async function createProduct(req, res) {
  console.log(req.files);
  try {
    const { name, description, price, stock, category, subcategory } = req.body;
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
      category,
      subcategory,
      seller: req.user.id,
    });
    res.status(201).json({ message: "product created", product });
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
    const products = await Product.find(filter).sort({ createdAt: -1 });
    console.log(products);
    res.status(200).json({
      count: products.length,
      products,
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
    const product = await Product.findById(productId);
    if (!product) {
      return res.json({ message: "product not found" });
    }
    if (id !== product.seller.toString()) {
      return res.json({ message: "You are not the seller of this product" });
    }
    console.log(id);
    console.log(product.seller.toString());
    res.json({ product });
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
    console.lof(product);
    res.json({ message: "product edited" });
  } catch (err) {
    console.log(err);
    res.json({ message: "eror editing product" });
  }
}
