import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { loadThaiFont } from "@/lib/font";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function formatStatus(status?: string) {
  switch (status) {
    case "quote":
      return "เสนอราคา";
    case "repairing":
      return "กำลังซ่อม";
    case "waiting_parts":
      return "รออะไหล่";
    case "done":
      return "ซ่อมเสร็จ";
    default:
      return "-";
  }
}

function buildItems(order: any) {
  const items = Array.isArray(order.items) ? order.items.filter(Boolean) : [];

  if (order.otherItem) {
    items.push(order.otherItem);
  }

  return items.length > 0 ? items.join(", ") : "-";
}

export async function GET(_req: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await connectDB();

    const order = await Order.findById(id).lean();

    if (!order) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    loadThaiFont(doc);

    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    doc.setFontSize(20);
    doc.text("ใบรับงานซ่อม", pageWidth / 2, y, { align: "center" });

    y += 10;
    doc.setFontSize(11);
    doc.text(`เลขที่งาน: ${String(order._id)}`, 14, y);
    doc.text(`วันที่ออกเอกสาร: ${new Date().toLocaleString("th-TH")}`, pageWidth - 14, y, {
      align: "right",
    });

    y += 12;
    doc.setLineWidth(0.3);
    doc.line(14, y, pageWidth - 14, y);

    y += 10;
    doc.setFontSize(14);
    doc.text("ข้อมูลลูกค้า", 14, y);

    y += 8;
    doc.setFontSize(12);

    const lines = [
      `ชื่อ: ${order.name || "-"}`,
      `เบอร์โทร: ${order.phone || "-"}`,
      `บริการ: ${order.service || "-"}`,
      `Serial Number: ${order.sn || "-"}`,
      `สถานะงาน: ${formatStatus(order.status)}`,
      `อุปกรณ์ที่นำมา: ${buildItems(order)}`,
      `RAM: ${order.ram ? `${order.ram} GB` : "-"}`,
      `SSD: ${order.ssd ? `${order.ssd} GB` : "-"}`,
      `รายละเอียดอาการ: ${order.details || "-"}`,
    ];

    lines.forEach((line) => {
      const wrapped = doc.splitTextToSize(line, pageWidth - 28);
      doc.text(wrapped, 14, y);
      y += wrapped.length * 6;
    });

    y += 6;
    doc.line(14, y, pageWidth - 14, y);

    y += 12;
    doc.text("หมายเหตุ: กรุณาเก็บเอกสารนี้ไว้เพื่อใช้ยืนยันการรับเครื่อง", 14, y);

    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
    const fileName = `repair-order-${id}.pdf`;

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=\"${fileName}\"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}