import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LayoutGrid, LogOut, Settings, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  dashboardNavigation,
  mobilePrimaryHrefs,
  settingsHref,
} from "./dashboardNav";

function MobileNavigation() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const role = user?.role ?? "customer";
  const allItems = dashboardNavigation[role] ?? dashboardNavigation.customer;
  const primaryHrefs = mobilePrimaryHrefs[role] ?? [];

  const primaryItems = primaryHrefs
    .map((href) => allItems.find((item) => item.href === href))
    .filter(Boolean);

  const isMoreActive = !primaryHrefs.includes(location.pathname);

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-reloop-espresso/10 bg-reloop-ivory/95 px-2 py-2 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-md items-center justify-around">
          {primaryItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `flex min-w-14 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-medium transition-colors ${
                    isActive
                      ? "text-reloop-orange"
                      : "text-reloop-espresso/60 hover:text-reloop-orange"
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className={`flex min-w-14 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-medium transition-colors ${
              isMoreActive
                ? "text-reloop-orange"
                : "text-reloop-espresso/60 hover:text-reloop-orange"
            }`}
          >
            <LayoutGrid size={18} />
            More
          </button>
        </div>
      </nav>

      {/* Full navigation drawer — everything the desktop sidebar has */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-reloop-espresso/40 backdrop-blur-sm"
          />

          <div className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-3xl bg-reloop-ivory p-5 pb-8">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-lg font-bold text-reloop-espresso">
                Menu
              </p>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setDrawerOpen(false)}
                className="rounded-full p-2 text-reloop-espresso/50 hover:bg-reloop-neutral"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {allItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={({ isActive }) =>
                      `flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 text-center text-xs font-medium transition-colors ${
                        isActive
                          ? "border-reloop-orange/30 bg-reloop-orange/10 text-reloop-orange"
                          : "border-reloop-espresso/10 text-reloop-espresso/70 hover:bg-reloop-neutral"
                      }`
                    }
                  >
                    <Icon size={20} />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>

            <div className="mt-4 space-y-1 border-t border-reloop-espresso/10 pt-4">
              <NavLink
                to={settingsHref[role] ?? "/customer/settings"}
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-reloop-espresso/70 hover:bg-reloop-neutral"
              >
                <Settings size={18} />
                Settings
              </NavLink>

              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  logout();
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-reloop-espresso/70 hover:bg-reloop-neutral"
              >
                <LogOut size={18} />
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileNavigation;
