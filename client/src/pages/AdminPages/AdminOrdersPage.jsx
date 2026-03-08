import { useAdmin } from "@/hooks/useAdmin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter } from "lucide-react"; 

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [transporters, setTransporters] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedTransporter, setSelectedTransporter] = useState("");
  const [open, setOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All"); 

  const { fetchOrders, fetchTransporters, assign } = useAdmin();
  const navigate = useNavigate();

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
    const data = {
      orderId: selectedOrder._id,
      transporterId: selectedTransporter,
    };

    await assign(data);

    setOrders((prev) =>
      prev.map((order) =>
        order._id === selectedOrder._id
          ? { ...order, transporter: selectedTransporter, status: "Assigned" }
          : order
      )
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

  const filteredOrders =
    statusFilter === "All"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full hover:text-background"
          >
            <ArrowLeft size={18} />
          </Button>

          <h1 className="text-2xl font-semibold text-primary">
            Orders Management
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2 py-1 text-sm border rounded-lg outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="All">All</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Assigned">Assigned</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.length === 0 && (
          <p className="text-gray-500 text-sm">No orders found</p>
        )}

        {filteredOrders.map((order) => {
          let total = 0;
          order.orderItems.forEach((item) => {
            total += item.price * item.quantity;
          });

          return (
            <div
              key={order._id}
              className="bg-white border rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center px-4 py-3 border-b">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">
                    Order #{order._id.slice(-6)}
                  </span>
                  <span className="text-xs text-gray-500">{order.user?.name}</span>
                </div>

                <div className="flex items-center gap-3 flex-wrap justify-end">
                  <span className="font-semibold text-sm">₹{total}</span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(
                      order.status
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
                    className="text-background text-xs h-8"
                  >
                    {order.transporter ? "Assigned" : "Assign"}
                  </Button>
                </div>
              </div>

              <div className="px-4 py-3 space-y-2">
                {order.orderItems.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.product?.name} × {item.quantity}
                    </span>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="px-4 pb-3 text-xs text-gray-400">
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Transporter</DialogTitle>
          </DialogHeader>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {transporters.map((t) => (
              <div
                key={t._id}
                onClick={() => setSelectedTransporter(t._id)}
                className={`border rounded-lg p-3 cursor-pointer transition
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