"use client";

import { useState } from "react";

export default function TrackPage() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    console.log("CLICKED"); // ✅ เช็คว่าปุ่มทำงานไหม

    if (!query) return alert("กรอกข้อมูลก่อน");

    setLoading(true);

    try {
      const res = await fetch(`/api/orders/search?q=${query}`);
      const result = await res.json();

      console.log("RESULT:", result); // ✅ สำคัญมาก

      setData(result);
    } catch (err) {
      console.error(err);
      alert("error fetch");
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

        {/* RESULT */}
        {data && (
          <div className="bg-gray-800 p-4 rounded text-sm">
            <p>ชื่อ: {data.name || "-"}</p>
            <p>เบอร์: {data.phone || "-"}</p>
            <p>SN: {data.sn || "-"}</p>
            <p>สถานะ: {data.status || "-"}</p>
            <p>บริการ: {data.service || "-"}</p>
            <p>รายละเอียด: {data.details || "-"}</p>
          </div>
        )}
      </div>
    </div>
  );
}