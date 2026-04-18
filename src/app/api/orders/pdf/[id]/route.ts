import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // 🔥 mock data (เดี๋ยวคุณค่อยเอาจาก DB จริง)
  const content = `Order ID: ${id}`;

  // 👉 สร้าง PDF แบบง่าย (text)
  const pdfBuffer = Buffer.from(content);

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=order-${id}.pdf`,
    },
  });
}