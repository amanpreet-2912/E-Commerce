import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useSeller } from "@/hooks/useSeller";
import { Button } from "@/components/ui/button";

export default function SellerProductView() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { viewProduct, loading } = useSeller();
  const [product, setProduct] = useState(null);

  useEffect(() => {
  

    (async () => {
      const data = await viewProduct(productId);
      
      setProduct(data);
    })();
  }, [productId]);
 
  const handleEdit = () => {
    navigate(`/seller/product/${productId}/edit`);
  };
  if (loading) {
    return <div className="p-6">Loading product details...</div>;
  }

  if (!product) {
    return <div className="p-6 text-destructive">Product not found</div>;
  }
  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-primary">{product.name}</h1>
        <div className="flex gap-3">
          <Badge
            className="text-primary bg-indigo-50 h-9 w-20 border-primary"
            variant={product.stock > 0 ? "secondary" : "destructive"}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </Badge>

          <Button
            variant="outline"
            className={"hover:text-background"}
            onClick={() => handleEdit()}
          >
            Edit Product
          </Button>
        </div>
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
        <h2 className="font-semibold text-lg mb-2 text-primary">Description</h2>
        <p className="text-muted-foreground">{product.description}</p>
      </section>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
