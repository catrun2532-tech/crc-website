// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";

// ===================== CONFIG (แก้ไขค่าตรงนี้ได้เลย) =====================
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
  { name: "ลงวินโดว์ + โปรแกรมพื้นฐาน", price: "500–800 บาท" },
  { name: "อัปเกรด SSD (ย้ายข้อมูล)", price: "สอบถามราคา" },
  { name: "ทำความสะอาด + เปลี่ยนซิลิโคน", price: "400–700 บาท" },
  { name: "กู้ข้อมูล/ไฟล์หาย", price: "ประเมินก่อนซ่อม" },
];
// ========================================================================

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
            <Link href="/order" className="hover:text-white">
              นัดซ่อม
            </Link>
            <Link href="/products" className="hover:text-white">
              สินค้า
            </Link>
            <a href="#services" className="hover:text-white">
              บริการ/ราคา
            </a>
            <a href="#contact" className="hover:text-white">
              ติดต่อ
            </a>
            <Link href="/cart" className="hover:underline">
              ตะกร้า
            </Link>
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
          <p className="mt-5 text-lg text-gray-300 max-w-3xl">{BRAND.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={BRAND.facebook}
              className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 transition"
            >
              Facebook: catruncpu
            </a>
            <a
              href={BRAND.line}
              className="px-5 py-3 rounded-2xl bg-green-600 hover:bg-green-500 transition"
            >
              LINE: catruncpu
            </a>
            <a
              href={`tel:${BRAND.phone}`}
              className="px-5 py-3 rounded-2xl bg-pink-600 hover:bg-pink-500 transition"
            >
              โทร: 0960956981
            </a>

            {/* ปุ่มเช็คงาน */}
            <Link
              href="/track"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-red-500 text-black font-semibold"
            >
              🔍 เช็คใบงาน (ลูกค้า)
            </Link>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section id="video" className="bg-zinc-900">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-semibold mb-4">วิดีโอแนะนำร้าน</h2>
          <div className="w-full aspect-video rounded-2xl border border-zinc-800 overflow-hidden">
            <video
              className="w-full h-full object-cover"
              src={VIDEO.src}
              controls
              playsInline
            />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold">ผลงาน / บรรยากาศร้าน</h2>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {GALLERY.map((f) => (
            <div
              key={f}
              className="relative w-full aspect-square overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
            >
              <Image
                src={`/uploads/${f}`}
                alt={f}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-zinc-900">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-semibold">บริการยอดนิยม & ราคาโดยประมาณ</h2>
          <ul className="mt-6 grid md:grid-cols-2 gap-4">
            {SERVICES.map((s, i) => (
              <li
                key={i}
                className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <div>{s.name}</div>
                  <div className="text-gray-300">{s.price}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold">ติดต่อเรา</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <a href={`tel:${BRAND.phone}`}>📞 โทร {formatPhone(BRAND.phone)}</a>
          <a href={BRAND.line}>💬 LINE</a>
          <a href={BRAND.facebook}>👍 Facebook</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 text-center py-6 text-gray-400">
        © {new Date().getFullYear()} C.R.C.
      </footer>
    </main>
  );
}

function formatPhone(p: string) {
  const t = p.replace(/\D/g, "");
  if (t.length === 10) return `${t.slice(0, 3)}-${t.slice(3, 6)}-${t.slice(6)}`;
  return p;
}