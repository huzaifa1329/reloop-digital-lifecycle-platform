import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAuth } from "./AuthContext";
import { api } from "../utils/api";

import {
  calculateHealthScore,
  getRecommendation,
} from "../utils/health";

const DataContext = createContext(null);

/*
|--------------------------------------------------------------------------
| Mappers
|--------------------------------------------------------------------------
*/

const mapProduct = (product) => ({
  ...product,
  id: String(product._id || product.id),
  ownerId: String(product.ownerId || ""),
  productId:
    product.productId ||
    `RL-${String(product._id || product.id).slice(-6).toUpperCase()}`,
  imageUrl: product.imageUrl || "",
});

const mapListing = (listing) => ({
  ...listing,
  id: String(listing._id || listing.id),
  sellerId: String(listing.sellerId || ""),
  productId: listing.productId
    ? String(listing.productId)
    : listing.productId,
  imageUrl: listing.imageUrl || "",
  verified: Boolean(listing.verified),
});

const mapRepair = (repair) => ({
  ...repair,
  id: String(repair._id || repair.id),

  customerId: repair.customerId
    ? String(repair.customerId)
    : "",

  productId: repair.productId
    ? String(repair.productId)
    : "",

  assignedPartnerId: repair.assignedPartnerId
    ? String(
        repair.assignedPartnerId._id ||
          repair.assignedPartnerId,
      )
    : null,

  assignedPartner:
    repair.assignedPartnerId &&
    typeof repair.assignedPartnerId === "object"
      ? {
          ...repair.assignedPartnerId,
          id: String(
            repair.assignedPartnerId._id ||
              repair.assignedPartnerId.id,
          ),
        }
      : null,

  createdAt: repair.createdAt
    ? new Date(repair.createdAt).toLocaleDateString()
    : repair.createdAt,
});

const mapNotification = (notification) => ({
  ...notification,
  id: String(notification._id || notification.id),

  userId: String(notification.userId || ""),

  createdAt: notification.createdAt
    ? new Date(notification.createdAt).toLocaleString()
    : notification.createdAt,
});

const mapProvider = (provider) => ({
  ...provider,

  id: String(provider._id || provider.id),

  name: provider.name || "",

  businessName:
    provider.businessName ||
    provider.name ||
    "Repair Partner",

  location: provider.location || "Pakistan",

  categories: Array.isArray(provider.categories)
    ? provider.categories
    : [],

  ratingAverage: Number(provider.ratingAverage || 0),

  reviewCount: Number(provider.reviewCount || 0),

  verificationStatus:
    provider.verificationStatus || "Pending",

  status: provider.status || "Inactive",
});

/*
|--------------------------------------------------------------------------
| Data Provider
|--------------------------------------------------------------------------
*/

