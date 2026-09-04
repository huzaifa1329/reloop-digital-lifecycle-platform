import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import listingRoutes from "./routes/listings.js";
import notificationRoutes from "./routes/notifications.js";
import repairRoutes from "./routes/repairs.js";
import adminRoutes from "./routes/admin.js";
import engagementRoutes from "./routes/engagement.js";
import providerRoutes from "./routes/providers.js";

import { seedDemoData } from "./seed.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "12mb" }));

// Root API status
app.get("/", (req, res) => {
  res.json({
    ok: true,
    service: "ReLoop API",
    status: "running",
    message: "ReLoop backend is running successfully.",
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "ReLoop API",
    time: new Date().toISOString(),
  });
});

// Database connection cache
let dbPromise;

async function ensureDatabase() {
  if (!dbPromise) {
    dbPromise = connectDB().then(seedDemoData);
  }

  return dbPromise;
}

// Connect to MongoDB before API requests
app.use(async (req, res, next) => {
  try {
    await ensureDatabase();
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);

    res.status(500).json({
      message: "Database connection failed.",
    });
  }
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/repairs", repairRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", engagementRoutes);

// API 404 handler
app.use("/api", (req, res) => {
  res.status(404).json({
    message: "Not found.",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || "Internal server error.",
  });
});

// Local development server
if (process.env.NODE_ENV !== "production") {
  ensureDatabase()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`ReLoop API running on http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Server startup failed:", error.message);
      process.exit(1);
    });
}

export default app;