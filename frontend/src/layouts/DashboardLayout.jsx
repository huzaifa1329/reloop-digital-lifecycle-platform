import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/layout/DashboardSidebar";
import DashboardHeader from "../components/layout/DashboardHeader";
import MobileNavigation from "../components/layout/MobileNavigation";

function DashboardLayout({ role = "customer" }) {
  return (
    <div className="min-h-screen bg-reloop-ivory text-reloop-espresso">
      <div className="flex min-h-screen">
        <DashboardSidebar role={role} />

        <div className="min-w-0 flex-1">
          <DashboardHeader />

          <main className="pb-24 lg:pb-8">
            <Outlet />
          </main>
        </div>
      </div>

      <MobileNavigation />
    </div>
  );
}

export default DashboardLayout;