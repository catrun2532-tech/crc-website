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

const SERVICES = [
  { name: "ลงวินโดว์ + โปรแกรมพื้นฐาน", price: "400–800 บาท" },
  { name: "อัปเกรด SSD (ย้ายข้อมูล)", price: "สอบถามราคา" },
  { name: "ทำความสะอาด + เปลี่ยนซิลิโคน", price: "300–700 บาท" },
  { name: "กู้ข้อมูล/ไฟล์หาย", price: "ประเมินก่อนซ่อม" },
];
// =================================================

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur bg-black/50 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-bold">บริษัทแคทรันซีพียู จำกัด</div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          {BRAND.title}
        </h1>
        <p className="mt-5 text-gray-300">{BRAND.tagline}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={BRAND.facebook}
            className="px-5 py-3 rounded-2xl bg-blue-600"
          >
            Facebook: catruncpu
          </a>

          <a
            href={BRAND.line}
            className="px-5 py-3 rounded-2xl bg-green-600"
          >
            LINE: catruncpu
          </a>

          <a
            href={`tel:${BRAND.phone}`}
            className="px-5 py-3 rounded-2xl bg-pink-600"
          >
            โทร: 0960956981
          </a>

          {/* ✅ ปุ่มใหม่แทนของเดิม */}
          <Link
            href="/check-job"
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-red-500 text-black font-semibold"
          >
            🔍 เช็คใบงาน (ลูกค้า)
          </Link>
        </div>
      </section>

      {/* VIDEO */}
      <section className="bg-zinc-900">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl mb-4">วิดีโอแนะนำร้าน</h2>
          <div className="aspect-video rounded-2xl overflow-hidden">
            <video
              className="w-full h-full object-cover"
              src={VIDEO.src}
              controls
            />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl">ผลงาน / บรรยากาศร้าน</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {GALLERY.map((f) => (
            <div key={f} className="aspect-square relative">
              <Image
                src={`/uploads/${f}`}
                alt={f}
                fill
                className="object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-zinc-900">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl">บริการ & ราคา</h2>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {SERVICES.map((s, i) => (
              <div key={i} className="p-4 bg-zinc-800 rounded-xl">
                <div className="flex justify-between">
                  <span>{s.name}</span>
                  <span>{s.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl">ติดต่อ</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <a href={`tel:${BRAND.phone}`} className="p-4 bg-zinc-800 rounded-xl">
            โทร {BRAND.phone}
          </a>
          <a href={BRAND.line} className="p-4 bg-zinc-800 rounded-xl">
            LINE
          </a>
          <a href={BRAND.facebook} className="p-4 bg-zinc-800 rounded-xl">
            Facebook
          </a>
        </div>
      </section>

      {/* MAP */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="text-2xl">แผนที่</h2>
        <div className="aspect-video mt-4">
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps?q=catruncpu&output=embed"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-gray-400 py-6 border-t border-zinc-800">
        © {new Date().getFullYear()} C.R.C. คอมพิวเตอร์
      </footer>
    </main>
  );
}