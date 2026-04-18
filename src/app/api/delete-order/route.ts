import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function DELETE(req: Request) {
  const client = await clientPromise;
  const db = client.db("your-db-name");

  // ทำ logic ลบ

  return NextResponse.json({ success: true });
}