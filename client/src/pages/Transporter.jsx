import { AppSidebar } from "@/components/blocks/app-sidebar"
import { IconTrendingUp, IconTrendingDown, IconUsers, IconBox, IconShoppingCart } from "@tabler/icons-react"
import { SectionCards } from "@/components/blocks/section-cards"
import { SiteHeader } from "@/components/blocks/site-header"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  IconChartBar,
  IconDashboard,
 
  IconFolder,
 
  IconListDetails,
 
 
} from "@tabler/icons-react"
export default function TransporterPage() {
 const sidebarData = {
 
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
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
        <SiteHeader name={"Dashboard"} />
         <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* <SectionCards cards={adminCards} /> */}
              <div className="m-5 border rounded-lg">
               {/* <AdminTable/> */}
               </div>
            </div>
          </div>
        </div> 

       
      </SidebarInset>
    </SidebarProvider>
  )
}
