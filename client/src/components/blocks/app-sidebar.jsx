import * as React from "react";
import { IconInnerShadowTop } from "@tabler/icons-react";
import { NavMain } from "@/components/blocks/nav-main";
import { NavUser } from "@/components/blocks/nav-user";

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

export function AppSidebar({ sidebarData, ...props }) {
  const { user } = useAuthStore();
 
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className=" data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <IconInnerShadowTop className="size-5" />
                <span className="text-base font-semibold">E-commerce.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
