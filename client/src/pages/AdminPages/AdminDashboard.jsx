import { AdminTable } from "@/components/blocks/Admin-Table";
import { SectionCards } from "@/components/blocks/section-cards";
import { useAdmin } from "@/hooks/useAdmin";
import { useEffect, useState } from "react";
import { Users, Package, ShoppingCart, Clock } from "lucide-react";

export default function AdminDashboard() {
  const { adminInfo, pendingUsers } = useAdmin();
  const [stats, setStats] = useState({});
  useEffect(() => {
    adminInfo();
    pendingUsers();
    (async () => {
      const data = await adminInfo();
      setStats(data);

      await pendingUsers();
    })();
  }, []);
  const adminCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      footerText: "User base growing",
      description: "Includes sellers & transporters",
      icon: Users,
      link: "/admin/users/user",
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      footerText: "Manage inventory",
      description: "Products listed by sellers",
      icon: Package,
      link: "/admin/products",
         

    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      footerText: "View all orders",
      description: "Last 30 days",
      icon: ShoppingCart,
      link: "/admin/orders",

    },
    {
      title: "Pending Requests",
      value: stats.pendingRequests,
      footerText: "Requires approval",
      description: "Sellers & transporters",
      icon: Clock,
      link: "/admin/requests",

    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br  p-6 space-y-8">
      <SectionCards cards={adminCards} />

      <AdminTable />
    </div>
  );
}
