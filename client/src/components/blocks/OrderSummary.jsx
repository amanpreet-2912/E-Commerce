import { Button } from "@/components/ui/button";

export default function OrderSummary({ totalAmount, onCheckout }) {
  return (
    <div className="border bg-background rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>₹ {totalAmount}</span>
      </div>

      <div className="flex justify-between mb-6 font-bold text-lg">
        <span>Total</span>
        <span>₹ {totalAmount}</span>
      </div>

    <Button
  onClick={onCheckout}
  className="w-full text-lg py-3 text-background rounded-xl bg-accent hover:bg-accent-foreground  transition"
>
  Checkout
</Button>
    </div>
  );
}   