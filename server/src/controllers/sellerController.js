import { Product } from "../models/productSchema.js";
import { Category } from "../models/categorySchema.js";

export async function createProduct(req, res) {
  try {
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
    console.log("new object you made", newObj);
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
    const subcategory=product.categoryId.subcategories.id(product.subcategoryId);
    const newObj={ ...product.toObject(),
      category:product.categoryId.name,
      subcategory:subcategory.name
     }
     
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
