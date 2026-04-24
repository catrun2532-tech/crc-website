import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    // ตรวจสอบ id
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    // เชื่อมต่อ DB
    const client = await clientPromise;
    const db = client.db();

    // ค้นหา order
    const order = await db
      .collection("orders")
      .findOne({ _id: new ObjectId(id) });

    // ไม่เจอข้อมูล
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    // ส่งข้อมูล
    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}