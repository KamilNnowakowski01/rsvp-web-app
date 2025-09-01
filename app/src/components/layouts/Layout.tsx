import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { layoutNavItems, type NavItem } from "@/components/layouts/layoutNavItems";
import { userAuthService } from "@/class/UserAuthService";

export default function Layout() {
  const currentUser = userAuthService.getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    userAuthService.logout();
    navigate("/login"); // Navigate without full reload
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary text-primary-foreground p-4">
        <nav className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">My App</h1>
          <div className="space-x-4">
            {layoutNavItems.map((item: NavItem) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `button-variant-ghost ${isActive ? "bg-primary-foreground/20" : ""
                  }`
                }
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </NavLink>
            ))}
            {currentUser && (
              <Button variant="ghost" onClick={handleLogout} aria-label="Logout">
                Logout ({currentUser.username})
              </Button>
            )}
          </div>
        </nav>
      </header>
      <main className="container mx-auto flex-1 p-4">
        <Outlet />
      </main>
      <footer className="bg-secondary text-secondary-foreground p-4 text-center">
        <p>© 2025 My App. All rights reserved.</p>
      </footer>
    </div>
  );
}