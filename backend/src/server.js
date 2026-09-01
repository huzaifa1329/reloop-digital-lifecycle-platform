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

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

/*
|--------------------------------------------------------------------------
| Body Parser
|--------------------------------------------------------------------------
*/

app.use(
  express.json({
    limit: "12mb",
  })
);

/*
|--------------------------------------------------------------------------
| Database Connection
|--------------------------------------------------------------------------
|
| In local development the database is connected before starting
| the HTTP server.
|
| On Vercel, the Express app is exported and the database connection
| is established when a request reaches the application.
|
*/

let databaseConnectionPromise = null;

async function ensureDatabaseConnection() {
  if (!databaseConnectionPromise) {
    databaseConnectionPromise = connectDB().catch((error) => {
      databaseConnectionPromise = null;
      throw error;
    });
  }

  return databaseConnectionPromise;
}

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/api/health", async (req, res) => {
  try {
    await ensureDatabaseConnection();

    res.json({
      ok: true,
      service: "ReLoop API",
      database: "connected",
      time: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health check database error:", error.message);

    res.status(503).json({
      ok: false,
      service: "ReLoop API",
      database: "disconnected",
      message: "Database connection unavailable.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| Database Middleware
|--------------------------------------------------------------------------
|
| Every API request requires MongoDB.
|
*/

app.use("/api", async (req, res, next) => {
  try {
    await ensureDatabaseConnection();
    next();
  } catch (error) {
    console.error("Database connection error:", error.message);

    res.status(503).json({
      message: "Database connection unavailable.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/listings", listingRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/repairs", repairRoutes);

app.use("/api/providers", providerRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api", engagementRoutes);

/*
|--------------------------------------------------------------------------
| API 404 Handler
|--------------------------------------------------------------------------
*/

app.use("/api", (req, res) => {
  res.status(404).json({
    message: "Not found.",
  });
});

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use((err, req, res, next) => {
  console.error("Unhandled server error:", err);

  res.status(err.status || 500).json({
    message: err.message || "Internal server error.",
  });
});

/*
|--------------------------------------------------------------------------
| Environment Validation
|--------------------------------------------------------------------------
*/

if (!process.env.JWT_SECRET) {
  console.warn(
    "WARNING: JWT_SECRET is not configured. Authentication will not work correctly."
  );
}

/*
|--------------------------------------------------------------------------
| Local Development
|--------------------------------------------------------------------------
|
| Vercel will use the exported Express app.
| We only start app.listen() during local development.
|
*/

if (process.env.NODE_ENV !== "production") {
  ensureDatabaseConnection()
    .then(() => seedDemoData())
    .then(() => {
      app.listen(PORT, () => {
        console.log(
          `ReLoop API running on http://localhost:${PORT}`
        );
      });
    })
    .catch((error) => {
      console.error(
        "Server startup failed:",
        error.message
      );

      process.exit(1);
    });
}

/*
|--------------------------------------------------------------------------
| Export Express App
|--------------------------------------------------------------------------
*/

export default app;