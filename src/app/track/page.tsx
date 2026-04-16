"use client";

import { useState } from "react";

export default function TrackPage() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    console.log("CLICKED");

    if (!query) {
      alert("กรอกข้อมูลก่อน");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(`/api/orders/search?q=${query}`);

      // 🔥 ถ้า status ไม่ใช่ 200
      if (!res.ok) {
        const errText = await res.text();
        console.log("API ERROR:", errText);
        throw new Error("ไม่พบข้อมูล");
      }

      const result = await res.json();

      console.log("RESULT:", result);

      setData(result);
    } catch (err) {
      console.error(err);
      setError("ไม่พบข้อมูล หรือระบบมีปัญหา");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-6 rounded w-96 shadow-lg">
        <h2 className="mb-3 text-lg font-bold">
          🔍 เช็คสถานะงานซ่อม
        </h2>

        {/* INPUT */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 mb-2 rounded bg-white text-black"
          placeholder="กรอก SN / เบอร์ / ชื่อ"
        />

        {/* BUTTON */}
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 hover:bg-blue-600 p-2 mb-4 rounded"
        >
          {loading ? "กำลังค้นหา..." : "ค้นหา"}
        </button>

        {/* ERROR */}
        {error && (
          <div className="bg-red-500 p-2 rounded mb-2 text-sm">
            {error}
          </div>
        )}

        {/* RESULT */}
        {data && (
          <div className="bg-gray-800 p-4 rounded text-sm space-y-1">
            <p>ชื่อ: {data.name || "-"}</p>
            <p>เบอร์: {data.phone || "-"}</p>
            <p>SN: {data.sn || "-"}</p>

            <p>
              สถานะ:{" "}
              {data.status === "pending"
                ? "รับงาน"
                : data.status === "repairing"
                ? "กำลังซ่อม"
                : data.status === "waiting_parts"
                ? "รออะไหล่"
                : data.status === "done"
                ? "เสร็จแล้ว"
                : data.status}
            </p>

            <p>บริการ: {data.service || "-"}</p>
            <p>รายละเอียด: {data.details || "-"}</p>
          </div>
        )}
      </div>
    </div>
  );
}