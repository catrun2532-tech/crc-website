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
  addressShort: "ค้นหา: catruncpu บนแผนที่", // ข้อความใต้แผนที่
};

const VIDEO = {
  src: "/video/promo.mp4", // วางไฟล์ที่ public/video/promo.mp4
};

const GALLERY: string[] = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg"]; // ใส่เฉพาะชื่อไฟล์ที่อยู่ใน public/uploads/

const SERVICES: { name: string; price: string; desc?: string }[] = [
  { name: "ลงวินโดว์ + โปรแกรมพื้นฐาน", price: "400–800 บาท" },
  { name: "อัปเกรด SSD (ย้ายข้อมูล)", price: "สอบถามราคา" },
  { name: "ทำความสะอาด + เปลี่ยนซิลิโคน", price: "300–700 บาท" },
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
            {/* ใช้ Link สำหรับเพจภายใน */}
            <Link href="/order" className="hover:text-white">
              นัดซ่อม
            </Link>
            <Link href="/products" className="hover:text-white">
              สินค้า
            </Link>
            {/* ลิงก์ภายในหน้า (#) ใช้ a ได้ */}
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
            {/* เว็บไซต์ภายนอกใช้ a ได้ */}
           <Link
  href="/track"
  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-red-500 text-black font-semibold"
>
  🔍 เช็คใบงาน (ลูกค้า)
</Link>
          </div>
        </div>
      </section>

      {/* VIDEO 16:9 */}
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
          <p className="mt-2 text-sm text-gray-400">
            เปลี่ยนไฟล์ได้เองที่ <code>/public/video/promo.mp4</code>
          </p>
        </div>
      </section>

      {/* GALLERY 1:1 */}
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
                sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                className="object-cover"
                priority={false}
              />
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-gray-400">
          วางรูปใน <code>/public/uploads/</code> แล้วแก้ชื่อไฟล์ในตัวแปร{" "}
          <code>GALLERY</code> ด้านบน
        </p>
      </section>

      {/* SERVICES & PRICES */}
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
                  <div className="text-base md:text-lg font-medium">{s.name}</div>
                  <div className="text-sm md:text-base text-gray-300">{s.price}</div>
                </div>
                {s.desc && <p className="text-sm text-gray-400 mt-2">{s.desc}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold">ติดต่อเรา</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <a
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 hover:bg-zinc-800 transition"
            href={`tel:${BRAND.phone}`}
          >
            📞 โทร {formatPhone(BRAND.phone)}
          </a>
          <a
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 hover:bg-zinc-800 transition"
            href={BRAND.line}
          >
            💬 LINE: catruncpu
          </a>
          <a
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 hover:bg-zinc-800 transition"
            href={BRAND.facebook}
          >
            👍 Facebook: catruncpu
          </a>
        </div>
      </section>

      {/* MAP */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <h2 className="text-2xl font-semibold">แผนที่ร้าน</h2>
        <div className="mt-4 aspect-video rounded-2xl overflow-hidden border border-zinc-800">
          <iframe
            className="w-full h-full"
            loading="lazy"
            src="https://www.google.com/maps?q=catruncpu&output=embed"
          />
        </div>
        <p className="mt-2 text-sm text-gray-400">{BRAND.addressShort}</p>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-400 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} C.R.C. คอมพิวเตอร์ — บริการจริงใจ บังแม็กจัดให้
          </div>
          <div className="text-gray-500">ปรับเนื้อหาได้ที่ส่วน CONFIG ด้านบนของไฟล์</div>
        </div>
      </footer>
    </main>
  );
}

// utils เล็กๆ: ฟอร์แมตเบอร์โทร 093-xxx-xxxx
function formatPhone(p: string) {
  const t = p.replace(/\D/g, "");
  if (t.length === 10) return `${t.slice(0, 3)}-${t.slice(3, 6)}-${t.slice(6)}`;
  return p;
}
