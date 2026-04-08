import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, phone, brand, sn, detail } = body;

    // ✅ validate
    if (!name || !phone) {
      return NextResponse.json(
        { error: "กรุณากรอกชื่อและเบอร์โทร" },
        { status: 400 }
      );
    }

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

    if (last.length > 0 && last[0].runningCode) {
      const num =
        parseInt(last[0].runningCode.split("-")[1] || "0") + 1;
      runningCode = `CR-${num.toString().padStart(4, "0")}`;
    }

    // ✅ เตรียมข้อมูล
    const newOrder = {
      name: name || "",
      phone: phone || "",
      brand: brand || "",
      sn: sn || "",
      detail: detail || "",
      runningCode,
      createdAt: new Date(),
      date: new Date().toLocaleString("th-TH"),
    };

    // ✅ insert ลง MongoDB
    const result = await db.collection("orders").insertOne(newOrder);

    // ✅ response
    return NextResponse.json({
      success: true,
      id: result.insertedId,
      runningCode,
    });

  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    return NextResponse.json(
      { error: "บันทึกไม่สำเร็จ" },
      { status: 500 }
    );
  }
}