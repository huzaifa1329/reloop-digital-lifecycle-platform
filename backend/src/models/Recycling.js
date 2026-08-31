import mongoose from "mongoose";
const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  center: String,
  note: String,
  status: { type: String, enum: ["Requested", "Scheduled", "Collected", "Completed", "Cancelled"], default: "Requested" },
}, { timestamps: true });
export default mongoose.model("Recycling", schema);
