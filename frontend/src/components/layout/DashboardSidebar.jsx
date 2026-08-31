import { NavLink } from "react-router-dom";
import { LogOut, Settings } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { dashboardNavigation, settingsHref } from "./dashboardNav";

function DashboardSidebar({ role = "customer" }) {
  const items = dashboardNavigation[role] ?? dashboardNavigation.customer;
  const { logout } = useAuth();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-reloop-espresso/10 bg-reloop-ivory lg:flex lg:flex-col">
      <div className="flex h-20 items-center gap-2 border-b border-reloop-espresso/10 px-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-reloop-orange font-display font-bold text-white">
          R
        </span>
        <span className="font-display text-xl font-bold text-reloop-espresso">
          ReLoop
        </span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-reloop-orange/10 text-reloop-orange"
                    : "text-reloop-espresso/65 hover:bg-reloop-neutral hover:text-reloop-espresso"
                }`
              }
            >
              <Icon size={18} strokeWidth={1.8} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-reloop-espresso/10 p-4">
        <NavLink
          to={settingsHref[role] ?? "/customer/settings"}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-reloop-espresso/65 hover:bg-reloop-neutral"
        >
          <Settings size={18} />
          Settings
        </NavLink>

        <button
          type="button"
          onClick={logout}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-reloop-espresso/65 hover:bg-reloop-neutral"
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
