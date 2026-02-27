import { AppSidebar } from "@/components/blocks/app-sidebar";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconUsers,
  IconBox,
  IconShoppingCart,
} from "@tabler/icons-react";
import { SiteHeader } from "@/components/blocks/site-header";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { IconDashboard, IconListDetails } from "@tabler/icons-react";
import { Outlet } from "react-router";

export default function AdminLayout() {
  const sidebarData = {
    navMain: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: IconDashboard,
      },
      {
        title: "Products",
        url: "/admin/products",
        icon: IconListDetails,
      },
      {
        title: "Categories",
        url: "/admin/categories",
        icon: IconListDetails,
      },
      {
        title: "Orders",
        url: "/admin/orders",
        icon: IconListDetails,
      },
      {
        title: "Users",
           

        icon: IconListDetails,
        children: [
          { title: "Buyers", url: "/admin/users/user" },
          { title: "Sellers", url: "/admin/users/seller" },
          { title: "Transporters", url: "/admin/users/transporter" },
        ],
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
        <SiteHeader name={"Admin Dashboard"} />
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
