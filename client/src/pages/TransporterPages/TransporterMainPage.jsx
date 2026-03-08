import { useTransporter } from "@/hooks/useTransporter";
import { useEffect, useState } from "react";

import { Card, CardHeader, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";

import { ChevronDown, ChevronUp } from "lucide-react";

export default function TransporterPage() {
  const [orders, setOrders] = useState([]);
  const [openId, setOpenId] = useState(null);

  const { fetchOrders, updateStatus } = useTransporter();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await fetchOrders();
    setOrders(data);
  };

  const handleChange = async (id, value) => {
    await updateStatus({
      orderId: id,
      status: value,
    });

    setOrders((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, status: value } : order
      )
    );
  };

  const toggleAddress = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const getStatusColor = (status) => {
    if (status === "Delivered")
      return "bg-green-100 text-green-700 border-green-200";

    if (status === "Out for Delivery")
      return "bg-blue-100 text-blue-700 border-blue-200";

    if (status === "Assigned")
      return "bg-yellow-100 text-yellow-700 border-yellow-200";

    return "bg-purple-100 text-purple-700 border-purple-200";
  };

  return (
    <div className="w-full px-6 lg:px-12 py-8 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        Assigned Orders
      </h1>

      <div className="space-y-6 max-w-3xl">

        {orders.map((order) => {
          let total = 0;

          order.orderItems.forEach((item) => {
            total += item.price * item.quantity;
          });

          return (
            <Card
              key={order._id}
              className="rounded-xl shadow-sm hover:shadow-md transition"
            >
              <CardHeader className="flex flex-row justify-between items-center">

                <div className="flex flex-col">
                  <p className="font-semibold">
                    Order #{order._id.slice(-6)}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Customer: {order.user?.name}
                  </p>
                </div>

                <Badge
                  className={`text-xs px-3 py-1 border ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </Badge>

              </CardHeader>

              <CardContent className="space-y-4">

                <div className="space-y-2">

                  <p className="text-sm font-medium">
                    Products
                  </p>

                  {order.orderItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center text-sm bg-muted/40 rounded-md px-3 py-2"
                    >
                      <span>
                        {item.product?.name} × {item.quantity}
                      </span>

                      <span className="font-medium">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}

                  <div className="flex justify-between font-semibold border-t pt-3 text-primary">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>

                </div>

                <div>

                  <div
                    onClick={() => toggleAddress(order._id)}
                    className="flex justify-between items-center cursor-pointer text-sm font-medium"
                  >
                    <span>Delivery Address</span>

                    {openId === order._id ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </div>

                  {openId === order._id && (
                    <div className="bg-muted/40 p-3 rounded-lg text-sm mt-2 space-y-1">
                      <p className="font-medium">
                        {order.address?.fullname}
                      </p>

                      <p>{order.address?.phone}</p>

                      <p>{order.address?.addressLine}</p>

                      <p>
                        {order.address?.city}, {order.address?.state} -{" "}
                        {order.address?.pincode}
                      </p>
                    </div>
                  )}

                </div>

                <div>

                  <p className="text-sm font-medium mb-1">
                    Update Status
                  </p>

                  <Select
                    value={order.status}
                    onValueChange={(value) =>
                      handleChange(order._id, value)
                    }
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Assigned">
                        Assigned
                      </SelectItem>

                      <SelectItem value="Out for Delivery">
                        Out for Delivery
                      </SelectItem>

                      <SelectItem value="Delivered">
                        Delivered
                      </SelectItem>
                    </SelectContent>
                  </Select>

                </div>

              </CardContent>
            </Card>
          );
        })}

      </div>
    </div>
  );
}