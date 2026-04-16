import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

// helper: clean + validate status
function normalizeStatus(status: any) {
  if (!status) return "quote";

  const clean = String(status).trim().toLowerCase();

  const allowed = ["quote", "repairing", "waiting_parts", "done"];

  if (!allowed.includes(clean)) {
    throw new Error("Invalid status: " + clean);
  }

  return clean;
}

// ✅ POST (create order)
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const status = normalizeStatus(body.status);

    const newOrder = await Order.create({
      ...body,
      status,
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    console.error("POST ERROR:", error.message);

    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

// ✅ GET (all orders)
export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find().sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error: any) {
    console.error("GET ERROR:", error.message);

    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}