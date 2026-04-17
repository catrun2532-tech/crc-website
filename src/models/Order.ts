import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    sn: {
      type: String,
    },

    service: {
      type: String,
    },

    details: {
      type: String,
    },

    // ✅ เพิ่ม RAM / SSD
    ram: {
      type: Number,
      default: null,
    },

    ssd: {
      type: Number,
      default: null,
    },

    status: {
      type: String,
      enum: ["quote", "repairing", "waiting_parts", "done"],
      default: "quote",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);