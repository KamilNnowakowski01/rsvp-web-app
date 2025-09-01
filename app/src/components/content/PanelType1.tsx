import { Outlet, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { LayoutDashboard, Users, Settings } from "lucide-react";

// Przykładowe dane dla wydarzeń
const eventData = [
  {
    id: 1,
    header: "Koncert Letni",
    type: "Koncert",
    status: "Active",
    target: "500",
    limit: "1000",
    reviewer: "Jan Kowalski",
  },
  {
    id: 2,
    header: "Festiwal Technologiczny",
    type: "Festiwal",
    status: "In Progress",
    target: "1200",
    limit: "2000",
    reviewer: "Anna Nowak",
  },
  {
    id: 3,
    header: "Warsztaty Kulinarne",
    type: "Warsztaty",
    status: "Not Started",
    target: "150",
    limit: "500",
    reviewer: "Piotr Wiśniewski",
  },
];

export default function PanelType1() {
  return (
    <SidebarProvider>
      <AppSidebar>
        <div className="flex flex-col gap-2 p-4">
          <NavLink
            to="/admin/events"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${isActive ? "bg-muted text-primary" : "text-muted-foreground hover:bg-muted"}`
            }
          >
            <LayoutDashboard className="h-5 w-5" />
            Wydarzenia
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${isActive ? "bg-muted text-primary" : "text-muted-foreground hover:bg-muted"}`
            }
          >
            <Users className="h-5 w-5" />
            Użytkownicy
          </NavLink>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${isActive ? "bg-muted text-primary" : "text-muted-foreground hover:bg-muted"}`
            }
          >
            <Settings className="h-5 w-5" />
            Ustawienia
          </NavLink>
        </div>
      </AppSidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-6" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <NavLink to="/admin">Panel Administratora</NavLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Zarządzanie</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <Button variant="default">Dodaj wydarzenie</Button>
          </div>
        </header>
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}