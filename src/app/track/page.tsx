"use client";

import { useState } from "react";

export default function TrackPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const statusMap: any = {
    pending: "รับเครื่องแล้ว",
    quote: "เสนอราคา",
    repairing: "กำลังซ่อม",
    waiting_parts: "รออะไหล่",
    done: "เสร็จแล้ว",
  };

  const handleSearch = async () => {
    if (!search) {
      alert("กรุณากรอกข้อมูล");
      return;
    }

    try {
      setLoading(true);
      setData(null);

      const res = await fetch(`/api/orders/search?q=${search}`);
      const result = await res.json();

      console.log("RESULT:", result);

      if (!res.ok || !result) {
        alert("ไม่พบข้อมูล");
        return;
      }

      setData(result);
    } catch (err) {
      console.error(err);
      alert("error fetch");
    } finally {
      setLoading(false);
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
          {loading ? "กำลังค้นหา..." : "ค้นหา"}
        </button>

        {data && (
          <div className="mt-5 bg-zinc-800 p-4 rounded-lg text-base space-y-2">

            <p>ชื่อ: {data?.name || "-"}</p>
            <p>เบอร์: {data?.phone || "-"}</p>
            <p>SN: {data?.sn || "-"}</p>

            <p>
              สถานะ:{" "}
              <span className="text-blue-400 font-semibold">
                {statusMap[data?.status] || data?.status}
              </span>
            </p>

            <p>บริการ: {data?.service || "-"}</p>
            <p>รายละเอียด: {data?.details || "-"}</p>

            <hr className="border-zinc-700" />

            {/* 🔥 RAM / SSD */}
            <p>RAM: {data?.ram ? `${data.ram} GB` : "-"}</p>
            <p>SSD: {data?.ssd ? `${data.ssd} GB` : "-"}</p>

            {/* 🔥 เพิ่มตรงนี้ */}
            <p>
              อุปกรณ์ที่นำมา:{" "}
              {[
                ...(data?.items || []),
                data?.otherItem || "",
              ]
                .filter(Boolean)
                .join(", ") || "-"}
            </p>

          </div>
        )}
      </div>
    </div>
  );
}