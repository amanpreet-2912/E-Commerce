import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Checkout() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { fetchSingleProduct, addresses, fetchAddresses,BuyNow } = useUser();

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
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">

    
      <div>
        <h2 className="text-2xl font-bold mb-4">Select Delivery Address</h2>

        {addresses.map((addr, index) => (
          <div
            key={index}
            className={`border p-4 rounded mb-3 cursor-pointer ${
              selectedAddress === addr ? "border-primary bg-primary/5 shadow-sm" : "hover:border-gray-400"
            }`}
            onClick={() => setSelectedAddress(addr)}
          >
            <p className="font-semibold">{addr.fullname}</p>
            <p>{addr.addressLine}</p>
            <p>
              {addr.city}, {addr.state} - {addr.pincode}
            </p>
            <p>{addr.phone}</p>
          </div>
        ))}
      </div>

      <div className="border rounded-xl p-6 shadow">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

        <div className="flex gap-4">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${product.images[0]}`}
            className="h-24 object-contain"
          />

          <div>
            <p className="font-semibold">{product.name}</p>
            <p className="text-sm text-muted-foreground">
              ₹ {product.price}
            </p>
          </div>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹ {product.price}</span>
        </div>

        <Button
          onClick={handlePlaceOrder}
          className="w-full mt-6 text-lg text-background"
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}