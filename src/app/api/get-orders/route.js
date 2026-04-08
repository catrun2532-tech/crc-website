import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const db = (await clientPromise).db("repair");

  const data = await db
    .collection("orders")
    .find()
    .sort({ _id: -1 }) // 🔥 เอาอันล่าสุดขึ้นบน
    .toArray();

  return NextResponse.json(data);
}