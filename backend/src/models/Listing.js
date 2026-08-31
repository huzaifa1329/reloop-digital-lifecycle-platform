import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  title: { type: String, required: true },
  name: String,
  brand: String,
  model: String,
  category: String,
  condition: String,
  health: { type: Number, default: 0 },
  price: { type: Number, required: true },
  location: String,
  imageUrl: String,
  status: { type: String, enum: ["Pending Review", "Active", "Removed"], default: "Pending Review" },
  verified: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Listing", listingSchema);
