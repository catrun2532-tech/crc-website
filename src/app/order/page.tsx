"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Order = {
  _id?: string;
  name: string;
  phone: string;
  service: string;
  details: string;
  sn: string;
  status: string;
  items?: string[];
  otherItem?: string;
  ram?: number;
  ssd?: number;
};

export default function OrderPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");

  const loadOrders = async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const renderStatus = (s: string) => {
    switch (s) {
      case "quote": return "เสนอราคา";
      case "repairing": return "กำลังซ่อม";
      case "waiting_parts": return "รออะไหล่";
      case "done": return "ซ่อมเสร็จ";
      default: return "-";
    }
  };

  const filtered = orders.filter(
    (o) =>
      o.name?.includes(search) ||
      o.phone?.includes(search) ||
      o.sn?.includes(search)
  );

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="p-6 bg-zinc-900 rounded">
          <input placeholder="user" className="block mb-2 p-2 bg-black" onChange={(e) => setUser(e.target.value)} />
          <input type="password" placeholder="pass" className="block mb-2 p-2 bg-black" onChange={(e) => setPass(e.target.value)} />
          <button
            onClick={() => {
              if (user === "admin" && pass === "admin040632") setIsAdmin(true);
              else alert("ผิด");
            }}
            className="bg-blue-600 px-4 py-2"
          >
            login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl mb-4">ระบบจัดการร้าน</h1>

      <input
        placeholder="🔍 ค้นหา"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 w-full bg-black border"
      />

      {filtered.map((o) => (
        <div key={o._id} className="bg-zinc-800 p-3 mb-3 rounded">
          <div>ชื่อ: {o.name}</div>
          <div>เบอร์: {o.phone}</div>
          <div>SN: {o.sn}</div>
          <div>สถานะ: {renderStatus(o.status)}</div>

          {o.ram && <div>RAM: {o.ram} GB</div>}
          {o.ssd && <div>SSD: {o.ssd} GB</div>}

          <div className="mt-1 text-sm text-gray-300">
            {[...(o.items || []), o.otherItem || ""]
              .filter(Boolean)
              .join(", ")}
          </div>

          <div className="mt-3 flex gap-2">
            {/* 🔥 ปุ่ม PDF ใหม่ (ใช้ได้แน่นอน) */}
            <button
              onClick={() => {
                if (!o._id) {
                  alert("ไม่มี ID");
                  return;
                }

                window.open(`/api/orders/${o._id}?pdf=true`, "_blank");
              }}
              className="bg-yellow-500 px-3 py-1 rounded text-black"
            >
              📄 PDF
            </button>
          </div>
        </div>
      ))}

      <Link href="/" className="text-blue-400 block mt-4">
        กลับหน้าแรก
      </Link>
    </main>
  );
}