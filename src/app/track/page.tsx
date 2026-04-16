"use client";

import { useState } from "react";

export default function TrackPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any>(null);

  const statusMap: any = {
    pending: "รับเครื่องแล้ว",
    checking: "กำลังตรวจสอบ",
    quote: "เสนอราคา",
    repairing: "กำลังซ่อม",
    waiting_parts: "รออะไหล่",
    done: "เสร็จแล้ว",
  };

  const handleSearch = async () => {
    try {
      const res = await fetch(`/api/orders/search?query=${search}`);
      const result = await res.json();
      setData(result);
    } catch (err) {
      alert("error fetch");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-md shadow-lg">

        <h2 className="text-xl font-bold mb-4 text-center">
          🔍 เช็คสถานะงานซ่อม
        </h2>

        <input
          className="w-full p-3 mb-3 rounded bg-zinc-800 text-white text-lg outline-none"
          placeholder="กรอก SN / เบอร์ / ชื่อ"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded text-lg font-semibold"
        >
          ค้นหา
        </button>

        {data && (
          <div className="mt-5 bg-zinc-800 p-4 rounded-lg text-base space-y-2">

            <p><span className="text-gray-400">ชื่อ:</span> {data.name || "-"}</p>
            <p><span className="text-gray-400">เบอร์:</span> {data.phone || "-"}</p>
            <p><span className="text-gray-400">SN:</span> {data.sn}</p>

            <p>
              <span className="text-gray-400">สถานะ:</span>{" "}
              <span className="font-semibold text-blue-400">
                {statusMap[data.status] || data.status}
              </span>
            </p>

            <p><span className="text-gray-400">บริการ:</span> {data.service || "-"}</p>
            <p><span className="text-gray-400">รายละเอียด:</span> {data.details || "-"}</p>

            <hr className="my-2 border-zinc-700" />

            <p><span className="text-gray-400">RAM:</span> {data.ram || "-"}</p>
            <p><span className="text-gray-400">SSD:</span> {data.ssd || "-"}</p>

          </div>
        )}
      </div>
    </div>
  );
}