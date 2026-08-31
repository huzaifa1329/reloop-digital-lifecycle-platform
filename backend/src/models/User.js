import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ["customer", "repair_partner", "admin"], default: "customer" },
  status: { type: String, enum: ["Active", "Suspended"], default: "Active" },
  emailVerified: { type: Boolean, default: false },
  verificationCode: String,
  verificationExpires: Date,
  resetCode: String,
  resetExpires: Date,
  businessName: String,
  location: String,
  categories: { type: [String], default: [] },
  ratingAverage: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  verificationStatus: { type: String, enum: ["Pending", "Verified", "Rejected"], default: "Pending" },
  availability: { type: Map, of: Boolean, default: {} },
  preferences: { repairAlerts: { type: Boolean, default: true }, lifecycleReminders: { type: Boolean, default: true }, marketplaceUpdates: { type: Boolean, default: false } },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
