import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function OrdersPage() {
  const { fetchOrders, orders } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-full px-6 lg:px-12 py-10 bg-gray-50 min-h-screen">

      <div className="flex items-center gap-3 mb-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-md hover:bg-muted transition text-primary"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-3xl font-bold text-primary">
          My Orders
        </h1>
      </div>

      {orders.length === 0 && (
        <div className="text-center text-muted-foreground mt-32 text-lg">
          No orders found
        </div>
      )}

      <div className="space-y-8">

        {orders.map((order) => (
          <Card
            key={order._id}
            className="rounded-2xl shadow-sm hover:shadow-md transition bg-white"
          >

            <CardHeader className="space-y-4">

              <div className="flex justify-between items-center flex-wrap gap-4">

                <div className="flex flex-col gap-1">
                  <p className="text-sm text-muted-foreground">
                    Order ID: {order._id.slice(-6)}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                  <p className="text-sm font-medium">
                    {order.orderItems.length} item
                    {order.orderItems.length > 1 && "s"}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="text-2xl font-bold text-primary">
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
                    className="text-xs"
                  >
                    {order.status}
                  </Badge>
                </div>

              </div>

              <div className="text-sm text-muted-foreground ">
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
                  className="flex items-center gap-4 border rounded-xl p-4 hover:bg-muted/30 transition"
                >

                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${item.product?.images?.[0]}`}
                    className="h-16 w-16 object-cover rounded-lg border"
                  />

                  <div className="flex-1">
                    <p className="font-medium">
                      {item.product?.name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Qty: {item?.quantity}
                    </p>
                  </div>

                  <div className="font-semibold">
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