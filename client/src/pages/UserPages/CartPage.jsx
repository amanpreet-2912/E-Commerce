import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";
import CartItems from "@/components/blocks/CartItems";
import Address from "@/components/blocks/AddressSection";
import OrderSummary from "@/components/blocks/OrderSummary";
import { useNavigate } from "react-router";

export default function UserCart() {
  const {
    cart,
    fetchCart,
    updateCart,
    placeOrder,
    fetchAddresses,
    addresses,
    createAddress,
    remove,
  } = useUser();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, []);

  if (!cart || cart.cartItems.length === 0) {
    return <p className="text-center py-20">Your cart is empty</p>;
  }
  let totalAmount=0;
  cart.cartItems.forEach(
    (item) => (totalAmount += item.product.price * item.quantity),
  );

  const handleCheckout = async () => {
   

    try {
      await placeOrder(selectedAddress);
      toast.success("Order placed successfully");
      navigate("/user/orders");
    } catch (err) {
      toast.error("Something Went Wrong");
    }
  };
  const handleRemove = async (productId) => {
    await remove(productId);
    toast.success("Item removed from cart")
  };
  return (
    <div className="px-4 lg:px-8 py-10">
      <div className="grid lg:grid-cols-2 gap-10">
        <CartItems cart={cart} updateCart={updateCart} handleRemove={handleRemove} />

        <div className="lg:w-125 space-y-6">
          <Address
            Section
            addresses={addresses}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            createAddress={createAddress}
            fetchAddresses={fetchAddresses}
          />

          <OrderSummary totalAmount={totalAmount} onCheckout={handleCheckout} />
        </div>
      </div>
    </div>
  );
}
