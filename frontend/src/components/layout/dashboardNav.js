import {
  BarChart3,
  Bell,
  Box,
  ClipboardList,
  Gauge,
  HeartHandshake,
  LayoutDashboard,
  Package,
  Recycle,
  Star,
  Store,
  Users,
  Wrench,
} from "lucide-react";

export const dashboardNavigation = {
  customer: [
    { label: "Overview", href: "/customer/dashboard", icon: LayoutDashboard },
    { label: "My Products", href: "/customer/products", icon: Package },
    { label: "Repairs", href: "/customer/repairs", icon: Wrench },
    { label: "Marketplace", href: "/customer/listings", icon: Store },
    { label: "Donations", href: "/customer/donations", icon: HeartHandshake },
    { label: "Recycling", href: "/customer/recycling", icon: Recycle },
    { label: "Notifications", href: "/customer/notifications", icon: Bell },
    { label: "Analytics", href: "/customer/analytics", icon: BarChart3 },
  ],

  repair_partner: [
    { label: "Overview", href: "/partner/dashboard", icon: LayoutDashboard },
    { label: "Requests", href: "/partner/requests", icon: ClipboardList },
    { label: "Repair Jobs", href: "/partner/jobs", icon: Wrench },
    { label: "Availability", href: "/partner/availability", icon: Gauge },
    { label: "Reviews", href: "/partner/reviews", icon: Star },
  ],

  admin: [
    { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Providers", href: "/admin/providers", icon: Wrench },
    { label: "Products", href: "/admin/products", icon: Box },
    { label: "Repairs", href: "/admin/repairs", icon: ClipboardList },
    { label: "Marketplace", href: "/admin/marketplace", icon: Store },
    { label: "Donations", href: "/admin/donations", icon: HeartHandshake },
    { label: "Recycling", href: "/admin/recycling", icon: Recycle },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  ],
};

// The 4 most important shortcuts per role, shown directly in the
// mobile bottom bar. Everything else lives behind "More".
export const mobilePrimaryHrefs = {
  customer: [
    "/customer/dashboard",
    "/customer/products",
    "/customer/repairs",
    "/customer/listings",
  ],
  repair_partner: [
    "/partner/dashboard",
    "/partner/requests",
    "/partner/jobs",
    "/partner/reviews",
  ],
  admin: [
    "/admin/dashboard",
    "/admin/users",
    "/admin/repairs",
    "/admin/marketplace",
  ],
};

export const settingsHref = {
  customer: "/customer/settings",
  repair_partner: "/partner/profile",
  admin: "/admin/settings",
};
