import { Router } from "express";
import User from "../models/User.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public Repair Network
|--------------------------------------------------------------------------
| Only approved + active repair partners are returned.
| Sensitive user information is never exposed.
*/
router.get("/", async (req, res) => {
  try {
    const rows = await User.find({
      role: "repair_partner",
      status: "Active",
      verificationStatus: "Verified",
    })
      .select(
        "name businessName location categories ratingAverage reviewCount verificationStatus status",
      )
      .sort({
        businessName: 1,
        name: 1,
      })
      .lean();

    res.json(rows);
  } catch (error) {
    console.error("GET /providers error:", error);

    res.status(500).json({
      message: "Failed to load repair partners.",
    });
  }
});

export default router;