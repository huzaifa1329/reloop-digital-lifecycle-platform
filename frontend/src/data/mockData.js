// ReLoop — Mock Data Layer
// Week 44 is frontend-only, so every "API" call in this app reads/writes
// this in-memory store instead of hitting a real backend (that's Week 45).

export const categories = [
  "Laptops",
  "Phones",
  "Tablets",
  "Audio",
  "Cameras",
  "Appliances",
  "Bicycles",
  "Other",
];

export const conditions = ["Excellent", "Good", "Fair", "Poor", "Critical"];

export let products = [
  {
    id: "p1",
    productId: "RL-8F29X",
    ownerId: "u1",
    name: "Dell XPS 15",
    brand: "Dell",
    model: "XPS 15 9530",
    category: "Laptops",
    purchaseDate: "2024-03-04",
    condition: "Good",
    estimatedValue: 185000,
    estimatedReplacementCost: 340000,
    estimatedRepairCost: 18000,
    currency: "PKR",
    lifecycleStatus: "Active",
    repairCount: 2,
    partsReplaced: 1,
    maintenanceLevel: "occasional",
    maintenanceOverdue: false,
    upgradeable: true,
    warranty: {
      provider: "Dell Pakistan",
      startDate: "2024-03-04",
      endDate: "2027-03-04",
      coverage: "Standard hardware warranty",
      status: "Active",
    },
    serialNumber: "DXPS15-99231",
    notes: "Used mainly for development work.",
  },
  {
    id: "p2",
    productId: "RL-3C71Q",
    ownerId: "u1",
    name: "iPhone 13",
    brand: "Apple",
    model: "iPhone 13 128GB",
    category: "Phones",
    purchaseDate: "2022-09-15",
    condition: "Fair",
    estimatedValue: 95000,
    estimatedReplacementCost: 210000,
    estimatedRepairCost: 32000,
    currency: "PKR",
    lifecycleStatus: "Needs Maintenance",
    repairCount: 1,
    partsReplaced: 1,
    maintenanceLevel: "rare",
    maintenanceOverdue: true,
    upgradeable: false,
    warranty: {
      provider: "Apple",
      startDate: "2022-09-15",
      endDate: "2023-09-15",
      coverage: "Limited warranty",
      status: "Expired",
    },
    serialNumber: "IP13-88213",
    notes: "Battery health degrading.",
  },
  {
    id: "p3",
    productId: "RL-1A45Z",
    ownerId: "u1",
    name: "Sony WH-1000XM4",
    brand: "Sony",
    model: "WH-1000XM4",
    category: "Audio",
    purchaseDate: "2021-06-10",
    condition: "Poor",
    estimatedValue: 22000,
    estimatedReplacementCost: 75000,
    estimatedRepairCost: 41000,
    currency: "PKR",
    lifecycleStatus: "Under Repair",
    repairCount: 3,
    partsReplaced: 2,
    maintenanceLevel: "none",
    maintenanceOverdue: false,
    upgradeable: false,
    warranty: {
      provider: "Sony",
      startDate: "2021-06-10",
      endDate: "2022-06-10",
      coverage: "Standard warranty",
      status: "Expired",
    },
    serialNumber: "SNY-XM4-5521",
    notes: "Hinge cracked, ear cushion worn out.",
  },
];

export const productEvents = {
  p1: [
    {
      id: "e1",
      type: "Registered",
      title: "Product Registered",
      description: "Added to ReLoop with full purchase details.",
      date: "2024-03-04",
    },
    {
      id: "e2",
      type: "Warranty Added",
      title: "Warranty Added",
      description: "3-year Dell Pakistan hardware warranty attached.",
      date: "2024-03-05",
    },
    {
      id: "e3",
      type: "Repair Requested",
      title: "Repair Requested",
      description: "Display flickering intermittently.",
      date: "2025-01-12",
    },
    {
      id: "e4",
      type: "Part Replaced",
      title: "Display Cable Replaced",
      description: "Technician replaced the internal display cable.",
      date: "2025-01-18",
    },
    {
      id: "e5",
      type: "Repair Completed",
      title: "Repair Completed",
      description: "Issue resolved, unit tested and returned.",
      date: "2025-01-20",
    },
  ],
  p2: [
    {
      id: "e6",
      type: "Registered",
      title: "Product Registered",
      description: "Added to ReLoop.",
      date: "2022-09-15",
    },
    {
      id: "e7",
      type: "Repair Completed",
      title: "Battery Replacement",
      description: "Battery replaced at authorized service center.",
      date: "2024-05-02",
    },
  ],
  p3: [
    {
      id: "e8",
      type: "Registered",
      title: "Product Registered",
      description: "Added to ReLoop.",
      date: "2021-06-10",
    },
    {
      id: "e9",
      type: "Repair Requested",
      title: "Repair Requested",
      description: "Hinge cracked on the left ear cup.",
      date: "2026-08-01",
    },
    {
      id: "e10",
      type: "Repair Started",
      title: "Diagnosis In Progress",
      description: "Partner reviewing hinge and cushion damage.",
      date: "2026-08-05",
    },
  ],
};