export function DataProvider({ children }) {
  const { user, updateUserRecord } = useAuth();

  const [products, setProducts] = useState([]);
  const [marketplaceListings, setMarketplaceListings] =
    useState([]);
  const [repairRequests, setRepairRequests] = useState([]);
  const [repairPartners, setRepairPartners] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState({});
  const [donations, setDonations] = useState([]);
  const [recycling, setRecycling] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Refresh
  |--------------------------------------------------------------------------
  */

  const refresh = useCallback(async () => {
    /*
    |--------------------------------------------------------------------------
    | Public visitor
    |--------------------------------------------------------------------------
    */

    if (!user) {
      try {
        const listings = await api("/listings");

        setMarketplaceListings(
          listings.map(mapListing),
        );
      } catch {
        setMarketplaceListings([]);
      }

      return;
    }

    setLoading(true);

    try {
      /*
      |--------------------------------------------------------------------------
      | Common authenticated data
      |--------------------------------------------------------------------------
      */

      const [productRows, repairRows, notificationRows] =
        await Promise.all([
          api("/products"),
          api("/repairs"),
          api("/notifications"),
        ]);

      const mappedProducts =
        productRows.map(mapProduct);

      setProducts(mappedProducts);

      setEvents(
        Object.fromEntries(
          mappedProducts.map((product) => [
            product.id,
            product.events || [],
          ]),
        ),
      );

      setRepairRequests(
        repairRows.map(mapRepair),
      );

      setNotifications(
        notificationRows.map(mapNotification),
      );

      /*
      |--------------------------------------------------------------------------
      | Customer
      |--------------------------------------------------------------------------
      */

      if (user.role === "customer") {
        const [
          listings,
          donationRows,
          recyclingRows,
          providerRows,
        ] = await Promise.all([
          api("/listings/mine"),
          api("/donations"),
          api("/recycling"),
          api("/providers"),
        ]);

        setMarketplaceListings(
          listings.map(mapListing),
        );

        setDonations(donationRows);

        setRecycling(recyclingRows);

        setRepairPartners(
          providerRows.map(mapProvider),
        );
      }

      /*
      |--------------------------------------------------------------------------
      | Repair Partner
      |--------------------------------------------------------------------------
      */

      else if (user.role === "repair_partner") {
        setRepairPartners([
          mapProvider({
            ...user,
            id: user.id,
          }),
        ]);

        setMarketplaceListings([]);
      }

      /*
      |--------------------------------------------------------------------------
      | Admin
      |--------------------------------------------------------------------------
      */

      else if (user.role === "admin") {
        const [
          userRows,
          providerRows,
          listingRows,
          dashboardData,
          analyticsData,
          donationRows,
          recyclingRows,
        ] = await Promise.all([
          api("/admin/users"),
          api("/admin/providers"),
          api("/admin/marketplace").catch(() =>
            api("/listings/all/admin"),
          ),
          api("/admin/dashboard"),
          api("/admin/analytics"),
          api("/admin/donations"),
          api("/admin/recycling"),
        ]);

        setUsers(
          userRows.map((u) => ({
            ...u,
            id: String(u._id || u.id),
          })),
        );

        setRepairPartners(
          providerRows.map(mapProvider),
        );

        setMarketplaceListings(
          listingRows.map(mapListing),
        );

        setDashboard(dashboardData);

        setAnalytics(analyticsData);

        setDonations(donationRows);

        setRecycling(recyclingRows);
      }
    } catch (error) {
      console.error("DataContext refresh error:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  /*
  |--------------------------------------------------------------------------
  | Auto refresh
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    refresh();

    if (!user) {
      return undefined;
    }

    const intervalId = setInterval(
      refresh,
      8000,
    );

    const handleFocus = () => {
      refresh();
    };

    window.addEventListener(
      "focus",
      handleFocus,
    );

    return () => {
      clearInterval(intervalId);

      window.removeEventListener(
        "focus",
        handleFocus,
      );
    };
  }, [refresh, user]);

  /*
  |--------------------------------------------------------------------------
  | Products
  |--------------------------------------------------------------------------
  */

  const addProduct = async (input) => {
    const product = mapProduct(
      await api("/products", {
        method: "POST",
        body: JSON.stringify(input),
      }),
    );

    setProducts((prev) => [
      product,
      ...prev,
    ]);

    setEvents((prev) => ({
      ...prev,
      [product.id]: product.events || [],
    }));

    return product;
  };

  const updateProduct = async (id, patch) => {
    const product = mapProduct(
      await api(`/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify(patch),
      }),
    );

    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? product : item,
      ),
    );

    setEvents((prev) => ({
      ...prev,
      [product.id]:
        product.events ||
        prev[product.id] ||
        [],
    }));

    return product;
  };

  const deleteProduct = async (id) => {
    await api(`/products/${id}`, {
      method: "DELETE",
    });

    setProducts((prev) =>
      prev.filter(
        (item) => item.id !== id,
      ),
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Marketplace
  |--------------------------------------------------------------------------
  */

  const addMarketplaceListing = async (
    input,
  ) => {
    const listing = mapListing(
      await api("/listings", {
        method: "POST",
        body: JSON.stringify(input),
      }),
    );

    setMarketplaceListings((prev) => [
      listing,
      ...prev,
    ]);

    return listing;
  };

  const updateMarketplaceListing = async (
    id,
    patch,
  ) => {
    const listing = mapListing(
      await api(
        `/listings/${id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify(patch),
        },
      ),
    );

    setMarketplaceListings((prev) =>
      prev.map((item) =>
        item.id === id ? listing : item,
      ),
    );

    return listing;
  };

  const removeMarketplaceListing = (
    id,
  ) =>
    updateMarketplaceListing(
      id,
      {
        status: "Removed",
      },
    );

  /*
  |--------------------------------------------------------------------------
  | Repair Requests
  |--------------------------------------------------------------------------
  */

  const addRepairRequest = async (
    input,
  ) => {
    const repairRequest =
      mapRepair(
        await api("/repairs", {
          method: "POST",
          body: JSON.stringify(input),
        }),
      );

    setRepairRequests((prev) => [
      repairRequest,
      ...prev,
    ]);

    return repairRequest;
  };

  const updateRepairRequest = async (
    id,
    patch,
  ) => {
    const repairRequest =
      mapRepair(
        await api(`/repairs/${id}`, {
          method: "PATCH",
          body: JSON.stringify(patch),
        }),
      );

    setRepairRequests((prev) =>
      prev.map((item) =>
        item.id === id
          ? repairRequest
          : item,
      ),
    );

    return repairRequest;
  };

  /*
  |--------------------------------------------------------------------------
  | Repair Partners
  |--------------------------------------------------------------------------
  */

  const updateProvider = async (
    id,
    patch,
  ) => {
    /*
    |--------------------------------------------------------------------------
    | Repair partner updates own profile
    |--------------------------------------------------------------------------
    */

    if (user?.role === "repair_partner") {
      const response = await api(
        "/auth/profile",
        {
          method: "PATCH",
          body: JSON.stringify(patch),
        },
      );

      const updatedUser =
        response.user;

      updateUserRecord(
        user.id,
        updatedUser,
      );

      const mapped =
        mapProvider({
          ...updatedUser,
          id: updatedUser.id ||
            updatedUser._id,
        });

      setRepairPartners([
        mapped,
      ]);

      return mapped;
    }

    /*
    |--------------------------------------------------------------------------
    | Admin updates provider
    |--------------------------------------------------------------------------
    */

    const provider = await api(
      `/admin/providers/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(patch),
      },
    );

    const mapped =
      mapProvider(provider);

    setRepairPartners((prev) =>
      prev.map((item) =>
        item.id === mapped.id
          ? mapped
          : item,
      ),
    );

    setUsers((prev) =>
      prev.map((item) =>
        String(
          item._id || item.id,
        ) === mapped.id
          ? {
              ...provider,
              id: String(
                provider._id ||
                  provider.id,
              ),
            }
          : item,
      ),
    );

    return mapped;
  };

  /*
  |--------------------------------------------------------------------------
  | Users
  |--------------------------------------------------------------------------
  */

  const updateUser = async (
    id,
    patch,
  ) => {
    if (user?.role === "admin") {
      const updatedUser =
        await api(
          `/admin/users/${id}`,
          {
            method: "PATCH",
            body: JSON.stringify(patch),
          },
        );

      setUsers((prev) =>
        prev.map((item) =>
          String(
            item._id || item.id,
          ) === String(id)
            ? {
                ...updatedUser,
                id: String(
                  updatedUser._id ||
                    updatedUser.id,
                ),
              }
            : item,
        ),
      );

      return updatedUser;
    }

    const response = await api(
      "/auth/profile",
      {
        method: "PATCH",
        body: JSON.stringify(patch),
      },
    );

    updateUserRecord(
      id,
      response.user,
    );

    return response.user;
  };

  /*
  |--------------------------------------------------------------------------
  | Notifications
  |--------------------------------------------------------------------------
  */

  const markNotificationRead =
    async (id) => {
      const notification =
        mapNotification(
          await api(
            `/notifications/${id}/read`,
            {
              method: "PATCH",
            },
          ),
        );

      setNotifications((prev) =>
        prev.map((item) =>
          item.id === id
            ? notification
            : item,
        ),
      );
    };

  const markAllNotificationsRead =
    async () => {
      await api(
        "/notifications/read-all",
        {
          method: "PATCH",
        },
      );

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          isRead: true,
        })),
      );
    };

  /*
  |--------------------------------------------------------------------------
  | Donations / Recycling
  |--------------------------------------------------------------------------
  */

  const addDonation = async (
    input,
  ) => {
    const donation = await api(
      "/donations",
      {
        method: "POST",
        body: JSON.stringify(input),
      },
    );

    setDonations((prev) => [
      donation,
      ...prev,
    ]);

    return donation;
  };

  const addRecycling = async (
    input,
  ) => {
    const recyclingItem =
      await api("/recycling", {
        method: "POST",
        body: JSON.stringify(input),
      });

    setRecycling((prev) => [
      recyclingItem,
      ...prev,
    ]);

    return recyclingItem;
  };

  /*
  |--------------------------------------------------------------------------
  | Messages
  |--------------------------------------------------------------------------
  */

  const contactSeller = async (
    input,
  ) =>
    api("/messages", {
      method: "POST",
      body: JSON.stringify(input),
    });

  /*
  |--------------------------------------------------------------------------
  | Product Health
  |--------------------------------------------------------------------------
  */

  const getProductHealth = (
    product,
  ) => {
    const {
      score,
      factors,
    } =
      calculateHealthScore(
        product,
      );

    return {
      score,
      factors,
      recommendation:
        getRecommendation(
          product,
          { score },
        ),
    };
  };

  /*
  |--------------------------------------------------------------------------
  | Context Value
  |--------------------------------------------------------------------------
  */

  const value = useMemo(
    () => ({
      products,
      events,
      repairRequests,
      repairPartners,
      marketplaceListings,
      notifications,
      users,
      donations,
      recycling,
      dashboard,
      analytics,
      loading,

      refresh,

      addProduct,
      updateProduct,
      deleteProduct,

      addRepairRequest,
      updateRepairRequest,

      updateProvider,
      updateUser,

      addMarketplaceListing,
      updateMarketplaceListing,
      removeMarketplaceListing,

      markNotificationRead,
      markAllNotificationsRead,

      addDonation,
      addRecycling,

      contactSeller,

      getProductHealth,
    }),
    [
      products,
      events,
      repairRequests,
      repairPartners,
      marketplaceListings,
      notifications,
      users,
      donations,
      recycling,
      dashboard,
      analytics,
      loading,
      refresh,
    ],
  );

  return (
    <DataContext.Provider
      value={value}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context =
    useContext(DataContext);

  if (!context) {
    throw new Error(
      "useData must be used within a DataProvider",
    );
  }

  return context;
}