import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

// schema (ต้องเหมือนของจริง)
const OrderSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    service: String,
    details: String,
    sn: String,
    status: String,
    items: [String],
    otherItem: String,
  },
  { timestamps: true }
);

const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const order = await Order.findById(params.id);

    if (!order) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const itemsText = [
      ...(order.items || []),
      order.otherItem || "",
    ]
      .filter(Boolean)
      .join(", ");

    // 🧾 HTML PDF
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

            <p>ชื่อลูกค้า: ${order.name}</p>
            <p>เบอร์: ${order.phone}</p>
            <p>SN: ${order.sn}</p>

            <hr/>

            <p>บริการ: ${order.service}</p>
            <p>รายละเอียด: ${order.details}</p>
            <p>สถานะ: ${order.status}</p>
            <p>ของที่รับ: ${itemsText}</p>

            <br/><br/>
            <p>ลงชื่อ ________________________</p>
          </div>
        </body>
      </html>
    `;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}