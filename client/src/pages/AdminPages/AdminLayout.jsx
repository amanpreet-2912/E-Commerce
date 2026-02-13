import { AppSidebar } from "@/components/blocks/app-sidebar"
import { IconTrendingUp, IconTrendingDown, IconUsers, IconBox, IconShoppingCart } from "@tabler/icons-react"
import { SiteHeader } from "@/components/blocks/site-header"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  IconDashboard,
 

 
  IconListDetails,
 
 
} from "@tabler/icons-react"
import { Outlet } from "react-router"

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
    
  ],
  
}

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }
      }
    >
      <AppSidebar sidebarData={sidebarData} variant="inset"  />
      <SidebarInset>
        <SiteHeader name={"Admin Dashboard"} />
         <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="m-5 border rounded-lg">
                <Outlet/>
               </div>
            </div>
          </div>
        </div> 

       
      </SidebarInset>
    </SidebarProvider>
  )
}
