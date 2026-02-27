import { SectionCards } from "@/components/blocks/section-cards";
import { SellerTable } from "@/components/blocks/Seller-Table";
import { useSeller } from "@/hooks/useSeller";
import { ChartLine, Clock, Package, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export default function SellerDashboard() {
  const { fetchStats } = useSeller();
  const [stats, setStats] = useState(null);
  useEffect(() => {
    (async () => {
      const data = await fetchStats();
      setStats(data);
    })();
  }, []);
  
  const sellerCards = [
    {
      title: "Total Products",
      value: stats?.totalProducts,
      description: "Products you have listed",
      icon:Package,
      link:"/seller/products"
    },
    {
      title: "Total Orders",
      value:  stats?.totalOrders,
      description: "Orders recieved",
      icon:ShoppingCart,
      link:"/seller/orders"
    },
    {
      title: "Total Revenue",
      value: "₹" + stats?.totalSales,
      description: "Total earnings",
      icon:ChartLine,
      link:"/seller/orders"
    },
    {
      title: "Pending Orders",
      value: stats?.pendingOrders,
      description: "Awaiting fulfillment",
      icon:Clock,
      link:"/seller/orders"
    },
  ];
  return (
    <div className="min-h-screen bg-linear-to-br p-6 space-y-8">
      <SectionCards cards={sellerCards} />

      <SellerTable />
    </div>
  );
}
