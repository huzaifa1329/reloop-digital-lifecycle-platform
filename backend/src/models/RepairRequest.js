import mongoose from "mongoose";

const repairRequestSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    assignedPartnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    productName: {
      type: String,
      trim: true,
    },

    issue: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    serviceType: {
      type: String,
      trim: true,
      default: "",
    },

    preferredDate: {
      type: String,
      trim: true,
      default: "",
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Submitted",
        "Accepted",
        "Diagnosing",
        "Quote Provided",
        "Repairing",
        "Completed",
        "Rejected",
      ],
      default: "Submitted",
      index: true,
    },

    diagnosis: {
      type: String,
      trim: true,
      default: "",
    },

    estimatedCost: {
      type: Number,
      min: 0,
      default: null,
    },

    finalCost: {
      type: Number,
      min: 0,
      default: null,
    },

    parts: {
      type: [
        {
          name: {
            type: String,
            trim: true,
          },
          cost: {
            type: Number,
            min: 0,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("RepairRequest", repairRequestSchema);