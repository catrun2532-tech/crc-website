import { NextResponse } from "next/server";
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

// ✅ GET by id + รองรับ PDF
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // 🔥 ถ้ามี ?pdf=true → ส่ง PDF (HTML)
    const { searchParams } = new URL(req.url);
    const isPDF = searchParams.get("pdf");

    if (isPDF) {
      const itemsText = [
        ...(order.items || []),
        order.otherItem || "",
      ]
        .filter(Boolean)
        .join(", ");

      const html = `
        <html>
          <head>
            <meta charset="UTF-8" />
            <style>
              body { font-family: Arial; padding: 20px; }
              .box { border: 1px solid #000; padding: 20px; }
              h2 { text-align: center; }
            </style>
          </head>
          <body>
            <div class="box">
              <h2>ใบงานซ่อม</h2>

              <p>ชื่อลูกค้า: ${order.name || "-"}</p>
              <p>เบอร์: ${order.phone || "-"}</p>
              <p>SN: ${order.sn || "-"}</p>

              <hr/>

              <p>บริการ: ${order.service || "-"}</p>
              <p>รายละเอียด: ${order.details || "-"}</p>
              <p>สถานะ: ${order.status || "-"}</p>
              <p>ของที่รับ: ${itemsText || "-"}</p>

              <br/><br/>
              <p>ลงชื่อ ________________________</p>
            </div>
          </body>
        </html>
      `;

      return new Response(html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      });
    }

    // ✅ ปกติ return json
    return NextResponse.json(order);
  } catch (error: any) {
    console.error("GET ERROR:", error.message);

    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

// ✅ PUT update
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();

    const body = await req.json();

    const status = normalizeStatus(body.status);

    const updated = await Order.findByIdAndUpdate(
      id,
      { ...body, status },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PUT ERROR:", error.message);

    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

// ✅ DELETE
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();

    await Order.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted" });
  } catch (error: any) {
    console.error("DELETE ERROR:", error.message);

    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}