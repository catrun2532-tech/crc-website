import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const client = await clientPromise;
  const db = client.db("your-db-name");

  await db.collection("orders").deleteOne({
    _id: new ObjectId(id),
  });

  return new Response(JSON.stringify({ success: true }));
}