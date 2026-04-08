import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("repair");

    // 🔥 สร้าง running number
    const last = await db
      .collection("orders")
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    let runningCode = "CR-0001";

    if (last.length > 0) {
      const num = parseInt(last[0].runningCode.split("-")[1]) + 1;
      runningCode = `CR-${num.toString().padStart(4, "0")}`;
    }

    const newOrder = {
      ...body,
      runningCode,
      date: new Date().toLocaleString("th-TH"),
    };

    await db.collection("orders").insertOne(newOrder);

    return NextResponse.json({ success: true, runningCode });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false });
  }
}