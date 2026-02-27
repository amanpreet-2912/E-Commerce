import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function OrdersPage() {
  const { fetchOrders, orders } = useUser();

  useEffect(() => {
    fetchOrders();
  }, []);
console.log(orders);
  return (
    <div className=" bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8 text-primary">My Orders</h1>

      {orders.length === 0 && (
        <div className="text-center text-muted-foreground mt-20">
          No orders found
        </div>
      )}

      <div className="space-y-8">
        {orders.map((order) => (
          <Card
            key={order._id}
            className="rounded-2xl shadow-sm bg-white"
          >
            <CardHeader>
            
              <div className="flex justify-between items-center">
                
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground"> Order ID: {order._id.slice(-6)} </p>
                  <p className="text-sm text-muted-foreground">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                  <p className="text-sm font-medium">
                    {order.orderItems.length} item
                    {order.orderItems.length > 1 && "s"}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <p className="text-xl font-bold text-primary leading-none">
                    ₹{order.totalAmount}
                  </p>

                  <Badge
                    variant={
                      order.status === "Delivered"
                        ? "success"
                        : order.status === "Cancelled"  
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>

            
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {order.address.fullname}
                </span>
                {" • "}
                {order.address.city}, {order.address.state}
                {" • "}
                {order.address.phone}
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {order?.orderItems?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border rounded-lg p-3"
                >
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${item.product?.images?.[0]}`}
                    className="h-14 w-14 object-cover rounded border"
                  />

                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.product?.name}</p>

                    <p className="text-xs text-muted-foreground">
                      Qty: {item?.quantity}
                    </p>
                  </div>

                  <div className="font-semibold text-sm">
                    ₹{item.product?.price}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
