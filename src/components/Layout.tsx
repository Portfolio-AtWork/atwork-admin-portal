import { Outlet } from "react-router-dom"

import { AppSidebar } from "@/components/AppSidebar"
import Header from "@/components/Header"
import { SidebarProvider } from "@/components/ui/sidebar"


const Layout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Layout