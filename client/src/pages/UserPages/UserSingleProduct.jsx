import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";

export default function UserSingleProduct() {
  const { productId } = useParams();
  const { fetchSingleProduct, loading, addtocart } = useUser();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function loadProduct() {
      const data = await fetchSingleProduct(productId);

      setProduct(data);

      setSelectedImage(data.images[0]);
    }

    loadProduct();
  }, [productId]);
  async function handleAddToCart() {
    await addtocart({ productId, quantity: 1 });
    toast.success("Product added to cart");
  }
  function handleBuy() {
    navigate(`/user/checkout/${productId}`);
  }
  if (loading || !product)
    return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="max-w-7xl  p-6">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="bg-background rounded-xl shadow p-6 flex justify-center">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${selectedImage}`}
              className="h-96 object-contain"
            />
          </div>

          <div className="flex gap-4 mt-4">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={`${import.meta.env.VITE_BACKEND_URL}${img}`}
                className={`
                  h-20 w-20 object-contain border rounded cursor-pointer p-2

                  ${
                    selectedImage === img ? "border-primary" : "border-gray-200"
                  }
                `}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-sm text-muted-foreground mt-1">
            {product.categoryId?.name}
          </p>

          <p className="text-2xl text-primary font-bold mt-4">
            ₹ {product.price}
          </p>

          <p className="mt-2 text-sm">
            Sold by:
            <span className="font-semibold"> {product.seller?.name}</span>
          </p>

          <p className="text-green-600 font-medium mt-2">In Stock</p>

          <p className="text-gray-600 mt-4">{product.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button
              onClick={handleAddToCart}
              className="flex-1 text-lg text-background"
            >
              Add to Cart
            </Button>

            <Button
              onClick={handleBuy}
              variant="outline"
              className="flex-1 text-lg text-background bg-accent hover:bg-accent-foreground hover:text-background"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
