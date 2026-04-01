"use client";

import { useState } from "react";
// นำเข้า Link สำหรับปุ่มย้อนกลับ (ถ้ามี)
// import Link from "next/link"; 
import { thaiFontBase64 } from "@/lib/thaiFont"; // ✅ นำเข้ารหัสฟอนต์ไทยที่เตรียมไว้

export default function OrderPage() {
  // สร้าง State สำหรับเก็บข้อมูลที่ลูกค้ากรอก
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("ลงวินโดว์"); // ค่าเริ่มต้นเป็น "ลงวินโดว์"
  const [details, setDetails] = useState("");

  // ฟังก์ชันสำหรับสร้างและดาวน์โหลดไฟล์ PDF (ใช้ async/await)
  const handleGeneratePDF = async () => {
    // ตรวจสอบความถูกต้องเบื้องต้น (ชื่อและเบอร์โทรศัพท์ห้ามว่าง)
    if (!name.trim() || !phone.trim()) {
      alert("กรุณากรอกชื่อและเบอร์ติดต่อด้วยครับ");
      return;
    }

    try {
      // 1. นำเข้า library jsPDF แบบ dynamic เพื่อลดขนาดไฟล์เริ่มต้นของหน้าเว็บ
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF(); // สร้าง Instance ใหม่ของ jsPDF

      // 2. นำฟอนต์ไทย (Base64) ไปเพิ่มใน File System จำลอง (VFS) ของ jsPDF
      // ตั้งชื่อไฟล์ในระบบจำลองว่า "ThaiFont.ttf" และอ้างอิงรหัส Base64
      doc.addFileToVFS("ThaiFont.ttf", thaiFontBase64);
      
      // 3. เพิ่มฟอนต์ลงในตัวแปร Font ของ jsPDF เพื่อใช้ในการพิมพ์
      // ใช้ชื่อว่า "ThaiFont" สำหรับอ้างอิงในโค้ด (เช่น 'ThaiFont', 'normal')
      doc.addFont("ThaiFont.ttf", "ThaiFont", "normal");
      
      // 4. สั่งให้ jsPDF ใช้ฟอนต์ "ThaiFont" นี้สำหรับการพิมพ์ข้อความต่อจากนี้
      doc.setFont("ThaiFont");

      // --- เริ่มออกแบบหน้าตา PDF ---

      // 5. ส่วนหัวใบงาน
      doc.setFontSize(22); // ตั้งขนาดฟอนต์หัวข้อ
      doc.text("ใบรับงาน / แจ้งซ่อมคอมพิวเตอร์", 105, 20, { align: "center" }); // พิมพ์ข้อความจัดกึ่งกลาง
      
      // วาดเส้นใต้หัวข้อ (หนา 0.5)
      doc.setLineWidth(0.5);
      doc.line(20, 25, 190, 25); // ลากเส้นจาก x=20 ถึง x=190 ที่ y=25

      // 6. ส่วนข้อมูลลูกค้าและประเภทบริการ
      doc.setFontSize(16); // ตั้งขนาดฟอนต์ข้อมูลทั่วไป
      doc.text(`ชื่อลูกค้า: ${name}`, 20, 40); // พิมพ์ชื่อที่ y=40
      doc.text(`เบอร์โทรศัพท์: ${phone}`, 20, 50); // พิมพ์เบอร์โทรศัพท์ที่ y=50
      doc.text(`ประเภทบริการ: ${service}`, 20, 60); // พิมพ์ประเภทบริการที่ y=60

      // 7. ส่วนรายละเอียด/อาการเสีย
      doc.text("รายละเอียด / อาการเสีย:", 20, 75); // พิมพ์หัวข้อรายละเอียดที่ y=75
      doc.setFontSize(14); // ตั้งขนาดฟอนต์สำหรับรายละเอียด
      // ใช้ splitTextToSize เพื่อตัดคำภาษาไทยให้พอดีกับความกว้าง 170
      const splitDetails = doc.splitTextToSize(details || "-", 170); // ถ้าไม่มีรายละเอียด ใส่ '-'
      doc.text(splitDetails, 20, 85); // พิมพ์รายละเอียดที่ตัดคำแล้ว เริ่มที่ y=85

      // 8. ส่วนท้าย (วันที่รับงานและช่องลายเซ็น)
      const now = new Date(); // ดึงวันที่และเวลาปัจจุบัน
      // แปลงวันที่เป็นรูปแบบภาษาไทย
      const dateString = now.toLocaleDateString("th-TH", {
        year: "numeric", month: "long", day: "numeric",
        hour: "2-digit", minute: "2-digit"
      });

      doc.setFontSize(12); // ตั้งขนาดฟอนต์ส่วนท้าย
      doc.text(`วันที่รับงาน: ${dateString}`, 20, 150); // พิมพ์วันที่รับงานที่ y=150

      // ช่องลายเซ็นลูกค้า
      doc.line(120, 180, 180, 180); // ลากเส้นสำหรับเซ็นชื่อ
      doc.text("(................................................)", 125, 187); // พิมพ์วงเล็บลายเซ็น
      doc.text("ลายเซ็นลูกค้า / ผู้แจ้ง", 135, 195); // พิมพ์ข้อความคำอธิบาย

      // --- บันทึกไฟล์ ---

      // 9. สั่งให้ jsPDF บันทึกไฟล์ออกมาเป็น PDF ลงเครื่องลูกค้า
      // ตั้งชื่อไฟล์ตามชื่อลูกค้าที่กรอกมา เช่น Repair-Order-สมชาย.pdf
      doc.save(`Repair-Order-${name}.pdf`);

    } catch (error) {
      // หากเกิดข้อผิดพลาดในการสร้าง PDF ให้แสดง Log และ Error Message
      console.error("PDF Error:", error);
      alert("ไม่สามารถสร้าง PDF ได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง");
    }
  };

  // --- ส่วนการแสดงผลหน้าเว็บ (UI) ---
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-xl mx-auto space-y-6">
        {/* หัวข้อหน้าเว็บ */}
        <h1 className="text-2xl font-bold border-b border-zinc-800 pb-4">แบบฟอร์มรับงาน / แจ้งซ่อม</h1>
        
        <div className="space-y-4">
          {/* ช่องกรอกชื่อลูกค้า */}
          <input 
            type="text"
            className="w-full p-4 bg-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ชื่อลูกค้า"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* ช่องกรอกเบอร์โทรศัพท์ */}
          <input 
            type="tel"
            className="w-full p-4 bg-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="เบอร์โทรศัพท์ (เช่น 08x-xxxxxxx)"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {/* ช่องเลือกประเภทบริการ */}
          <select 
            className="w-full p-4 bg-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-zinc-400"
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option>ลงวินโดว์</option>
            <option>กู้ข้อมูล</option>
            <option>อัปเกรดเครื่อง</option>
            <option>ซ่อมเมนบอร์ด</option>
            <option>อื่นๆ</option>
          </select>
          {/* ช่องกรอกรายละเอียด/อาการเสีย */}
          <textarea 
            className="w-full p-4 bg-zinc-900 rounded-xl min-h-[120px] outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="อาการเสียโดยละเอียด / สิ่งที่ต้องการให้ทำ..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          
          {/* ปุ่มสำหรับกดสร้าง PDF */}
          <button 
            onClick={handleGeneratePDF}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all text-lg"
          >
            ดาวน์โหลดใบรับงาน (PDF)
          </button>
          
          {/* ปุ่มย้อนกลับหน้าแรก (Optional) */}
          {/* <Link href="/" className="block text-center text-zinc-500 hover:text-white pt-4">
            ← กลับหน้าแรก
          </Link>
          */}
        </div>
      </div>
    </main>
  );
}
