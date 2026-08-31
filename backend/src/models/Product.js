import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  brand: String,
  model: String,
  category: String,
  purchaseDate: String,
  condition: String,
  estimatedValue: Number,
  serialNumber: String,
  notes: String,
  imageUrl: String,
  lifecycleStatus: { type: String, default: "Active" },
  repairCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
