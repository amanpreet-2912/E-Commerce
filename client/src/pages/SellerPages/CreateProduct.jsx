import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { productSchema } from "@/zodSchema/product";
import { Button } from "@/components/ui/button";
import { useSeller } from "@/hooks/useSeller";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import { MoveLeft } from "lucide-react";

export default function CreateProductPage() {
  const { loading, createNewProduct, getcategories } = useSeller();
  const navigate = useNavigate();
  const [previewImages, setPreviewImages] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  useEffect(() => {
    (async () => {
      const data = await getcategories();
      setCategories(data);
    })();
  }, []);
  const selectedCat = categories.find((category) => {
    return category._id === selectedCategory;
  });
  const subcategories = selectedCat ? selectedCat.subcategories : [];

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      categoryId: "",
      subcategoryId: "",
      images: [],
    },
  });
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
  async function onSubmit(data) {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("categoryId", selectedCategory);
      formData.append("subcategoryId", selectedSubcategory);
      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file) => {
          formData.append("images", file);
        });
      }

      await createNewProduct(formData);
      navigate("/seller/dashboard");
    } catch (err) {
      console.log(err);
    }
  }
  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    setValue("images", files);

    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setPreviewImages(previews);
  }

  return (
    <div className="max-w-3xl w-full mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-lg transition-all duration-300">
  <div className="flex items-center gap-3 mb-6">
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => navigate("/seller/dashboard")}
      className="hover:bg-gray-100 transition"
    >
      <MoveLeft className="w-5 h-5" />
    </Button>
    <h1 className="text-2xl sm:text-3xl font-semibold">Create New Product</h1>
  </div>

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    {/* Product Images */}
    <Field>
      <FieldLabel>Product Images</FieldLabel>
      <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition">
        <UploadCloud className="w-8 h-8 text-gray-400" />
        <p className="text-sm text-gray-500">
          Click or drag to upload product images
        </p>
        <Input type="file" multiple className="hidden" onChange={handleImageChange} />
      </label>

      {previewImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {previewImages.map((img, idx) => (
            <div key={idx} className="relative rounded-lg overflow-hidden border hover:shadow-md transition">
              <img src={img.url} alt="preview" className="h-28 w-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </Field>

    {/* Product Name & Description */}
    <Field>
      <FieldLabel>Product Name</FieldLabel>
      <Input {...register("name")} placeholder="Enter product name" className="hover:border-gray-400 focus:border-blue-400" />
      {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
    </Field>

    <Field>
      <FieldLabel>Description</FieldLabel>
      <Input {...register("description")} placeholder="Product description" className="hover:border-gray-400 focus:border-blue-400" />
    </Field>

    {/* Price & Stock */}
    <div className="grid grid-cols-2 gap-4">
      <Field>
        <FieldLabel>Price</FieldLabel>
        <Input type="number" {...register("price", { valueAsNumber: true })} className="hover:border-gray-400 focus:border-blue-400" />
      </Field>
      <Field>
        <FieldLabel>Stock</FieldLabel>
        <Input type="number" {...register("stock", { valueAsNumber: true })} className="hover:border-gray-400 focus:border-blue-400" />
      </Field>
    </div>

    {/* Categories */}
    <div className="grid grid-cols-2 gap-4">
      <select
        className="border rounded-lg p-3 hover:border-gray-400 focus:border-blue-400 transition"
        value={selectedCategory}
        onChange={(e) => { setSelectedCategory(e.target.value); setSelectedSubcategory(""); }}
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>

      <select
        className="border rounded-lg p-3 hover:border-gray-400 focus:border-blue-400 transition disabled:opacity-50"
        value={selectedSubcategory}
        onChange={(e) => setSelectedSubcategory(e.target.value)}
        disabled={!selectedCategory}
      >
        <option value="">Select Subcategory</option>
        {subcategories.map((sub) => (
          <option key={sub._id} value={sub._id}>{sub.name}</option>
        ))}
      </select>
    </div>

    {/* Submit */}
    <Button
      type="submit"
      disabled={loading || isSubmitting}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
    >
      {loading || isSubmitting ? "Creating..." : "Create Product"}
    </Button>
  </form>
</div>
  );
}
