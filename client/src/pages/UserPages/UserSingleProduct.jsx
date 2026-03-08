import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

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
    <div className="w-full px-6 lg:px-12 py-10">

      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-md hover:bg-muted transition text-primary"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-3xl font-bold text-primary">{product.name}</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-14">

        <div>

          <div className="bg-background border rounded-2xl shadow-sm p-8 flex justify-center">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${selectedImage}`}
              className="h-105 object-contain"
            />
          </div>

          <div className="flex gap-4 mt-6 flex-wrap">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={`${import.meta.env.VITE_BACKEND_URL}${img}`}
                className={`
                  h-20 w-20 object-contain border rounded-lg cursor-pointer p-2 transition
                  ${
                    selectedImage === img
                      ? "border-primary shadow"
                      : "border-gray-200 hover:border-gray-400"
                  }
                `}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

        </div>

        <div className="space-y-6">

          <p className="text-sm text-muted-foreground">
            Category: {product.categoryId?.name}
          </p>

          <p className="text-4xl text-primary font-bold">
            ₹ {product.price}
          </p>

          <p className="text-sm">
            Sold by
            <span className="font-semibold ml-1">
              {product.seller?.name}
            </span>
          </p>

          <p className="text-green-600 font-semibold">
            In Stock
          </p>

          <div className="border rounded-xl p-5 bg-muted/30">
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">

            <Button
              onClick={handleAddToCart}
              className="flex-1 h-12 text-lg text-background"
            >
              Add to Cart
            </Button>

            <Button
              onClick={handleBuy}
              variant="outline"
              className="flex-1 h-12 text-lg bg-accent text-background hover:bg-accent-foreground hover:text-background"
            >
              Buy Now
            </Button>

          </div>

        </div>

      </div>
    </div>
  );
}