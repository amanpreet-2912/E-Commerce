import { User } from "../models/userSchema.js";
import { Product } from "../models/productSchema.js";
export async function getAllProducts(req, res) {
  try {
    const products = await Product.find().populate("seller","name");
    console.log(products);
    res.json(products)
  } catch (err) {
    console.log(err)
    return res.status(500).json({message:"error fetching products"})
  }
}
