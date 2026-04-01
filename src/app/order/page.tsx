"use client";

import { useState } from "react";
import Link from "next/link";
import { thaiFontBase64 } from "@/lib/thaiFont"; // 👈 นำเข้าฟอนต์ที่เตรียมไว้

export default function OrderPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("ลงวินโดว์");
  const [details, setDetails] = useState("");

  const handleGeneratePDF = async () => {
    if (!name.trim() || !phone.trim()) {
      alert("กรุณากรอกชื่อและเบอร์ติดต่อด้วยครับ");
      return;
    }

    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();

      // 1. เพิ่มฟอนต์ไทยลงในระบบของ jsPDF
      doc.addFileToVFS("ThaiFont.ttf", thaiFontBase64);
      doc.addFont("ThaiFont.ttf", "ThaiFont", "normal");
      doc.setFont("ThaiFont");

      // 2. ส่วนหัวใบงาน
      doc.setFontSize(22);
      doc.text("ใบรับงาน / แจ้งซ่อมคอมพิวเตอร์", 105, 20, { align: "center" });
      
      doc.setLineWidth(0.5);
      doc.line(20, 25, 190, 25);

      // 3. ข้อมูลลูกค้าและบริการ
      doc.setFontSize(16);
      doc.text(`ชื่อลูกค้า: ${name}`, 20, 40);
      doc.text(`เบอร์โทรศัพท์: ${phone}`, 20, 50);
      doc.text(`ประเภทบริการ: ${service}`, 20, 60);

      // 4. รายละเอียดอาการ
      doc.text("รายละเอียด / อาการเสีย:", 20, 75);
      doc.setFontSize(14);
      const splitDetails = doc.splitTextToSize(details || "-", 170);
      doc.text(splitDetails, 20, 85);

      // 5. ส่วนท้าย (วันที่และลายเซ็น)
      const now = new Date();
      const dateString = now.toLocaleDateString("th-TH", {
        year: "numeric", month: "long", day: "numeric",
        hour: "2-digit", minute: "2-digit"
      });

      doc.setFontSize(12);
      doc.text(`วันที่รับงาน: ${dateString}`, 20, 150);

      // เส้นเซ็นชื่อ
      doc.line(120, 180, 180, 180);
      doc.text("(................................................)", 125, 187);
      doc.text("ลายเซ็นลูกค้า / ผู้แจ้ง", 135, 195);

      // 6. บันทึกไฟล์
      doc.save(`Repair-Order-${name}.pdf`);

    } catch (error) {
      console.error("PDF Error:", error);
      alert("ไม่สามารถสร้าง PDF ได้ในขณะนี้");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold border-b border-zinc-800 pb-4">แบบฟอร์มรับงาน</h1>
        
        <div className="space-y-4">
          <input 
            className="w-full p-4 bg-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ชื่อลูกค้า"
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            className="w-full p-4 bg-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="เบอร์โทรศัพท์"
            inputMode="tel"
            onChange={(e) => setPhone(e.target.value)}
          />
          <select 
            className="w-full p-4 bg-zinc-900 rounded-xl outline-none"
            onChange={(e) => setService(e.target.value)}
          >
            <option>ลงวินโดว์</option>
            <option>กู้ข้อมูล</option>
            <option>อัปเกรดเครื่อง</option>
          </select>
          <textarea 
            className="w-full p-4 bg-zinc-900 rounded-xl min-h-[120px] outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="อาการเสียโดยละเอียด..."
            onChange={(e) => setDetails(e.target.value)}
          />
          
          <button 
            onClick={handleGeneratePDF}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all"
          >
            ดาวน์โหลดใบรับงาน (PDF)
          </button>
        </div>
      </div>
    </main>
  );
}
