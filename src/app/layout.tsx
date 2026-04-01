import "./globals.css";
import type { Metadata } from "next";
import MusicPlayer from "../components/MusicPlayer";

export const metadata: Metadata = {
  title: "บริษัท แคทรันซีพียู",
  description: "รับซ่อมคอม โน้ตบุ๊ค อัปเกรด ลงวินโดว์",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="bg-black text-white">

        {/* 🔥 HEADER */}
        <header className="border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            
            {/* โลโก้ชื่อบริษัท */}
            <a
              href="/"
              className="text-lg font-bold text-yellow-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]"
            >
              บริษัท แคทรันซีพียู
            </a>

            {/* เมนู */}
            <nav className="flex gap-4 text-sm">
              <a href="/" className="hover:text-yellow-400">หน้าแรก</a>
              <a href="/products" className="hover:text-yellow-400">สินค้า</a>
              <a href="/cart" className="hover:text-yellow-400">ตะกร้า</a>
              <a href="/work-orders" className="hover:text-yellow-400">ใบงาน</a>
            </nav>
          </div>
        </header>

        {/* เนื้อหา */}
        <main>{children}</main>

        {/* 🔊 ปุ่มเพลง */}
        <MusicPlayer />

        {/* 🔻 FOOTER */}
        <footer className="border-t border-zinc-800 mt-10">
          <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} บริษัท แคทรันซีพียู | บริการจริงใจ 💻
          </div>
        </footer>

      </body>
    </html>
  );
}
