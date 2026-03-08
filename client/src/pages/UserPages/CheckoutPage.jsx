import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
export default function Checkout() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { fetchSingleProduct, addresses, fetchAddresses, BuyNow } = useUser();

  const [product, setProduct] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    async function loadData() {
      await fetchAddresses();
      const productData = await fetchSingleProduct(productId);
      setProduct(productData);
    }

    loadData();
  }, [productId]);

  async function handlePlaceOrder() {
    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }

    const order = await BuyNow({
      productId,
      quantity: 1,
      address: selectedAddress,
    });

    if (order) {
      toast.success("Order placed successfully");
      navigate("/user/orders");
    }
  }

  if (!product) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="w-full px-8 py-10 grid lg:grid-cols-2 gap-12">
      <div className="w-full">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-md hover:bg-muted transition text-primary"
          >
            <ArrowLeft size={20} />
          </button>

          <h2 className="text-3xl font-bold text-primary">Delivery Address</h2>
        </div>

        <div className="grid gap-4">
          {addresses.map((addr, index) => (
            <div
              key={index}
              onClick={() => setSelectedAddress(addr)}
              className={`p-5 rounded-xl border cursor-pointer transition
        ${
          selectedAddress === addr
            ? "border-primary bg-primary/5 shadow-md"
            : "hover:border-gray-400 hover:shadow-sm"
        }`}
            >
              <p className="font-semibold text-lg">{addr.fullname}</p>
              <p className="text-muted-foreground">{addr.addressLine}</p>
              <p className="text-muted-foreground">
                {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <p className="text-muted-foreground">{addr.phone}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <div className="border rounded-2xl p-8 shadow-md sticky top-10">
          <h2 className="text-3xl font-bold mb-6 text-primary">Order Summary</h2>

          <div className="flex gap-5 items-center">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${product.images[0]}`}
              className="h-28 w-28 object-contain border rounded-lg p-2"
            />

            <div>
              <p className="font-semibold text-lg">{product.name}</p>
              <p className="text-muted-foreground mt-1">₹ {product.price}</p>
            </div>
          </div>

          <hr className="my-6" />

          <div className="flex justify-between text-xl font-semibold">
            <span>Total</span>
            <span>₹ {product.price}</span>
          </div>

          <Button
            onClick={handlePlaceOrder}
            className="w-full mt-8 h-12 text-lg text-background bg-accent hover:bg-accent-foreground"
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}
