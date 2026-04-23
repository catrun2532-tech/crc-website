import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("repair");

    const data = await db
      .collection("orders")
      .find({})
      .sort({ _id: -1 }) // เอาอันล่าสุดขึ้นบน
      .toArray();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "โหลดข้อมูลไม่สำเร็จ" });
  }
}