import { Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router";

export default function CartItemCard({ item, updateCart, handleRemove }) {
  const navigate=useNavigate();
  
  return (
    <div className="flex items-center gap-5 bg-white shadow-sm hover:shadow-md transition rounded-2xl p-5 cursor-pointer">
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}${item.product.images[0]}`}
        className="h-24 w-24 object-contain rounded-lg bg-gray-50 p-2"
        onClick={() => navigate(`/user/product/${item.product._id}`)}
      />

      <div className="flex-1">
        <h2 className="font-semibold">{item.product.name}</h2>
        <p>₹ {item.product.price}</p>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => updateCart(item.product._id, item.quantity - 1)}
            className="px-3 py-1 border rounded-lg hover:bg-gray-100 transition"
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() => updateCart(item.product._id, item.quantity + 1)}
            className="px-3 py-1 border rounded-lg hover:bg-gray-100 transition"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col  items-end justify-between h-full">
        <p className="font-semibold">₹ {item.product.price * item.quantity}</p>

        <Tooltip>
          <TooltipTrigger asChild>
            <Trash2
              size={18}
              className="text-destructive cursor-pointer mt-5 hover:scale-110 transition"
              onClick={() => handleRemove(item.product._id)}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove Item</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
