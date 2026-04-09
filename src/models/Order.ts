import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    name: String,
    number: String,
    sn: String,
    details: String,
    status: {
      type: String,
      enum: ["pending", "repairing", "waiting_parts", "done"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);