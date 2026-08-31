import { Router } from "express";

import RepairRequest from "../models/RepairRequest.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

import { auth } from "../middleware/auth.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| GET /repairs
|--------------------------------------------------------------------------
*/
router.get("/", auth, async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "customer") {
      filter.customerId = req.user.id;
    }

    if (req.user.role === "repair_partner") {
      filter.assignedPartnerId = req.user.id;
    }

    if (req.user.role === "admin") {
      // Admin can see all repair requests.
    }

    const rows = await RepairRequest.find(filter)
      .populate(
        "assignedPartnerId",
        "name businessName location categories ratingAverage reviewCount",
      )
      .sort({ createdAt: -1 })
      .lean();

    res.json(rows);
  } catch (error) {
    console.error("GET /repairs error:", error);

    res.status(500).json({
      message: "Failed to load repair requests.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| POST /repairs
|--------------------------------------------------------------------------
| Customer creates a repair request for a selected verified partner.
|--------------------------------------------------------------------------
*/
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "customer") {
      return res.status(403).json({
        message: "Only customers can create repair requests.",
      });
    }

    const {
      productId,
      assignedPartnerId,
      issue,
      description,
      serviceType,
      preferredDate,
      location,
    } = req.body;

    /*
    |--------------------------------------------------------------------------
    | Basic validation
    |--------------------------------------------------------------------------
    */
    if (!productId) {
      return res.status(400).json({
        message: "Please select a product.",
      });
    }

    if (!assignedPartnerId) {
      return res.status(400).json({
        message: "Please select a repair partner.",
      });
    }

    if (!issue?.trim()) {
      return res.status(400).json({
        message: "Please describe the issue.",
      });
    }

    if (!serviceType) {
      return res.status(400).json({
        message: "Please select a service type.",
      });
    }

    if (!preferredDate) {
      return res.status(400).json({
        message: "Please select a preferred date.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Verify customer's product
    |--------------------------------------------------------------------------
    */
    const product = await Product.findOne({
      _id: productId,
      ownerId: req.user.id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found or does not belong to you.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Verify selected repair partner
    |--------------------------------------------------------------------------
    */
    const partner = await User.findOne({
      _id: assignedPartnerId,
      role: "repair_partner",
      status: "Active",
      verificationStatus: "Verified",
    });

    if (!partner) {
      return res.status(400).json({
        message:
          "The selected repair partner is not available or has not been verified.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Create repair request
    |--------------------------------------------------------------------------
    */
    const repairRequest = await RepairRequest.create({
      customerId: req.user.id,
      productId: product._id,
      assignedPartnerId: partner._id,

      productName: product.name,

      issue: issue.trim(),
      description: description?.trim() || "",
      serviceType,
      preferredDate,
      location: location?.trim() || "",

      status: "Submitted",
    });

    /*
    |--------------------------------------------------------------------------
    | Update product lifecycle
    |--------------------------------------------------------------------------
    */
    product.lifecycleStatus = "Under Repair";

    product.events = [
      ...(product.events || []),
      {
        type: "Repair Requested",
        title: "Repair Requested",
        description: issue.trim(),
        date: new Date().toISOString().slice(0, 10),
      },
    ];

    await product.save();

    /*
    |--------------------------------------------------------------------------
    | Notify selected repair partner
    |--------------------------------------------------------------------------
    */
    await Notification.create({
      userId: partner._id,
      title: "New repair request",
      message: `${product.name} needs repair: ${issue.trim()}`,
      type: "repair",
    });

    /*
    |--------------------------------------------------------------------------
    | Notify customer
    |--------------------------------------------------------------------------
    */
    await Notification.create({
      userId: req.user.id,
      title: "Repair request submitted",
      message: `Your repair request for ${product.name} has been sent to ${
        partner.businessName || partner.name
      }.`,
      type: "repair",
    });

    /*
    |--------------------------------------------------------------------------
    | Return populated request
    |--------------------------------------------------------------------------
    */
    const populatedRequest = await RepairRequest.findById(repairRequest._id)
      .populate(
        "assignedPartnerId",
        "name businessName location categories ratingAverage reviewCount",
      )
      .lean();

    res.status(201).json(populatedRequest);
  } catch (error) {
    console.error("POST /repairs error:", error);

    res.status(500).json({
      message: "Failed to create repair request.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| PATCH /repairs/:id
|--------------------------------------------------------------------------
*/
router.patch("/:id", auth, async (req, res) => {
  try {
    let filter;

    /*
    |--------------------------------------------------------------------------
    | Admin
    |--------------------------------------------------------------------------
    */
    if (req.user.role === "admin") {
      filter = {
        _id: req.params.id,
      };
    }

    /*
    |--------------------------------------------------------------------------
    | Repair Partner
    |--------------------------------------------------------------------------
    */
    else if (req.user.role === "repair_partner") {
      filter = {
        _id: req.params.id,
        assignedPartnerId: req.user.id,
      };
    }

    /*
    |--------------------------------------------------------------------------
    | Customer
    |--------------------------------------------------------------------------
    */
    else {
      filter = {
        _id: req.params.id,
        customerId: req.user.id,
      };
    }

    const patch = { ...req.body };

    /*
    |--------------------------------------------------------------------------
    | Prevent users from changing ownership
    |--------------------------------------------------------------------------
    */
    delete patch.customerId;
    delete patch.productId;

    /*
    | Only admin should be able to change assigned partner.
    | A repair partner cannot assign the request to themselves/another partner.
    */
    if (req.user.role !== "admin") {
      delete patch.assignedPartnerId;
    }

    /*
    |--------------------------------------------------------------------------
    | Repair partner can accept the request
    |--------------------------------------------------------------------------
    */
    if (
      req.user.role === "repair_partner" &&
      patch.status === "Accepted"
    ) {
      patch.assignedPartnerId = req.user.id;
    }

    /*
    |--------------------------------------------------------------------------
    | Update repair request
    |--------------------------------------------------------------------------
    */
    const repairRequest = await RepairRequest.findOneAndUpdate(
      filter,
      patch,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!repairRequest) {
      return res.status(404).json({
        message: "Repair request not found.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Completed repair -> update product lifecycle
    |--------------------------------------------------------------------------
    */
    if (patch.status === "Completed") {
      const product = await Product.findById(repairRequest.productId);

      if (product) {
        product.lifecycleStatus = "Repaired";
        product.repairCount = (product.repairCount || 0) + 1;

        product.events = [
          ...(product.events || []),
          {
            type: "Repair Completed",
            title: "Repair Completed",
            description: "Repair job marked as completed.",
            date: new Date().toISOString().slice(0, 10),
          },
        ];

        await product.save();
      }
    }

    /*
    |--------------------------------------------------------------------------
    | Notify the other party
    |--------------------------------------------------------------------------
    */
    let notificationUserId = null;

    if (req.user.role === "customer") {
      notificationUserId = repairRequest.assignedPartnerId;
    } else {
      notificationUserId = repairRequest.customerId;
    }

    if (notificationUserId) {
      await Notification.create({
        userId: notificationUserId,
        title: "Repair request updated",
        message: `Repair request for ${repairRequest.productName} is now ${repairRequest.status}.`,
        type: "repair",
      }).catch((notificationError) => {
        console.error(
          "Repair notification error:",
          notificationError,
        );
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Return populated request
    |--------------------------------------------------------------------------
    */
    const populatedRequest = await RepairRequest.findById(
      repairRequest._id,
    )
      .populate(
        "assignedPartnerId",
        "name businessName location categories ratingAverage reviewCount",
      )
      .lean();

    res.json(populatedRequest);
  } catch (error) {
    console.error("PATCH /repairs/:id error:", error);

    res.status(500).json({
      message: "Failed to update repair request.",
    });
  }
});

export default router;