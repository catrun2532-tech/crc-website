import PDFDocument from "pdfkit"
import { NextResponse } from "next/server"
import connectDB from "@/lib/connectDB";
import Order from "@/models/Order";

export const runtime = "nodejs" // สำคัญมาก (ใช้ buffer / pdfkit)

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const order = await Order.findById(params.id).lean()

    if (!order) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const doc = new PDFDocument()

    const chunks: Uint8Array[] = []

    doc.on("data", (chunk) => chunks.push(chunk))

    // ====== เนื้อหา PDF ======
    doc.fontSize(18).text("Order Detail", { align: "center" })
    doc.moveDown()

    doc.fontSize(14).text(`ลูกค้า: ${order.name ?? "-"}`)
    doc.text(`เบอร์: ${order.phone ?? "-"}`)
    doc.text(`RAM: ${order.ram ?? "-"}`)
    doc.text(`SSD: ${order.ssd ?? "-"}`)

    doc.end()

    const pdfBuffer: Buffer = await new Promise((resolve, reject) => {
      doc.on("end", () => resolve(Buffer.concat(chunks)))
      doc.on("error", reject)
    })

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=order-${params.id}.pdf`,
      },
    })
  } catch (error: any) {
    console.error("PDF ERROR:", error)

    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    )
  }
}