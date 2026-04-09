"use client";

import { useState } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function OrderPage() {
  // 🔐 admin login
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  // form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("ลงวินโดว์");
  const [details, setDetails] = useState("");

  // 🔐 ตรวจสอบ admin
  const handleLogin = () => {
    if (user === "admin" && pass === "1234") {
      setIsAdmin(true);
    } else {
      alert("user หรือ password ไม่ถูกต้อง");
    }
  };

  // 📄 export PDF
  const exportPDF = async () => {
    const element = document.getElementById("pdf-area");
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("order.pdf");
  };

  // 🔒 ถ้ายังไม่ login
  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-sm">
          <h2 className="text-xl mb-4">Admin Login</h2>

          <input
            className="w-full mb-3 p-2 rounded bg-black border border-zinc-700"
            placeholder="username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            className="w-full mb-3 p-2 rounded bg-black border border-zinc-700"
            placeholder="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 py-2 rounded"
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">ใบงาน / แจ้งซ่อม</h1>

        {/* 📄 ส่วนที่ export */}
        <div id="pdf-area" className="mt-6 space-y-4">
          <div>
            <label>ชื่อ</label>
            <input
              className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label>เบอร์</label>
            <input
              className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label>บริการ</label>
            <select
              className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option>ลงวินโดว์</option>
              <option>กู้ข้อมูล</option>
              <option>อัปเกรด SSD/RAM</option>
              <option>ทำความสะอาด</option>
              <option>อื่นๆ</option>
            </select>
          </div>

          <div>
            <label>รายละเอียด</label>
            <textarea
              className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
        </div>

        {/* ❌ ลบ LINE + โทรออกแล้ว */}

        {/* ✅ ปุ่ม PDF */}
        <button
          onClick={exportPDF}
          className="mt-6 bg-yellow-500 text-black px-5 py-3 rounded"
        >
          📄 บันทึกใบงาน PDF
        </button>

        <div className="mt-10">
          <Link href="/" className="text-blue-400">
            ← กลับหน้าแรก
          </Link>
        </div>
      </section>
    </main>
  );
}