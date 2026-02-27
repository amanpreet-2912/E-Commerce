import CartItemCard from "./CartItemCard";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function CartItems({ cart, updateCart, handleRemove }) {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl text-primary font-bold ">My Cart</h1>
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
