import { useSeller } from "@/hooks/useSeller";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function SellerOrders() {
  const { fetchSellerOrders } = useSeller();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await fetchSellerOrders();
      setOrders(data);
    })();
  }, []);

  return (
    <div className="bg-background p-6 min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-muted transition"
        >
          <ArrowLeft className="h-5 w-5 text-primary" />
        </button>

        <div>
          <h1 className="text-3xl font-bold text-primary">Your Orders</h1>
          <p className="text-sm text-muted-foreground">
            View and manage all your received orders
          </p>
        </div>
      </div>

      <div className="space-y-6 max-w-4xl">
        {orders.length === 0 && (
          <div className="text-center py-16 border rounded-xl bg-muted/20">
            <p className="text-muted-foreground">No orders yet</p>
          </div>
        )}

        {orders.map((order) => {
          let total = 0;

          order.items.forEach((item) => {
            total += item.total;
          });

          return (
            <div
              key={order._id}
              className="bg-card border rounded-2xl shadow-sm hover:shadow-md transition p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold text-lg">
                    Order #{order._id.slice(-6)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium
  ${
    order.status.toLowerCase() === "delivered"
      ? "bg-green-100 text-green-600"
      : "bg-blue-100 text-blue-600"
  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="space-y-2 pt-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.product} × {item.quantity}
                    </span>

                    <span className="font-medium">₹ {item.total}</span>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4 flex justify-end">
                <span className="font-semibold text-lg">Total: ₹ {total}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
