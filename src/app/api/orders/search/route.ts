import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // ใช้ตัวเดิมของคุณ

export async function POST(req: Request) {
  try {
    const { keyword } = await req.json();

    if (!keyword) {
      return NextResponse.json({ error: "no keyword" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("repairdb"); // ⚠️ เปลี่ยนชื่อ db ให้ตรงของคุณ

    const order = await db.collection("orders").findOne({
      $or: [
        { sn: keyword },
        { phone: keyword },
      ],
    });

    if (!order) {
      return NextResponse.json(null);
    }

    return NextResponse.json(order);
  } catch (err) {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}