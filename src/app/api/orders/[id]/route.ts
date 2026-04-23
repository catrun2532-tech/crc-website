import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

// helper
function normalizeStatus(status: any) {
  if (!status) return "quote";

  const clean = String(status).trim().toLowerCase();
  const allowed = ["quote", "repairing", "waiting_parts", "done"];

  if (!allowed.includes(clean)) {
    throw new Error("Invalid status: " + clean);
  }

  return clean;
}

function normalizeItems(items: any): string[] {
  if (!Array.isArray(items)) return [];
  return items.map((i) => String(i).trim()).filter(Boolean);
}

// ✅ GET
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = context.params?.id;

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await connectDB();

    const order = await Order.findById(id).lean();

    if (!order) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("GET ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

// ✅ PUT
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = context.params?.id;

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await connectDB();

    const body = await req.json();
    const status = normalizeStatus(body.status);

    const updated = await Order.findByIdAndUpdate(
      id,
      {
        ...body,
        status,
        items: normalizeItems(body.items),
        otherItem: (body.otherItem || "").trim(),
        ram: body.ram ? Number(body.ram) : null,
        ssd: body.ssd ? Number(body.ssd) : null,
      },
      { new: true }
    ).lean();

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PUT ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

// ✅ DELETE
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = context.params?.id;

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await connectDB();

    await Order.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted" });
  } catch (error: any) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}