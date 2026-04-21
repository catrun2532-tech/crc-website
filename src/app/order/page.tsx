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

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("ลงวินโดว์");
  const [details, setDetails] = useState("");
  const [sn, setSn] = useState("");
  const [status, setStatus] = useState("quote");

  const [items, setItems] = useState<string[]>([]);
  const [otherItem, setOtherItem] = useState("");
  const [ram, setRam] = useState("");
  const [ssd, setSsd] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loadOrders = async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const saveOrder = async () => {
    if (!name || !phone) {
      alert("กรอกชื่อ + เบอร์ก่อน");
      return;
    }

    setLoading(true);

    try {
      const url = editingId ? `/api/orders/${editingId}` : "/api/orders";
      const method = editingId ? "PUT" : "POST";

      const finalItems = items.map((item) => {
        if (item === "RAM" && ram) return `RAM (${ram}GB)`;
        if (item === "SSD" && ssd) return `SSD (${ssd}GB)`;
        return item;
      });

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          service,
          details,
          sn,
          status,
          items: finalItems,
          otherItem,
          ram: ram ? parseInt(ram) : null,
          ssd: ssd ? parseInt(ssd) : null,
        }),
      });

      if (!res.ok) throw new Error();

      alert(editingId ? "✅ อัปเดตแล้ว" : "✅ บันทึกสำเร็จ");

      resetForm();
      loadOrders();
    } catch {
      alert("❌ error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setDetails("");
    setSn("");
    setStatus("quote");
    setItems([]);
    setOtherItem("");
    setRam("");
    setSsd("");
    setEditingId(null);
  };

  const editOrder = (o: Order) => {
    setName(o.name);
    setPhone(o.phone);
    setService(o.service);
    setDetails(o.details);
    setSn(o.sn);
    setStatus(o.status || "quote");

    setItems(
      (o.items || []).map((i) => {
        if (i.includes("RAM")) return "RAM";
        if (i.includes("SSD")) return "SSD";
        return i;
      })
    );

    setOtherItem(o.otherItem || "");
    setRam(o.ram?.toString() || "");
    setSsd(o.ssd?.toString() || "");
    setEditingId(o._id || null);
  };

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

      <div className="bg-zinc-900 p-4 rounded mb-6">
        <input placeholder="ชื่อ" value={name} className="block mb-2 p-2 w-full bg-black" onChange={(e) => setName(e.target.value)} />
        <input placeholder="เบอร์" value={phone} className="block mb-2 p-2 w-full bg-black" onChange={(e) => setPhone(e.target.value)} />
        <input placeholder="SN" value={sn} className="block mb-2 p-2 w-full bg-black" onChange={(e) => setSn(e.target.value)} />

        <textarea placeholder="รายละเอียด" value={details} className="block mb-2 p-2 w-full bg-black" onChange={(e) => setDetails(e.target.value)} />

        <button onClick={saveOrder} className="bg-green-600 px-4 py-2">
          {editingId ? "💾 อัปเดต" : "💾 บันทึก"}
        </button>
      </div>

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

          <div className="mt-3 flex gap-2">
            <button onClick={() => editOrder(o)} className="bg-blue-500 px-3 py-1 rounded">
              ✏️ แก้ไข
            </button>

            <a
              href={`/api/orders/pdf/${o._id?.toString()}`}
              target="_blank"
              className="bg-yellow-500 px-3 py-1 rounded text-black"
            >
              📄 PDF
            </a>
          </div>
        </div>
      ))}

      <Link href="/" className="text-blue-400 block mt-4">
        กลับหน้าแรก
      </Link>
    </main>
  );
}