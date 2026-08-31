import mongoose from "mongoose";
const schema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", default: null },
  message: { type: String, required: true },
  status: { type: String, enum: ["Sent", "Read"], default: "Sent" },
}, { timestamps: true });
export default mongoose.model("Message", schema);
