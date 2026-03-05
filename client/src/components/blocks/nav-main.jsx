import * as React from "react";
import { useLocation, Link } from "react-router";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
  const location = useLocation();

  return (
    <SidebarMenu>
      {items.map((item) => {
        const isParentActive =
          item.url && location.pathname.startsWith(item.url);

        const isChildActive = item.children?.some((child) =>
          location.pathname.startsWith(child.url),
        );

        const isActive = isParentActive || isChildActive;

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className="
            
              data-[active=true]:bg-primary
              data-[active=true]:text-white
               hover:bg-sidebar-accent
            "
            >
              <Link to={item.url || "#"}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>

            {item.children && (
              <SidebarMenuSub>
                {item.children.map((child) => {
                  const isChild = location.pathname.startsWith(child.url);

                  return (
                    <SidebarMenuSubItem key={child.title}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={isChild}
                        className="
                        data-[active=true]:bg-amber-100
                      "
                      >
                        <Link to={child.url}>{child.title}</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  );
                })}
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
