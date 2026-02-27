catimport mongoose from "mongoose";
const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { _id: true },
);

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    subcategories: [subcategorySchema],
   
  },
  
  { timestamps: true },
);
const Category = mongoose.model("Category", categorySchema);
export { Category };
