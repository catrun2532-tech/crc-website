"use client";

import { useState } from "react";

export default function TrackPage() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<any>(null);

  const handleSearch = async () => {
    if (!query) return;

    const res = await fetch(`/api/orders/search?q=${query}`);
    const result = await res.json();

    console.log("DATA:", result); // 🔥 เอาไว้ดู

    setData(result);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-6 rounded w-96">
        <h2 className="mb-3">🔍 เช็คสถานะงานซ่อม</h2>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 mb-2 text-black"
          placeholder="กรอก SN / เบอร์ / ชื่อ"
        />

        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 p-2 mb-4"
        >
          ค้นหา
        </button>

        {data && (
          <div className="bg-gray-800 p-4 rounded">
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