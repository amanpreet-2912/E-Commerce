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
        order._id === id ? { ...order, status: value } : order,
      ),
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
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-lg font-semibold mb-4"> Assigned Orders</h1>

      <div className="space-y-4 max-w-lg">
        {orders.map((order) => {
          let total = 0;

          order.orderItems.forEach((item) => {
            total += item.price * item.quantity;
          });

          return (
            <Card
              key={order._id}
              className="
              border
              rounded-xl
              shadow-sm
              hover:shadow-md
              transition
              "
            >
              <CardHeader className="flex flex-row justify-between items-center py-3 px-4">
                <div>
                  <p className="font-semibold text-sm">
                    Order #{order._id.slice(-6)}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {order.user?.name}
                  </p>
                </div>

                <Badge
                  className={`
                  text-[10px]
                  px-2 py-1
                  border
                  ${getStatusColor(order.status)}
                  `}
                >
                  {order.status}
                </Badge>
              </CardHeader>

              <CardContent className="px-4 pb-4 pt-0 space-y-3">
                <div>
                  <p className="text-xs font-medium mb-1">Products</p>

                  {order.orderItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between text-xs"
                    >
                      <span>
                        {item.product?.name} × {item.quantity}
                      </span>

                      <span className="font-medium">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}

                  <div className="flex justify-between font-semibold border-t pt-2 mt-2 text-primary">
                    <span>Total</span>

                    <span>₹{total}</span>
                  </div>
                </div>

                <div>
                  <div
                    onClick={() => toggleAddress(order._id)}
                    className="
                    flex justify-between items-center
                    cursor-pointer
                    text-xs
                    font-medium
                    select-none
                    "
                  >
                    <span>Delivery Address</span>

                    {openId === order._id ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </div>

                  {openId === order._id && (
                    <div
                      className="
                      bg-muted/50
                      p-3
                      rounded-lg
                      text-xs
                      mt-2
                      space-y-1
                      animate-in fade-in
                      "
                    >
                      <p>{order.address?.fullname}</p>

                      <p>{order.address?.phone}</p>

                      <p>{order.address?.addressLine}</p>

                      <p>
                        {order.address?.city}, {order.address?.state} -{" "}
                        {order.address?.pincode}
                      </p>
                    </div>
                  )}
                </div>

                <Select
                  value={order.status}
                  onValueChange={(value) => handleChange(order._id, value)}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Assigned">Assigned</SelectItem>

                    <SelectItem value="Out for Delivery">
                      Out for Delivery
                    </SelectItem>

                    <SelectItem value="Delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
