import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

//
// ✅ GET
//
export async function GET(req: Request, context: any) {
  try {
    const client = await clientPromise
    const db = client.db()

    const id = context.params.id

    const order = await db
      .collection("orders")
      .findOne({ _id: new ObjectId(id) })

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

//
// ✅ PUT
//
export async function PUT(req: Request, context: any) {
  try {
    const client = await clientPromise
    const db = client.db()

    const id = context.params.id
    const body = await req.json()

    const result = await db.collection("orders").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: body },
      { returnDocument: "after" }
    )

    if (!result || !result.value) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(result.value)

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    )
  }
}

//
// ✅ DELETE
//
export async function DELETE(req: Request, context: any) {
  try {
    const client = await clientPromise
    const db = client.db()

    const id = context.params.id

    const result = await db.collection("orders").deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: "Deleted" })

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    )
  }
}