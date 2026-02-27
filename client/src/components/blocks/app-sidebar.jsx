import * as React from "react";
import { IconInnerShadowTop } from "@tabler/icons-react";
import { NavMain } from "@/components/blocks/nav-main";
import { NavUser } from "@/components/blocks/nav-user";
import Logo from "@/assets/logo.png"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useAuthStore } from "@/store/authStore";
import { Link } from "react-router";

export function AppSidebar({ sidebarData, ...props }) {
  const { user } = useAuthStore();

  return (
    <Sidebar
      collapsible="offcanvas"
      className="
      bg-linear-to-b
      from-blue-50
      via-white
      to-amber-50
      border-r
      "
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/admin/dashboard"
                className="
                flex items-center gap-2
                hover:bg-blue-100
                rounded-lg
                transition
                "
              >
                {/* <IconInnerShadowTop className="size-6 text-blue-600" />
                 */}
                 <img src={Logo} alt="" className="h-8" />
                <span
                  className="
                  text-lg  font-bold
                  text-primary
                  "
                >
               MernMart
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>


      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
      </SidebarContent>


      <SidebarFooter
        className="
        border-t
        border-blue-200
        "
      >
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
