import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export const dynamic = "force-dynamic";

function normalizeStatus(status: unknown) {
  if (!status) return "quote";

  const clean = String(status).trim().toLowerCase();
  const allowed = ["quote", "repairing", "waiting_parts", "done"];

  if (!allowed.includes(clean)) {
    throw new Error(`Invalid status: ${clean}`);
  }

  return clean;
}

function normalizeItems(items: unknown): string[] {
  if (!Array.isArray(items)) return [];
  return items.map((item) => String(item).trim()).filter(Boolean);
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.name || !body.phone || !body.service) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
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
    });

    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}