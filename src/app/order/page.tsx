"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

export default function OrderPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [details, setDetails] = useState("");

  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    // หัวเอกสาร
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(16);
    doc.text("ใบงาน / ใบรับซ่อม", 20, 20);

    // เนื้อหา
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);

    doc.text(`ชื่อ: ${name || "-"}`, 20, 40);
    doc.text(`เบอร์: ${phone || "-"}`, 20, 50);
    doc.text(`บริการ: ${service || "-"}`, 20, 60);

    // รายละเอียด (ตัดบรรทัด)
    const splitDetails = doc.splitTextToSize(details || "-", 170);
    doc.text("รายละเอียด:", 20, 70);
    doc.text(splitDetails, 20, 80);

    // วันที่
    const today = new Date().toLocaleString();
    doc.text(`วันที่: ${today}`, 20, 120);

    // บันทึกไฟล์
    doc.save(`order-${name || "customer"}.pdf`);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl mb-4">สร้างใบงาน</h1>

      <div className="flex flex-col gap-3 max-w-md">
        <input
          className="p-2 text-black"
          placeholder="ชื่อ"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="p-2 text-black"
          placeholder="เบอร์โทร"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="p-2 text-black"
          placeholder="บริการ"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />

        <textarea
          className="p-2 text-black"
          placeholder="รายละเอียดงาน"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        <button
          onClick={handleGeneratePDF}
          className="bg-blue-500 p-2 rounded"
        >
          บันทึกเป็น PDF
        </button>
      </div>
    </main>
  );
}
