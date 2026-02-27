import { useSeller } from "@/hooks/useSeller";
import { useEffect, useState } from "react";

export default function SellerOrders() {
  const { fetchSellerOrders } = useSeller();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchSellerOrders();
      setOrders(data);
    })();
  }, []);

  return (
    <div className="bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Your Orders</h1>

      <div className="space-y-6">
        {orders.length === 0 && <p className="text-gray-500">No orders yet</p>}

        {orders.map((order) => {
          let total = 0;

          order.items.forEach((item) => {
            total += item.total;
          });

          return (
            <div
              key={order._id}
              className="bg-background rounded-2xl shadow p-6 space-y-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-accent-foreground">
                    Order ID: {order._id.slice(-6)}
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-primary">
                  {order.status}
                </span>
              </div>

              <div className=" pt-4 space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>
                      {item.product} × {item.quantity}
                    </span>

                    <span>₹ {item.total}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 text-right font-semibold">
                Total: ₹ {total}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
