"use client";

import { useState } from "react";
import Link from "next/link";
import { jsPDF } from "jspdf";

export default function OrderPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("ลงวินโดว์");
  const [details, setDetails] = useState("");

  // ✅ ฟังก์ชันสร้าง PDF
  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    doc.setFont("Helvetica", "normal");

    doc.text("ใบงาน / แจ้งซ่อม", 20, 20);
    doc.text(`ชื่อ: ${name || "-"}`, 20, 40);
    doc.text(`โทร: ${phone || "-"}`, 20, 50);
    doc.text(`บริการ: ${service || "-"}`, 20, 60);

    doc.text("รายละเอียด:", 20, 70);

    const splitDetails = doc.splitTextToSize(details || "-", 170);
    doc.text(splitDetails, 20, 80);

    doc.save(`order-${name || "customer"}.pdf`);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">สั่งงาน / แจ้งซ่อม</h1>
        <p className="mt-2 text-gray-400">
          กรอกข้อมูลแล้วกดบันทึก หรือโทรหาเราได้เลย
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-300">ชื่อ</label>
            <input
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="เช่น สมชาย"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">เบอร์ติดต่อ</label>
            <input
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="เช่น 093-478-3005"
              inputMode="tel"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">บริการ</label>
            <select
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option>ลงวินโดว์</option>
              <option>กู้ข้อมูล</option>
              <option>อัปเกรด SSD/RAM</option>
              <option>ทำความสะอาด/เปลี่ยนซิลิโคน</option>
              <option>ปัญหาอื่นๆ</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">รายละเอียด</label>
            <textarea
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 min-h-[120px]"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="อาการเครื่อง / รุ่น / สิ่งที่ต้องการให้ทำ"
            />
          </div>

          {/* ปุ่มเหลือแค่ โทร + PDF */}
          <div className="flex gap-3 pt-2 flex-wrap">
            <a
              href="tel:0934783005"
              className="bg-pink-600 hover:bg-pink-700 px-5 py-3 rounded-xl"
            >
              โทรหาเรา
            </a>

            <button
              type="button"
              onClick={handleGeneratePDF}
              className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-xl"
            >
              📄 บันทึกใบงาน
            </button>
          </div>
        </div>

        <div className="mt-10">
          <Link href="/" className="text-blue-400 hover:underline">
            ← กลับหน้าแรก
          </Link>
        </div>
      </section>
    </main>
  );
}
