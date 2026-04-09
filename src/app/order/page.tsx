"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import jsPDF from "jspdf";
import { THSarabunBase64 } from "@/lib/font"; // ✅ เพิ่มตรงนี้

type Order = {
  _id?: string;
  name: string;
  phone: string;
  service: string;
  details: string;
  sn: string;
  status: string;
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
  const [status, setStatus] = useState("pending");

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
      const url = editingId
        ? `/api/orders/${editingId}`
        : "/api/orders";

      const method = editingId ? "PUT" : "POST";

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
    setStatus("pending");
    setEditingId(null);
  };

  const editOrder = (o: Order) => {
    setName(o.name);
    setPhone(o.phone);
    setService(o.service);
    setDetails(o.details);
    setSn(o.sn);
    setStatus(o.status || "pending");
    setEditingId(o._id || null);
  };

  // ✅ PDF รองรับภาษาไทย
  const downloadPDF = (o: Order) => {
    const pdf = new jsPDF();

    // ✅ ใส่ฟ้อนต์ไทย
    pdf.addFileToVFS("THSarabun.ttf", THSarabunBase64);
    pdf.addFont("THSarabun.ttf", "THSarabun", "normal");
    pdf.setFont("THSarabun");

    pdf.setFontSize(16);
    pdf.text("ORDER", 20, 20);

    pdf.setFontSize(12);
    pdf.text(`ชื่อ: ${o.name}`, 20, 30);
    pdf.text(`เบอร์: ${o.phone}`, 20, 40);
    pdf.text(`SN: ${o.sn}`, 20, 50);
    pdf.text(`บริการ: ${o.service}`, 20, 60);
    pdf.text(`รายละเอียด: ${o.details}`, 20, 70);
    pdf.text(`สถานะ: ${renderStatus(o.status)}`, 20, 80);

    pdf.save(`order-${o.name}.pdf`);
  };

  const renderStatus = (s: string) => {
    switch (s) {
      case "pending":
        return "รอซ่อม";
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
          <input
            placeholder="user"
            className="block mb-2 p-2 bg-black"
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            placeholder="pass"
            className="block mb-2 p-2 bg-black"
            onChange={(e) => setPass(e.target.value)}
          />
          <button
            onClick={() => {
              if (user === "admin" && pass === "1234")
                setIsAdmin(true);
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
        <input
          placeholder="ชื่อ"
          value={name}
          className="block mb-2 p-2 w-full bg-black"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="เบอร์"
          value={phone}
          className="block mb-2 p-2 w-full bg-black"
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          placeholder="SN"
          value={sn}
          className="block mb-2 p-2 w-full bg-black"
          onChange={(e) => setSn(e.target.value)}
        />

        <select
          value={service}
          className="block mb-2 p-2 w-full bg-black"
          onChange={(e) => setService(e.target.value)}
        >
          <option>ลงวินโดว์</option>
          <option>กู้ข้อมูล</option>
          <option>อัปเกรด</option>
        </select>

        <select
          value={status}
          className="block mb-2 p-2 w-full bg-black"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">รอซ่อม</option>
          <option value="repairing">กำลังซ่อม</option>
          <option value="waiting_parts">รออะไหล่</option>
          <option value="done">ซ่อมเสร็จ</option>
        </select>

        <textarea
          placeholder="รายละเอียด"
          value={details}
          className="block mb-2 p-2 w-full bg-black"
          onChange={(e) => setDetails(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            onClick={saveOrder}
            className="bg-green-600 px-4 py-2"
          >
            {editingId ? "💾 อัปเดต" : "💾 บันทึก"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="bg-gray-500 px-4 py-2"
            >
              ยกเลิก
            </button>
          )}
        </div>
      </div>

      <input
        placeholder="ค้นหา"
        className="mb-4 p-2 w-full bg-zinc-900"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="space-y-2">
        {filtered.map((o) => (
          <div key={o._id} className="p-3 bg-zinc-800 rounded">
            <div>ชื่อ: {o.name}</div>
            <div>เบอร์: {o.phone}</div>
            <div>SN: {o.sn}</div>
            <div>สถานะ: {renderStatus(o.status)}</div>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => editOrder(o)}
                className="bg-blue-600 px-2 py-1"
              >
                ✏️ แก้ไข
              </button>

              <button
                onClick={() => downloadPDF(o)}
                className="bg-yellow-500 px-2 py-1 text-black"
              >
                📄 PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      <Link href="/" className="block mt-6 text-blue-400">
        ← กลับหน้าแรก
      </Link>
    </main>
  );
}