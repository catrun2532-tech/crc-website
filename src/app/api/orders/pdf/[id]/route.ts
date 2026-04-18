import PDFDocument from "pdfkit"
import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb" // ✅ แก้ตรงนี้
import Order from "@/models/Order"

export const runtime = "nodejs"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const order = await Order.findById(params.id).lean() as any

    if (!order) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const doc = new PDFDocument()

    const chunks: Buffer[] = []

    doc.on("data", (chunk: Buffer) => chunks.push(chunk))

    // ===== PDF CONTENT =====
    doc.fontSize(18).text("Order Detail", { align: "center" })
    doc.moveDown()

    doc.fontSize(14).text(`ลูกค้า: ${order.name || "-"}`)
    doc.text(`เบอร์: ${order.phone || "-"}`)
    doc.text(`RAM: ${order.ram || "-"}`)
    doc.text(`SSD: ${order.ssd || "-"}`)

    doc.end()

    const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
      doc.on("end", () => resolve(Buffer.concat(chunks)))
      doc.on("error", reject)
    })

    // ✅ แก้ตรงนี้ (สำคัญ)
    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=order-${params.id}.pdf`,
      },
    })
  } catch (error: any) {
    console.error("PDF ERROR:", error)

    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 }
    )
  }
}