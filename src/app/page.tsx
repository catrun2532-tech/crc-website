import Link from "next/link";
import Image from "next/image";

// ===================== CONFIG =====================
const BRAND = {
  title: "C.R.C. คอมพิวเตอร์",
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
            <Link href="/order">นัดซ่อม</Link>
            <Link href="/products">สินค้า</Link>
            <a href="#services">บริการ/ราคา</a>
            <a href="#contact">ติดต่อ</a>
            <Link href="/cart">ตะกร้า</Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          {BRAND.title}
        </h1>
        <p className="mt-5 text-lg text-gray-300">{BRAND.tagline}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={BRAND.facebook} className="px-5 py-3 bg-blue-600 rounded-xl">
            Facebook
          </a>
          <a href={BRAND.line} className="px-5 py-3 bg-green-600 rounded-xl">
            LINE
          </a>
          <a href={`tel:${BRAND.phone}`} className="px-5 py-3 bg-pink-600 rounded-xl">
            โทร
          </a>
          <a
            href={BRAND.website}
            target="_blank"
            className="px-5 py-3 bg-zinc-700 rounded-xl"
          >
            Website
          </a>

          {/* เพิ่มจากอีก branch */}
          <Link
            href="/track"
            className="px-5 py-3 bg-yellow-400 text-black rounded-xl"
          >
            🔍 เช็คใบงาน
          </Link>
        </div>
      </section>

      {/* VIDEO */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <video src={VIDEO.src} controls className="w-full rounded-xl" />
      </section>

      {/* GALLERY */}
      <section className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {GALLERY.map((f) => (
          <div key={f} className="relative aspect-square">
            <Image
              src={`/uploads/${f}`}
              alt={f}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        ))}
      </section>

      {/* SERVICES */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        {SERVICES.map((s, i) => (
          <div key={i} className="border p-4 rounded-xl mb-2">
            <div className="flex justify-between">
              <span>{s.name}</span>
              <span>{s.price}</span>
            </div>
          </div>
        ))}
      </section>

      {/* CONTACT */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <a href={`tel:${BRAND.phone}`}>📞 {BRAND.phone}</a>
      </section>
    </main>
  );
}