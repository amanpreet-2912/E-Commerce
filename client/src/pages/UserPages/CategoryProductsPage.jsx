import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";

import ProductGrid from "@/components/blocks/Product-Grid";
import { useParams } from "react-router";

export default function CategoryProductsPage() {
  const { categoryId } = useParams();
  const { products, fetchProducts, loading } = useUser();

  useEffect(() => {
    fetchProducts({ categoryId });
  }, [categoryId]);

  return (
    <div className="max-w-6xl mx-auto px-6 mt-6">
      <h1 className="text-2xl font-bold mb-6">
        Category Products
      </h1>

      <ProductGrid products={products} loading={loading} />
    </div>
  );
}
