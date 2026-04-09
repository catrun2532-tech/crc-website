import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  service: String,
  details: String,
  sn: String,
});

const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const order = await Order.create(body);

    return Response.json(order);
  } catch (error) {
    console.log(error);
    return new Response("error", { status: 500 });
  }
}