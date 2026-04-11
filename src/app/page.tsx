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
  addressShort: "ค้นหา: catruncpu บนแผนที่",
};

const VIDEO = {
  src: "/video/promo.mp4",
};

const GALLERY: string[] = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg"];

const SERVICES = [
  { name: "ลงวินโดว์ + โปรแกรมพื้นฐาน", price: "400–800 บาท" },
  { name: "อัปเกรด SSD (ย้ายข้อมูล)", price: "สอบถามราคา" },
  { name: "ทำความสะอาด + เปลี่ยนซิลิโคน", price: "300–700 บาท" },
  { name: "กู้ข้อมูล/ไฟล์หาย", price: "ประเมินก่อนซ่อม" },
];
// ==================================================

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

        {/* ✅ ปุ่ม (ลบ www แล้ว) */}
        <div className="mt-8 flex flex-wrap gap-3">

          <a
            href={BRAND.facebook}
            className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500"
          >
            Facebook: catruncpu
          </a>

          <a
            href={BRAND.line}
            className="px-5 py-3 rounded-2xl bg-green-600 hover:bg-green-500"
          >
            LINE: catruncpu
          </a>

          <a
            href={`tel:${BRAND.phone}`}
            className="px-5 py-3 rounded-2xl bg-pink-600 hover:bg-pink-500"
          >
            โทร: 0960956981
          </a>

          <Link
            href="/track"
            className="px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 font-bold"
          >
            🔍 เช็คใบงาน (ลูกค้า)
          </Link>

        </div>
      </section>

      {/* VIDEO */}
      <section className="bg-zinc-900">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="aspect-video rounded overflow-hidden">
            <video className="w-full h-full" src={VIDEO.src} controls />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-gray-500 py-6">
        © {new Date().getFullYear()} C.R.C. คอมพิวเตอร์
      </footer>
    </main>
  );
}