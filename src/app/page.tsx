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

      if (!data) {
        alert("ไม่พบใบงาน");
        setResult(null);
      } else {
        setResult(data);
      }
    } catch {
      alert("❌ เกิดข้อผิดพลาด");
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
      default:
        return "-";
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-zinc-900 p-6 rounded w-full max-w-md">

        <h1 className="text-xl mb-4 text-center">
          🔍 เช็คสถานะงานซ่อม
        </h1>

        {/* input */}
        <input
          placeholder="กรอก SN เช่น CRC001"
          value={sn}
          onChange={(e) => setSn(e.target.value)}
          className="w-full p-2 mb-3 bg-black border border-gray-700"
        />

        {/* ปุ่ม */}
        <button
          onClick={searchOrder}
          className="bg-blue-600 w-full py-2 rounded"
        >
          {loading ? "กำลังค้นหา..." : "ค้นหา"}
        </button>

        {/* แสดงผล */}
        {result && (
          <div className="mt-4 bg-zinc-800 p-4 rounded space-y-2">

            <div><b>ชื่อ:</b> {result.name}</div>
            <div><b>เบอร์:</b> {result.phone}</div>
            <div><b>SN:</b> {result.sn}</div>
            <div><b>สถานะ:</b> {renderStatus(result.status)}</div>
            <div><b>บริการ:</b> {result.service}</div>
            <div><b>รายละเอียด:</b> {result.details}</div>

            <div>
              <b>สิ่งที่รับ:</b>{" "}
              {[...(result.items || []), result.otherItem || ""]
                .filter(Boolean)
                .join(", ")}
            </div>

          </div>
        )}
      </div>
    </main>
  );
}