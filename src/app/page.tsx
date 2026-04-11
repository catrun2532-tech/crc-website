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

const VIDEO = {
  src: "/video/promo.mp4",
};

const GALLERY: string[] = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg"];

const SERVICES: { name: string; price: string; desc?: string }[] = [
  { name: "ลงวินโดว์ + โปรแกรมพื้นฐาน", price: "400–800 บาท" },
  { name: "อัปเกรด SSD (ย้ายข้อมูล)", price: "สอบถามราคา" },
  { name: "ทำความสะอาด + เปลี่ยนซิลิโคน", price: "300–700 บาท" },
  { name: "กู้ข้อมูล/ไฟล์หาย", price: "ประเมินก่อนซ่อม" },
];
// ==================================================

export const metadata = {
  title: BRAND.title,
  description: BRAND.tagline,
};

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur bg-black/50 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-bold tracking-wide">บริษัทแคทรันซีพียู จำกัด</div>
          <nav className="hidden md:flex gap-6 text-sm text-gray-300">
            <Link href="/order" className="hover:text-white">นัดซ่อม</Link>
            <Link href="/products" className="hover:text-white">สินค้า</Link>
            <a href="#services" className="hover:text-white">บริการ/ราคา</a>
            <a href="#contact" className="hover:text-white">ติดต่อ</a>
            <Link href="/cart" className="hover:underline">ตะกร้า</Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="about" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),rgba(0,0,0,0))]" />
        <div className="max-w-6xl mx-auto px-4 py-20 relative">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            {BRAND.title}
          </h1>
          <p className="mt-5 text-lg text-gray-300 max-w-3xl">
            {BRAND.tagline}
          </p>

          {/* 🔥 ปุ่ม */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={BRAND.facebook} className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 transition">
              Facebook: catruncpu
            </a>

            <a href={BRAND.line} className="px-5 py-3 rounded-2xl bg-green-600 hover:bg-green-500 transition">
              LINE: catruncpu
            </a>

            <a href={`tel:${BRAND.phone}`} className="px-5 py-3 rounded-2xl bg-pink-600 hover:bg-pink-500 transition">
              โทร: 0960956981
            </a>

            {/* ✅ ปุ่มใหม่ */}
            <Link
              href="/track"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black font-bold shadow-lg hover:scale-105 hover:shadow-xl transition duration-200"
            >
              🔍 เช็คใบงาน (ลูกค้า)
            </Link>

            <a
              href={BRAND.website}
              className="px-5 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              {BRAND.website.replace("https://", "")}
            </a>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className="bg-zinc-900">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-semibold mb-4">วิดีโอแนะนำร้าน</h2>
          <div className="w-full aspect-video rounded-2xl border border-zinc-800 overflow-hidden">
            <video className="w-full h-full object-cover" src={VIDEO.src} controls />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold">ผลงาน</h2>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {GALLERY.map((f) => (
            <div key={f} className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-800">
              <Image src={`/uploads/${f}`} alt={f} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-zinc-900">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-semibold">บริการ</h2>
          <ul className="mt-6 grid md:grid-cols-2 gap-4">
            {SERVICES.map((s, i) => (
              <li key={i} className="p-5 border border-zinc-800 rounded-2xl">
                <div className="flex justify-between">
                  <span>{s.name}</span>
                  <span>{s.price}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold">ติดต่อ</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <a className="p-4 border rounded-2xl" href={`tel:${BRAND.phone}`}>
            📞 {BRAND.phone}
          </a>
          <a className="p-4 border rounded-2xl" href={BRAND.line}>
            💬 LINE
          </a>
          <a className="p-4 border rounded-2xl" href={BRAND.facebook}>
            👍 Facebook
          </a>
        </div>
      </section>

      <footer className="border-t border-zinc-900 text-center py-6 text-gray-400">
        © {new Date().getFullYear()} C.R.C. คอมพิวเตอร์
      </footer>
    </main>
  );
}