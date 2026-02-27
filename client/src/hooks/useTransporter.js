import { changeStatus, getOrders } from "@/services/transporterServices";
import { useState } from "react";

export function useTransporter() {
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      return data.orders;
    } finally {
      setLoading(false);
    }
  };
  const updateStatus = async (data) => {
    setLoading(true);
    try {
      const res = await changeStatus(data);
      return res;
    } finally {
      setLoading(false);
    }
  };
  return { fetchOrders, updateStatus };
}
