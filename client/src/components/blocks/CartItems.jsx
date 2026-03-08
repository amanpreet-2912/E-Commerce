import CartItemCard from "./CartItemCard";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function CartItems({ cart, updateCart, handleRemove }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-md hover:bg-muted transition text-primary"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-2xl text-primary font-bold">
          My Cart
        </h1>
      </div>

      <TooltipProvider>
        {cart.cartItems.map((item) => (
          <CartItemCard
            key={item._id}
            item={item}
            updateCart={updateCart}
            handleRemove={handleRemove}
          />
        ))}
      </TooltipProvider>

    </div>
  );
}