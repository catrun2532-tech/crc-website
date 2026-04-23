import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Order from "@/models/Order"

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

    return NextResponse.json(order)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}