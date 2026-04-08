<<<<<<< HEAD
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
=======
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    // ✅ รับข้อมูลจาก frontend
    const body = await req.json();

    // ✅ validate เบื้องต้น
    const { name, phone, brand, sn, detail } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "กรุณากรอกชื่อและเบอร์โทร" },
        { status: 400 }
      );
    }

    // ✅ connect database
    const client = await clientPromise;
    const db = client.db("repair");

    // ✅ เตรียมข้อมูลก่อนบันทึก
    const newOrder = {
      name: name || "",
      phone: phone || "",
      brand: brand || "",
      sn: sn || "",
      detail: detail || "",
      createdAt: new Date(),
    };

    // ✅ insert ลง MongoDB
    const result = await db.collection("orders").insertOne(newOrder);

    // ✅ response กลับ frontend
    return NextResponse.json({
      success: true,
      id: result.insertedId,
    });

  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    return NextResponse.json(
      { error: "บันทึกไม่สำเร็จ" },
      { status: 500 }
    );
>>>>>>> 7bc84aa (fix tailwind config)
  }
}