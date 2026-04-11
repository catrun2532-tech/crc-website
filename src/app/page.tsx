"use client";

import { useState } from "react";
import Link from "next/link";

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
  const [error, setError] = useState("");

  const searchOrder = async () => {
    if (!sn.trim()) {
      setError("กรุณากรอก SN");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/orders/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sn }),
      });

      if (!res.ok) throw new Error("server error");

      const data = await res.json();

      if (!data) {
        setError("ไม่พบข้อมูล");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("❌ เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setLoading(false);
    }
  };

  const renderStatus = (s: string) => {
    switch (s) {
      case "quote":
        return "🟡 เสนอราคา";
      case "repairing":
        return "🔵 กำลังซ่อม";
      case "waiting_parts":
        return "🟠 รออะไหล่";
      case "done":
        return "🟢 ซ่อมเสร็จแล้ว";
      default:
        return "-";
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      
      {/* 🔙 ปุ่มกลับ */}
      <div className="absolute top-5 left-5">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-white"
        >
          ← กลับหน้าหลัก
        </Link>
      </div>

      <div className="bg-zinc-900 p-6 rounded-2xl w-full max-w-md shadow-lg border border-zinc-800">
        <h1 className="text-xl font-bold mb-4 text-center">
          🔍 เช็คสถานะงานซ่อม
        </h1>

        <input
          placeholder="กรอก SN เช่น CRC1234"
          value={sn}
          onChange={(e) => setSn(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchOrder()}
          className="w-full p-3 mb-3 bg-black border border-zinc-700 rounded focus:outline-none focus:border-yellow-400"
        />

        <button
          onClick={searchOrder}
          disabled={loading}
          className="bg-gradient-to-r from-yellow-400 to-red-500 text-black w-full py-2 rounded font-semibold hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "กำลังค้นหา..." : "ค้นหา"}
        </button>

        {/* ❗ error */}
        {error && (
          <div className="mt-3 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* ✅ result */}
        {result && (
          <div className="mt-5 bg-zinc-800 p-4 rounded-xl space-y-2 text-sm border border-zinc-700">
            <div><b>👤 ชื่อลูกค้า:</b> {result.name}</div>
            <div><b>📞 เบอร์:</b> {result.phone}</div>
            <div><b>🔢 SN:</b> {result.sn}</div>
            <div><b>📊 สถานะ:</b> {renderStatus(result.status)}</div>
            <div><b>🛠 บริการ:</b> {result.service}</div>
            <div><b>📝 รายละเอียด:</b> {result.details}</div>
            <div>
              <b>📦 ของที่รับ:</b>{" "}
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