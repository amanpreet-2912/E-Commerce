import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSeller } from "@/hooks/useSeller";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useAdmin } from "@/hooks/useAdmin";

export default function EditProductPage() {
  const { productId } = useParams();
  const { loading, viewProduct, updateMyProduct } = useSeller();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { categories, allCategories } = useAdmin();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  useEffect(() => {
    (async () => {
      const data = await viewProduct(productId);
      reset(data);
      await allCategories();
    })();
  }, [productId]);
  const selectedCat = categories.find((category) => {
    return category._id === selectedCategory;
  });
  const subcategories = selectedCat ? selectedCat.subcategories : [];
  const onSubmit = async (data) => {
    const newData={...data,
      category:selectedCategory,
      subcategory:selectedSubcategory
    }
    console.log(data)
    console.log("new data",newData)
    await updateMyProduct(productId, data);
    navigate(`/seller/products/${productId}`);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6 max-w-3xl">
      <h1 className="text-2xl font-semibold text-primary">Edit Product</h1>

      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input {...register("name")} />
      </Field>

      <Field>
        <FieldLabel>Description</FieldLabel>
        <Input {...register("description")} />
      </Field>

      <Field>
        <FieldLabel>Price</FieldLabel>
        <Input type="number" {...register("price")} />
      </Field>

      <Field>
        <FieldLabel>Stock</FieldLabel>
        <Input type="number" {...register("stock")} />
      </Field>

     
      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          setSelectedSubcategory("");
        }}
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      <select
        value={selectedSubcategory}
        onChange={(e) => setSelectedSubcategory(e.target.value)}
        disabled={!selectedCategory}
      >
        <option value="">Select Subcategory</option>
        {subcategories.map((sub) => (
          <option key={sub._id} value={sub._id}>
            {sub.name}
          </option>
        ))}
      </select>
      <div className="flex gap-3">
        <Button className={"text-background"} type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Product"}
        </Button>

        <Button
          className={"hover:text-background"}
          type="button"
          variant="ghost"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
