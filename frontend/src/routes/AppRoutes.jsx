import { Routes, Route } from "react-router-dom";
import HowItWorks from "../pages/HowItWorks";
import Marketplace from "../pages/Marketplace";
import MarketplaceListing from "../pages/MarketplaceListing";
import RepairPartners from "../pages/RepairPartners";
import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import PagePlaceholder from "../components/common/PagePlaceholder";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

import Home from "../pages/Home";
import PublicPassport from "../pages/PublicPassport";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

// Customer
import CustomerDashboard from "../pages/customer/Dashboard";
import Products from "../pages/customer/Products";
import ProductNew from "../pages/customer/ProductNew";
import ProductEdit from "../pages/customer/ProductEdit";
import ProductPassport from "../pages/customer/ProductPassport";
import ProductTimeline from "../pages/customer/ProductTimeline";
import Repairs from "../pages/customer/Repairs";
import RepairNew from "../pages/customer/RepairNew";
import RepairDetail from "../pages/customer/RepairDetail";
import Notifications from "../pages/customer/Notifications";
import CustomerAnalytics from "../pages/customer/Analytics";
import CustomerSettings from "../pages/customer/Settings";
import CustomerProfile from "../pages/customer/Profile";
import CustomerDonations from "../pages/customer/Donations";
import CustomerRecycling from "../pages/customer/Recycling";
import CustomerListings from "../pages/customer/Listings";
import CreateListing from "../pages/customer/CreateListing";

// Provider
import ProviderDashboard from "../pages/provider/Dashboard";
import ProviderRequests from "../pages/provider/Requests";
import ProviderRequestDetail from "../pages/provider/RequestDetail";
import ProviderJobs from "../pages/provider/Jobs";
import ProviderJobDetail from "../pages/provider/JobDetail";
import ProviderAvailability from "../pages/provider/Availability";
import ProviderReviews from "../pages/provider/Reviews";
import ProviderProfile from "../pages/provider/Profile";

// Admin
import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminProviders from "../pages/admin/Providers";
import AdminProducts from "../pages/admin/Products";
import AdminRepairs from "../pages/admin/Repairs";
import AdminMarketplace from "../pages/admin/Marketplace";
import AdminAnalytics from "../pages/admin/Analytics";
import AdminDonations from "../pages/admin/Donations";
import AdminRecycling from "../pages/admin/Recycling";
import AdminSettings from "../pages/admin/Settings";
import AdminReviews from "../pages/admin/Reviews";
import AdminComplaints from "../pages/admin/Complaints";
import SharedNotifications from "../pages/customer/Notifications";

function AppRoutes() {
  return (
    <Routes>
      {/* =====================================================
          PUBLIC ROUTES
      ===================================================== */}

      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/marketplace" element={<Marketplace />} />

        <Route path="/marketplace/:listingId" element={<MarketplaceListing />} />

        <Route path="/repair-partners" element={<RepairPartners />} />
        <Route path="/passport/:id" element={<PublicPassport />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* =====================================================
          PROTECTED APPLICATION
      ===================================================== */}

      <Route element={<ProtectedRoute />}>
        {/* ===================================================
            CUSTOMER
        =================================================== */}

        
        <Route element={<RoleRoute allowedRoles={["customer"]} />}>
          <Route element={<DashboardLayout role="customer" />}>
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />

            <Route path="/customer/products" element={<Products />} />
            <Route path="/customer/products/new" element={<ProductNew />} />
            <Route
              path="/customer/products/:productId"
              element={<ProductPassport />}
            />
            <Route
              path="/customer/products/:productId/edit"
              element={<ProductEdit />}
            />
            <Route
              path="/customer/products/:productId/timeline"
              element={<ProductTimeline />}
            />

            <Route path="/customer/repairs" element={<Repairs />} />
            <Route path="/customer/repairs/new" element={<RepairNew />} />
            <Route
              path="/customer/repairs/:repairId"
              element={<RepairDetail />}
            />

            <Route path="/customer/listings" element={<CustomerListings />} />
            <Route path="/customer/listings/new" element={<CreateListing />} />
            <Route path="/customer/donations" element={<CustomerDonations />} />
            <Route path="/customer/recycling" element={<CustomerRecycling />} />

            <Route
              path="/customer/notifications"
              element={<Notifications />}
            />

            <Route path="/customer/analytics" element={<CustomerAnalytics />} />
            <Route path="/customer/profile" element={<CustomerProfile />} />
            <Route path="/customer/settings" element={<CustomerSettings />} />
          </Route>
        </Route>

        {/* ===================================================
            REPAIR PARTNER
        =================================================== */}

        <Route element={<RoleRoute allowedRoles={["repair_partner"]} />}>
          <Route element={<DashboardLayout role="repair_partner" />}>
            <Route path="/partner/dashboard" element={<ProviderDashboard />} />
            <Route path="/partner/requests" element={<ProviderRequests />} />
            <Route
              path="/partner/requests/:requestId"
              element={<ProviderRequestDetail />}
            />
            <Route path="/partner/jobs" element={<ProviderJobs />} />
            <Route
              path="/partner/jobs/:jobId"
              element={<ProviderJobDetail />}
            />

            <Route path="/partner/availability" element={<ProviderAvailability />} />
            <Route path="/partner/reviews" element={<ProviderReviews />} />
            <Route path="/partner/notifications" element={<SharedNotifications />} />
            <Route path="/partner/profile" element={<ProviderProfile />} />
          </Route>
        </Route>

        {/* ===================================================
            ADMIN
        =================================================== */}

        <Route element={<RoleRoute allowedRoles={["admin"]} />}>
          <Route element={<DashboardLayout role="admin" />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/providers" element={<AdminProviders />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/repairs" element={<AdminRepairs />} />
            <Route path="/admin/marketplace" element={<AdminMarketplace />} />

            <Route path="/admin/donations" element={<AdminDonations />} />
            <Route path="/admin/recycling" element={<AdminRecycling />} />
            <Route path="/admin/reviews" element={<AdminReviews />} />
            <Route path="/admin/complaints" element={<AdminComplaints />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/notifications" element={<SharedNotifications />} />
          </Route>
        </Route>
      </Route>

      {/* =====================================================
          UNAUTHORIZED / 404
      ===================================================== */}

      <Route
        path="/unauthorized"
        element={
          <PagePlaceholder
            title="Unauthorized"
            description="You don't have permission to access this page."
          />
        }
      />

      <Route
        path="*"
        element={
          <PagePlaceholder
            title="404"
            description="The page you're looking for doesn't exist."
          />
        }
      />
    </Routes>
  );
}

export default AppRoutes;
