"use client";

import Link from "next/link";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// ===================== CONFIG =====================
const BRAND = {
  title: "C.R.C. คอมพิวเตอร์ ",
  tagline:
    "รับซ่อมโน๊ตบุ๊ค/คอมพิวเตอร์ ทุกรุ่นทุกอาการ ลงวินโดว์ กู้ข้อมูล อัปเกรด SSD/RAM",
  facebook: "https://www.facebook.com/catruncpu",
  line: "https://line.me/ti/p/~catruncpu",
  phone: "0960956981",
  website: "https://www.catruncpu.com",
  addressShort: "ค้นหา: catruncpu บนแผนที่",
};

const VIDEO = {
  src: "/video/promo.mp4",
};

const GALLERY = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg"];

const SERVICES = [
  { name: "ลงวินโดว์ + โปรแกรมพื้นฐาน", price: "400–800 บาท" },
  { name: "อัปเกรด SSD (ย้ายข้อมูล)", price: "สอบถามราคา" },
  { name: "ทำความสะอาด + เปลี่ยนซิลิโคน", price: "300–700 บาท" },
  { name: "กู้ข้อมูล/ไฟล์หาย", price: "ประเมินก่อนซ่อม" },
];
// =================================================

// ✅ ฟังก์ชัน export PDF
const exportPDF = async () => {
  const element = document.getElementById("pdf-area");
  if (!element) return;

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const imgWidth = 210;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  pdf.save("crc-website.pdf");
};

export default function Page() {
  return (
    <main id="pdf-area" className="min-h-screen bg-black text-white">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur bg-black/50 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between">
          <div className="font-bold">บริษัทแคทรันซีพียู จำกัด</div>
          <nav className="hidden md:flex gap-6 text-sm text-gray-300">
            <Link href="/order">นัดซ่อม</Link>
            <Link href="/products">สินค้า</Link>
            <a href="#services">บริการ</a>
            <a href="#contact">ติดต่อ</a>
            <Link href="/cart">ตะกร้า</Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold">{BRAND.title}</h1>
        <p className="mt-4 text-gray-300">{BRAND.tagline}</p>

        <div className="mt-6 flex gap-3 flex-wrap">
          <a href={BRAND.facebook} className="bg-blue-600 px-4 py-2 rounded">
            Facebook
          </a>
          <a href={BRAND.line} className="bg-green-600 px-4 py-2 rounded">
            LINE
          </a>
          <a href={`tel:${BRAND.phone}`} className="bg-pink-600 px-4 py-2 rounded">
            โทร
          </a>

          {/* ✅ ปุ่ม PDF */}
          <button
            onClick={exportPDF}
            className="bg-yellow-500 px-4 py-2 rounded text-black"
          >
            📄 บันทึก PDF
          </button>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-zinc-900 px-4 py-10">
        <h2 className="text-2xl mb-4">บริการ</h2>
        {SERVICES.map((s, i) => (
          <div key={i} className="mb-2">
            {s.name} - {s.price}
          </div>
        ))}
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-4 py-10">
        <h2 className="text-2xl mb-4">ติดต่อ</h2>
        <p>โทร: {formatPhone(BRAND.phone)}</p>
      </section>
    </main>
  );
}

// utils
function formatPhone(p: string) {
  const t = p.replace(/\D/g, "");
  if (t.length === 10)
    return `${t.slice(0, 3)}-${t.slice(3, 6)}-${t.slice(6)}`;
  return p;
}