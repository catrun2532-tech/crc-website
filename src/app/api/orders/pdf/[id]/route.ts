import PDFDocument from "pdfkit"
import { NextResponse } from "next/server"
import connectDB from "../../../../../lib/connectDB"
import Order from "../../../../../models/order"

export const runtime = "nodejs" // 🔥 สำคัญ

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const order = await Order.findById(params.id)

    if (!order) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const doc = new PDFDocument()
    const chunks: any[] = []

    doc.on("data", (chunk) => chunks.push(chunk))

    doc.fontSize(16).text(`ลูกค้า: ${order.name || "-"}`)
    doc.text(`เบอร์: ${order.phone || "-"}`)
    doc.text(`RAM: ${order.ram || "-"}`)
    doc.text(`SSD: ${order.ssd || "-"}`)

    doc.end()

    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      doc.on("end", () => {
        resolve(Buffer.concat(chunks))
      })
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