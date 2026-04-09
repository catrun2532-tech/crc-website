"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type Order = {
  _id?: string;
  name: string;
  phone: string;
  service: string;
  details: string;
  sn: string;
};

export default function OrderPage() {
  // 🔐 login
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  // 🧾 form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("ลงวินโดว์");
  const [details, setDetails] = useState("");
  const [sn, setSn] = useState("");

  // 💾 data (จาก DB)
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");

  // 🔄 โหลดข้อมูลจาก MongoDB
  const loadOrders = async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // 💾 save (ส่งเข้า DB จริง)
  const saveOrder = async () => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          service,
          details,
          sn,
        }),
      });

      const data = await res.json();
      console.log("saved:", data);

      alert("✅ บันทึกสำเร็จ");

      // reload data
      loadOrders();

      // clear form
      setName("");
      setPhone("");
      setDetails("");
      setSn("");
    } catch (err) {
      console.log(err);
      alert("❌ บันทึกไม่สำเร็จ");
    }
  };

  // 🔐 login
  const handleLogin = () => {
    if (user === "admin" && pass === "1234") setIsAdmin(true);
    else alert("user/pass ผิด");
  };

  // 📄 PDF
  const exportPDF = async () => {
    const element = document.getElementById("pdf-area");
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
    pdf.save("order.pdf");
  };

  // 🔎 search
  const filtered = orders.filter(
    (o) =>
      o.name?.includes(search) ||
      o.phone?.includes(search) ||
      o.sn?.includes(search)
  );

  // 🔒 login page
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
          <button onClick={handleLogin} className="bg-blue-600 px-4 py-2">
            login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl mb-4">ระบบจัดการร้าน</h1>

      {/* 🧾 FORM */}
      <div id="pdf-area" className="bg-zinc-900 p-4 rounded mb-6">
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
          placeholder="Serial Number (SN)"
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

        <textarea
          placeholder="รายละเอียด"
          value={details}
          className="block mb-2 p-2 w-full bg-black"
          onChange={(e) => setDetails(e.target.value)}
        />

        <div className="flex gap-2">
          <button onClick={saveOrder} className="bg-green-600 px-4 py-2">
            💾 บันทึก
          </button>

          <button
            onClick={exportPDF}
            className="bg-yellow-500 px-4 py-2 text-black"
          >
            📄 PDF
          </button>
        </div>
      </div>

      {/* 🔎 SEARCH */}
      <input
        placeholder="ค้นหา ชื่อ / เบอร์ / SN"
        className="mb-4 p-2 w-full bg-zinc-900"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📋 LIST */}
      <div className="space-y-2">
        {filtered.map((o) => (
          <div key={o._id} className="p-3 bg-zinc-800 rounded">
            <div>ชื่อ: {o.name}</div>
            <div>เบอร์: {o.phone}</div>
            <div>SN: {o.sn}</div>
            <div>บริการ: {o.service}</div>
          </div>
        ))}
      </div>

      <Link href="/" className="block mt-6 text-blue-400">
        ← กลับหน้าแรก
      </Link>
    </main>
  );
}