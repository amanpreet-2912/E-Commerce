import { useAdmin } from "@/hooks/useAdmin";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [transporters, setTransporters] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedTransporter, setSelectedTransporter] = useState("");
  const [open, setOpen] = useState(false);

  const { fetchOrders, fetchTransporters, assign } = useAdmin();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await fetchOrders();
    const users = await fetchTransporters();
    setTransporters(users);
    setOrders(data);
  };

  const handleAssign = async () => {
    console.log(selectedOrder);
    console.log(selectedTransporter);
    const data = {
      orderId: selectedOrder._id,
      transporterId: selectedTransporter,
    };
    await assign(data);

    setOrders((prev) =>
      prev.map((order) =>
        order._id === selectedOrder._id
          ? { ...order, transporter: selectedTransporter, status: "Assigned" }
          : order,
      ),
    );

    setOpen(false);
    setSelectedTransporter("");
    setSelectedOrder(null);
  };

  const getStatusColor = (status) => {
    if (status === "Delivered") return "bg-green-100 text-green-700";
    if (status === "Cancelled") return "bg-red-100 text-red-700";
    if (status === "Out for Delivery") return "bg-blue-100 text-blue-700";
    if (status === "Assigned") return "bg-purple-100 text-purple-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-xl font-semibold mb-4 text-primary">All Orders</h1>

      <div className="space-y-3">
        {orders.map((order) => {
          let total = 0;
          order.orderItems.forEach((item) => {
            total += item.price * item.quantity;
          });

          return (
            <div
              key={order._id}
              className="bg-background border rounded-lg text-sm"
            >
              <div className="flex justify-between items-center px-3 py-2 border-b">
                <div className="flex gap-3 items-center flex-wrap">
                  <span className="font-medium">#{order._id.slice(-6)}</span>

                  <span className="text-gray-500">{order.user?.name}</span>
                </div>

                <div className="flex items-center gap-2 flex-wrap justify-end">
                  <span className="font-medium">₹{total}</span>

                  <span
                    className={`text-xs px-2 py-0.5 rounded ${getStatusColor(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>

                  <Button
                    size="sm"
                    disabled={!!order.transporter}
                    onClick={() => {
                      setSelectedOrder(order);
                      setOpen(true);
                    }}
                    className="text-background h-7 px-2 text-xs"
                  >
                    {order.transporter ? "Assigned" : "Assign"}
                  </Button>
                </div>
              </div>

              <div className="px-3 py-2 space-y-1">
                {order.orderItems.map((item) => (
                  <div key={item._id} className="flex justify-between text-xs">
                    <span>
                      {item.product?.name} × {item.quantity}
                    </span>

                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="px-3 pb-2 text-xs text-gray-400">
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Transporter</DialogTitle>
          </DialogHeader>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {transporters.map((t) => (
              <div
                key={t._id}
                onClick={() => setSelectedTransporter(t._id)}
                className={`border rounded-md p-3 cursor-pointer transition
                  ${
                    selectedTransporter === t._id
                      ? "border-primary bg-primary/10"
                      : "hover:bg-muted"
                  }`}
              >
                <p className="font-medium text-sm">{t.name}</p>

                <p className="text-xs text-muted-foreground">{t.email}</p>
              </div>
            ))}
          </div>

          <DialogFooter className="pt-4">
            <Button
              onClick={handleAssign}
              disabled={!selectedTransporter}
              className="w-full text-background"
            >
              Assign Transporter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
