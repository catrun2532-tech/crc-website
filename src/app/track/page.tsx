"use client";

import { useState } from "react";

type Order = {
  name: string;
  phone: string;
  service: string;
  details: string;
  sn: string;
  status: string;
  items?: string[];
  otherItem?: string;
};

export default function TrackPage() {
  const [sn, setSn] = useState("");
  const [result, setResult] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  const searchOrder = async () => {
    if (!sn) return alert("กรอก SN");

    setLoading(true);

    try {
      const res = await fetch("/api/orders/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sn }),
      });

      const data = await res.json();

      console.log("🔥 API RESULT:", data); // 👈 สำคัญ เอาไว้ debug

      // ✅ รองรับทั้งแบบ { success, order } และ object ตรง ๆ
      const order = data.order || data;

      if (!order || !order.sn) {
        alert("ไม่พบข้อมูล");
        setResult(null);
      } else {
        setResult(order);
      }
    } catch (err) {
      console.error(err);
      alert("❌ error");
    } finally {
      setLoading(false);
    }
  };

  const renderStatus = (s: string) => {
    switch (s) {
      case "quote":
        return "เสนอราคา";
      case "repairing":
        return "กำลังซ่อม";
      case "waiting_parts":
        return "รออะไหล่";
      case "done":
        return "ซ่อมเสร็จ";
      case "pending":
        return "รับงานแล้ว";
      default:
        return s || "-";
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-zinc-900 p-6 rounded w-full max-w-md">
        <h1 className="text-xl mb-4">🔍 เช็คสถานะงานซ่อม</h1>

        <input
          placeholder="กรอก SN"
          value={sn}
          onChange={(e) => setSn(e.target.value)}
          className="w-full p-2 mb-3 bg-black"
        />

        <button
          onClick={searchOrder}
          className="bg-blue-600 w-full py-2"
        >
          {loading ? "กำลังค้นหา..." : "ค้นหา"}
        </button>

        {result && (
          <div className="mt-4 bg-zinc-800 p-3 rounded space-y-1">
            <div>ชื่อ: {result.name || "-"}</div>
            <div>เบอร์: {result.phone || "-"}</div>
            <div>SN: {result.sn}</div>
            <div>สถานะ: {renderStatus(result.status)}</div>
            <div>บริการ: {result.service || "-"}</div>
            <div>รายละเอียด: {result.details || "-"}</div>
            <div>
              ของที่รับ:{" "}
              {[...(result.items || []), result.otherItem || ""]
                .filter(Boolean)
                .join(", ") || "-"}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}