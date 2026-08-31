import mongoose from "mongoose";
const schema = new mongoose.Schema({
  key: { type: String, unique: true, default: "platform" },
  autoVerify: { type: Boolean, default: false },
  marketplaceModeration: { type: Boolean, default: true },
  repairNotifications: { type: Boolean, default: true },
  maintenanceMode: { type: Boolean, default: false },
}, { timestamps: true });
export default mongoose.model("Settings", schema);
