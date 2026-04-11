import Link from "next/link";
import Image from "next/image";

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

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          {BRAND.title}
        </h1>

        <p className="mt-5 text-gray-300">
          {BRAND.tagline}
        </p>

        {/* 🔥 ปุ่มหลัก */}
        <div className="mt-8 flex flex-wrap gap-3">

          <a href={BRAND.facebook} className="px-5 py-3 rounded-2xl bg-blue-600">
            Facebook: catruncpu
          </a>

          <a href={BRAND.line} className="px-5 py-3 rounded-2xl bg-green-600">
            LINE: catruncpu
          </a>

          <a href={`tel:${BRAND.phone}`} className="px-5 py-3 rounded-2xl bg-pink-600">
            โทร: 0960956981
          </a>

          {/* ✅ เพิ่มปุ่มใบงาน */}
          <Link
            href="/track"
            className="px-5 py-3 rounded-2xl bg-orange-500 font-bold"
          >
            🔍 ใบงาน (ลูกค้า)
          </Link>

        </div>

        {/* ✅ ย้ายปุ่ม www ลงมาข้างล่าง */}
        <div className="mt-4">
          <a
            href={BRAND.website}
            target="_blank"
            className="text-gray-400 underline text-sm hover:text-white"
          >
            {BRAND.website.replace("https://", "")}
          </a>
        </div>

      </section>

    </main>
  );
}