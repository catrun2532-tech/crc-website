import { NextResponse } from "next/server"
import mongoose from "mongoose"

export const dynamic = "force-dynamic"

// connect helper (กัน connect ซ้ำ)
async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!)
  }
}

// helper
function normalizeStatus(status: any) {
  if (!status) return "quote"

  const clean = String(status).trim().toLowerCase()
  const allowed = ["quote", "repairing", "waiting_parts", "done"]

  if (!allowed.includes(clean)) {
    throw new Error("Invalid status: " + clean)
  }

  return clean
}

function normalizeItems(items: any): string[] {
  if (!Array.isArray(items)) return []
  return items.map((i) => String(i).trim()).filter(Boolean)
}

// model
const Order =
  mongoose.models.Order ||
  mongoose.model(
    "Order",
    new mongoose.Schema(
      {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        service: { type: String, required: true },
        details: { type: String },
        sn: { type: String },
        items: { type: [String], default: [] },
        otherItem: { type: String, default: "" },
        ram: { type: Number, default: null },
        ssd: { type: Number, default: null },
        status: {
          type: String,
          enum: ["quote", "repairing", "waiting_parts", "done"],
          default: "quote",
        },
      },
      { timestamps: true }
    )
  )

// 👉 POST
export async function POST(req: Request) {
  try {
    await connectDB()

    const body = await req.json()

    if (!body.name || !body.phone || !body.service) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      )
    }

    const order = await Order.create({
      name: body.name,
      phone: body.phone,
      service: body.service,
      details: body.details || "",
      sn: body.sn || "",
      items: normalizeItems(body.items),
      otherItem: (body.otherItem || "").trim(),
      ram: body.ram ? Number(body.ram) : null,
      ssd: body.ssd ? Number(body.ssd) : null,
      status: normalizeStatus(body.status),
    })

    return NextResponse.json({ success: true, order })

  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    )
  }
}

// 👉 GET
export async function GET() {
  try {
    await connectDB()

    const orders = await Order.find().sort({ createdAt: -1 })

    return NextResponse.json(orders)

  } catch (err: any) {
    return NextResponse.json([], { status: 500 })
  }
}