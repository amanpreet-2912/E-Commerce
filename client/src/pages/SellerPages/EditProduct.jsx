import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSeller } from "@/hooks/useSeller";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";

export default function EditProductPage() {
  const { productId } = useParams();
  const { loading, viewProduct, updateMyProduct } = useSeller();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    (async () => {
      const data = await viewProduct(productId);
      reset(data);
    })();
  }, [productId]);
  const onSubmit = async (data) => {
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

      <Field>
        <FieldLabel>Category</FieldLabel>
        <Input {...register("category")} />
      </Field>

      <Field>
        <FieldLabel>Subcategory</FieldLabel>
        <Input {...register("subcategory")} />
      </Field>

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
