import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(req: Request, context: any) {
  try {
    const id = context.params.id

    const client = await clientPromise
    const db = client.db()

    const order = await db.collection("orders").findOne({
      _id: new ObjectId(id),
    })

    if (!order) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(order)

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    )
  }
}