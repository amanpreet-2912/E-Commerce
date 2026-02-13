import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    images: {
      type: [String],
      defult: [],
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    subcategory: {
      type: String,
      required: true,
      index: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    soldCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);
const Product = mongoose.model("product", productSchema);
export { Product };
