import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { productSchema } from "@/zodSchema/product";
import { Button } from "@/components/ui/button";
import { useSeller } from "@/hooks/useSeller";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { MoveLeft } from "lucide-react";

export default function CreateProductPage() {
  const { loading, createNewProduct } = useSeller();
  const navigate = useNavigate();
  const [previewImages, setPreviewImages] = useState([]);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      subcategory: "",
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
      formData.append("category", data.category);
      formData.append("subcategory", data.subcategory);
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
    console.log(e.target.files);
    const files = Array.from(e.target.files);
    setValue("images", files);

    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setPreviewImages(previews);
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => navigate("/seller/dashboard")}
        >
          <MoveLeft className="w-5 h-5" />
        </Button>

        <h1 className="text-2xl font-semibold">Create New Product</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Field>
          <FieldLabel>Product Images</FieldLabel>

          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-muted transition">
            <UploadCloud className="w-8 h-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Click to upload product images
            </p>
            <Input
              type="file"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          {previewImages.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              {previewImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-lg overflow-hidden border"
                >
                  <img
                    src={img.url}
                    alt="preview"
                    className="h-28 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </Field>

        <Field>
          <FieldLabel>Product Name</FieldLabel>
          <Input {...register("name")} placeholder="Enter product name" />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </Field>

        <Field>
          <FieldLabel>Description</FieldLabel>
          <Input
            {...register("description")}
            placeholder="Product description"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel>Price</FieldLabel>
            <Input
              type="number"
              {...register("price", { valueAsNumber: true })}
            />
          </Field>

          <Field>
            <FieldLabel>Stock</FieldLabel>
            <Input
              type="number"
              {...register("stock", { valueAsNumber: true })}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel>Category</FieldLabel>
            <Input {...register("category")} />
          </Field>

          <Field>
            <FieldLabel>Subcategory</FieldLabel>
            <Input {...register("subcategory")} />
          </Field>
        </div>

        <Button
          type="submit"
          disabled={loading || isSubmitting}
          className="w-full text-background "
        >
          {loading || isSubmitting ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </div>
  );
}
