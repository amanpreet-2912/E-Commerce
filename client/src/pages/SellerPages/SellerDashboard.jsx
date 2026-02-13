import { SectionCards } from "@/components/blocks/section-cards";
import { SellerTable } from "@/components/blocks/Seller-Table";
 const sellerCards = [
    {
      title: "Total Users",
      value: "...",
      footerText: "User base growing",
      description: "Includes sellers & transporters",
    },
    {
      title: "Total Products",
      value: "...",
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
      value: "...",
      footerText: "Awaiting approval",
      description: "Sellers & transporters",
    },
  ];
export default function SellerDashboard() {
  return (
    <div className="min-h-screen bg-linear-to-br p-6 space-y-8">
      <SectionCards cards={sellerCards} />

      <SellerTable />
    </div>
  );
}
