import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export const dynamic = "force-dynamic"

// ✅ helper: validate status
function normalizeStatus(status: any) {
  if (!status) return "quote"

  const clean = String(status).trim().toLowerCase()
  const allowed = ["quote", "repairing", "waiting_parts", "done"]

  if (!allowed.includes(clean)) {
    throw new Error("Invalid status: " + clean)
  }

  return clean
}

// ✅ helper: clean items
function normalizeItems(items: any): string[] {
  if (!Array.isArray(items)) return []
  return items.map((i) => String(i).trim()).filter(Boolean)
}

// ✅ GET by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // 🔥 กัน id พัง
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db()

    const order = await db
      .collection("orders")
      .findOne({ _id: new ObjectId(id) })

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      order,
    })
  } catch (error: any) {
    console.error("❌ GET ORDER BY ID ERROR:", error)

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    )
  }
}