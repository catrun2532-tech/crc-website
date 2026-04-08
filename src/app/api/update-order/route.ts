import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const { id, status } = await req.json();

  const db = (await clientPromise).db("repair");

  await db.collection("orders").updateOne(
    { _id: new ObjectId(id) },
    { $set: { status } }
  );

  return NextResponse.json({ success: true });
}