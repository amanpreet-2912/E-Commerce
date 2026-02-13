import { AdminTable } from "@/components/blocks/Admin-Table";
import { SectionCards } from "@/components/blocks/section-cards";
import { useAdmin } from "@/hooks/useAdmin";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { loading, data, adminInfo } = useAdmin();

  useEffect(() => {
    adminInfo();
  }, []);

  const adminCards = [
    {
      title: "Total Users",
      value: data.totalUsers,
      footerText: "User base growing",
      description: "Includes sellers & transporters",
    },
    {
      title: "Total Products",
      value: data.totalProducts,
      footerText: "Slight drop in inventory",
      description: "Products listed by sellers",
    },
    {
      title: "Total Orders",
      value: "...",
      footerText: "Orders increasing",
      description: "Last 30 days",
    },
    {
      title: "Pending requests",
      value: data.pendingRequests,
      footerText: "Awaiting approval",
      description: "Sellers & transporters",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br  p-6 space-y-8">
      <SectionCards cards={adminCards} />

        <AdminTable />
    </div>
  );
}
