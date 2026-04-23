import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

// helper
function normalizeStatus(status: any) {
  if (!status) return "quote"

  const clean = String(status).trim().toLowerCase()
  const allowed = ["quote", "repairing", "waiting_parts", "done"]

  if (!allowed.includes(clean)) {
    throw new Error("Invalid status: " + clean)
  }

  return clean
}

function normalizeItems(items: any): string[] {
  if (!Array.isArray(items)) return []
  return items.map((i) => String(i).trim()).filter(Boolean)
}

// ✅ GET by id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db()

    const order = await db
      .collection("orders")
      .findOne({ _id: new ObjectId(params.id) })

    if (!order) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}