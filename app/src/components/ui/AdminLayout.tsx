import { Outlet } from "react-router-dom";
import { Menu, Calendar, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: "Wydarzenia", icon: Calendar, path: "/admin/events" },
    { name: "Użytkownicy", icon: Users, path: "/admin/users" },
    { name: "Ustawienia", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar dla dużych ekranów */}
      <aside className="hidden md:flex w-64 bg-white shadow-md flex-col">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Panel Administratora</h1>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.path}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Sidebar mobilny */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-50">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-4">
          <div className="border-b pb-4">
            <h1 className="text-xl font-bold">Panel Administratora</h1>
          </div>
          <nav className="mt-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Główna zawartość */}
      <div className="flex-1 flex flex-col">
        {/* Nagłówek */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Zarządzanie Wydarzeniami</h2>
          <div className="flex items-center gap-2">
            <Button variant="default">Dodaj wydarzenie</Button>
          </div>
        </header>

        {/* Główna sekcja */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;