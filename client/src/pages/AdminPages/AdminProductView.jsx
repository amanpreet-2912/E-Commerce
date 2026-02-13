import { useParams } from "react-router";
import { useAdmin } from "@/hooks/useAdmin";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function AdminProductView() {
  const { productId } = useParams();
  const { viewProduct, loading } = useAdmin();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!productId) return;

    (async () => {
      const data = await viewProduct(productId);
      setProduct(data);
    })();
  }, [productId]);
  console.log(product);
  if (loading) {
    return <div className="p-6">Loading product details...</div>;
  }

  if (!product) {
    return <div className="p-6 text-destructive">Product not found</div>;
  }

  return (
    <div className="p-6 space-y-8">
    
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-indigo-700">
          {product.name}
        </h1>
        <Badge variant={product.stock > 0 ? "success" : "destructive"}>
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </Badge>
      </div>

      <div className="flex gap-4 flex-wrap">
        {product.images?.length ? (
          product.images.map((img, index) => (
            <img
              key={index}
              src={`${import.meta.env.VITE_BACKEND_URL}${img}`}
              alt={product.name}
              className="h-40 w-40 rounded-lg border object-cover"
            />
          ))
        ) : (
          <div className="h-40 w-40 flex items-center justify-center border rounded text-muted-foreground">
            No Images
          </div>
        )}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoItem label="Price" value={`₹${product.price}`} />
        <InfoItem label="Stock" value={product.stock} />
        <InfoItem label="Category" value={product.category} />
        <InfoItem label="Subcategory" value={product.subcategory} />
        <InfoItem label="Sold Count" value={product.soldCount} />
        <InfoItem
          label="Created At"
          value={new Date(product.createdAt).toLocaleString()}
        />
        {/* <InfoItem
          label="Last Updated"
          value={new Date(product.updatedAt).toLocaleString()}
        /> */}
      </section>

      <section>
        <h2 className="font-semibold text-lg mb-2 text-primary">
          Description
        </h2>
        <p className="text-muted-foreground">{product.description}</p>
      </section>
      <section className="border rounded-lg p-4 bg-muted/30">
        <h2 className="font-semibold text-lg mb-3 text-primary">
          Seller Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <InfoItem label="Name" value={product.seller?.name} />
          <InfoItem label="Email" value={product.seller?.email} />
          <InfoItem label="Role" value={product.seller?.role} />
          <InfoItem
            label="Seller Since"
            value={new Date(product.seller?.createdAt).toLocaleDateString()}
          />
        </div>
      </section>
    </div>
  );
}


function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value }</p>
    </div>
  );
}
