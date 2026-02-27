import { AppSidebar } from "@/components/blocks/app-sidebar";
import { SiteHeader } from "@/components/blocks/site-header";
import { SellerTable } from "@/components/blocks/Seller-Table";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconListDetails,
} from "@tabler/icons-react";

import { Outlet } from "react-router";
export default function SellerLayout() {
  const sidebarData = {
    navMain: [
      {
        title: "Dashboard",
        url: "/seller/dashboard",
        icon: IconDashboard,
      },
      {
        title: "Products",
        url: "/seller/products",
        icon: IconListDetails,
      },
      {
        title: "Orders",
        url: "/seller/orders",
        icon: IconChartBar,
      },
    ],
  };

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar sidebarData={sidebarData} variant="inset" />
      <SidebarInset>
        <SiteHeader name={"Seller Dashboard"} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
