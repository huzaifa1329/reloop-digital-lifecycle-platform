import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const navigationLinks = [
  {
    label: "How It Works",
    path: "/how-it-works",
  },
  {
    label: "Marketplace",
    path: "/marketplace",
  },
  {
    label: "Repair Network",
    path: "/repair-partners",
  },
];

function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-reloop-espresso/10 bg-reloop-ivory/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* =========================================
            LOGO
        ========================================== */}

        <Link
          to="/"
          onClick={closeMobileMenu}
          className="group flex items-center gap-2"
          aria-label="ReLoop home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-reloop-orange font-display text-lg font-bold text-white transition-transform duration-300 group-hover:scale-105">
            R
          </span>

          <span className="font-display text-xl font-bold tracking-tight text-reloop-espresso">
            ReLoop
          </span>
        </Link>

        {/* =========================================
            DESKTOP NAVIGATION
        ========================================== */}

        <nav className="hidden items-center gap-8 md:flex">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-reloop-orange"
                    : "text-reloop-espresso/70 hover:text-reloop-orange"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* =========================================
            DESKTOP ACTIONS
        ========================================== */}

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-full px-4 py-2 text-sm font-semibold text-reloop-espresso transition-colors hover:bg-reloop-neutral"
          >
            Log in
          </Link>

          <Link
            to="/register"
            className="flex items-center gap-2 rounded-full bg-reloop-espresso px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Get Started
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* =========================================
            MOBILE MENU BUTTON
        ========================================== */}

        <button
          type="button"
          onClick={() => setMobileMenuOpen((previous) => !previous)}
          className="rounded-full p-2 text-reloop-espresso transition-colors hover:bg-reloop-neutral md:hidden"
          aria-label={
            mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* =========================================
          MOBILE NAVIGATION
      ========================================== */}

      <div
        className={`overflow-hidden border-t border-reloop-espresso/10 bg-reloop-ivory transition-all duration-300 md:hidden ${
          mobileMenuOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 border-t-transparent opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-[1440px] flex-col px-4 py-5 sm:px-6">
          {/* Navigation links */}
          <div className="flex flex-col">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-reloop-neutral text-reloop-orange"
                      : "text-reloop-espresso/70 hover:bg-reloop-neutral hover:text-reloop-orange"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile divider */}
          <div className="my-4 h-px bg-reloop-espresso/10" />

          {/* Mobile actions */}
          <div className="flex flex-col gap-2">
            <Link
              to="/login"
              onClick={closeMobileMenu}
              className="rounded-full px-4 py-3 text-center text-sm font-semibold text-reloop-espresso transition-colors hover:bg-reloop-neutral"
            >
              Log in
            </Link>

            <Link
              to="/register"
              onClick={closeMobileMenu}
              className="flex items-center justify-center gap-2 rounded-full bg-reloop-espresso px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Get Started
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default PublicNavbar;