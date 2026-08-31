import mongoose from "mongoose";
const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  organization: { type: String, default: "ReLoop Community Fund" },
  note: String,
  status: { type: String, enum: ["Requested", "Accepted", "Completed", "Cancelled"], default: "Requested" },
}, { timestamps: true });
export default mongoose.model("Donation", schema);
