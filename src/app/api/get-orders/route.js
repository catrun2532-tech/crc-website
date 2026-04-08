import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
<<<<<<< HEAD
  const db = (await clientPromise).db("repair");

  const data = await db
    .collection("orders")
    .find()
    .sort({ _id: -1 }) // 🔥 เอาอันล่าสุดขึ้นบน
    .toArray();

  return NextResponse.json(data);
=======
  try {
    const client = await clientPromise;
    const db = client.db("repair");

    const orders = await db
      .collection("orders")
      .find({})
      .sort({ _id: -1 })
      .toArray();

    return NextResponse.json(orders);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "โหลดข้อมูลไม่สำเร็จ" });
  }
>>>>>>> 7bc84aa (fix tailwind config)
}