export const repairPartners = [
  {
    id: "rp1",
    userId: "u2",
    businessName: "Usman Electronics Repair",
    description: "Independent technician specializing in laptops and audio.",
    categories: ["Laptops", "Audio"],
    location: "Lahore",
    verificationStatus: "Verified",
    ratingAverage: 4.7,
    reviewCount: 38,
  },
  {
    id: "rp2",
    userId: "u3",
    businessName: "FixIt Mobile Care",
    description: "Screen and battery specialists for phones and tablets.",
    categories: ["Phones", "Tablets"],
    location: "Karachi",
    verificationStatus: "Pending",
    ratingAverage: 4.3,
    reviewCount: 12,
  },
];

export let repairRequests = [
  {
    id: "r1",
    productId: "p3",
    productName: "Sony WH-1000XM4",
    customerId: "u1",
    issue: "Cracked hinge, worn ear cushion",
    description:
      "Left hinge cracked after being dropped. Ear cushion foam is disintegrating.",
    serviceType: "In-store",
    preferredDate: "2026-08-10",
    location: "Lahore",
    status: "Diagnosing",
    assignedPartnerId: "rp1",
    diagnosis: "Hinge assembly needs replacement, cushion needs re-foaming.",
    estimatedCost: 41000,
    finalCost: null,
    parts: [{ name: "Hinge Assembly", cost: 26000 }],
    createdAt: "2026-08-01",
  },
  {
    id: "r2",
    productId: "p1",
    productName: "Dell XPS 15",
    customerId: "u1",
    issue: "Display flickering",
    description: "Screen flickers when laptop is moved or lid is adjusted.",
    serviceType: "Pickup",
    preferredDate: "2025-01-14",
    location: "Lahore",
    status: "Completed",
    assignedPartnerId: "rp1",
    diagnosis: "Loose display cable connector.",
    estimatedCost: 18000,
    finalCost: 16500,
    parts: [{ name: "Display Cable", cost: 8000 }],
    createdAt: "2025-01-12",
  },
];

export const marketplaceListings = [
  {
    id: "l1",
    productId: "p1",
    sellerId: "u1",
    title: "Dell XPS 15 — Healthy, 2 repairs",
    price: 165000,
    condition: "Good",
    location: "Lahore",
    status: "Active",
  },
];

export const notifications = [
  {
    id: "n1",
    title: "Diagnosis completed",
    message: "Usman Electronics completed diagnosis on your Sony headphones.",
    type: "repair",
    isRead: false,
    createdAt: "2026-08-05",
  },
  {
    id: "n2",
    title: "Warranty expiring soon",
    message: "Your iPhone 13 warranty expired. Consider a health check.",
    type: "warranty",
    isRead: false,
    createdAt: "2026-08-02",
  },
  {
    id: "n3",
    title: "Repair completed",
    message: "Your Dell XPS 15 repair was marked completed.",
    type: "repair",
    isRead: true,
    createdAt: "2025-01-20",
  },
];

export const adminUsers = [
  { id: "u1", name: "Ahmed Khan", email: "ahmed@example.com", role: "customer", status: "Active" },
  { id: "u2", name: "Usman Ali", email: "usman@example.com", role: "repair_partner", status: "Active" },
  { id: "u3", name: "Fatima Noor", email: "fatima@example.com", role: "repair_partner", status: "Pending" },
  { id: "u4", name: "Sara Ahmed", email: "sara@example.com", role: "customer", status: "Active" },
];

export function generateProductId() {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `RL-${rand}`;
}
