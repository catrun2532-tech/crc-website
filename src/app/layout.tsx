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
      <body className="bg-zinc-950 text-white antialiased">

        {/* 🔥 HEADER */}
        <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            
            {/* โลโก้ */}
            <a
              href="/"
              className="text-xl font-bold text-yellow-400 tracking-wide"
            >
              แคทรันซีพียู
            </a>

            {/* เมนู */}
            <nav className="flex gap-6 text-sm font-medium">
              <a href="/" className="hover:text-yellow-400 transition">หน้าแรก</a>
              <a href="/products" className="hover:text-yellow-400 transition">สินค้า</a>
              <a href="/cart" className="hover:text-yellow-400 transition">ตะกร้า</a>
              <a href="/work-orders" className="hover:text-yellow-400 transition">ใบงาน</a>
            </nav>
          </div>
        </header>

        {/* 🔳 MAIN (เพิ่ม container + spacing) */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>

        {/* 🔊 ปุ่มเพลง */}
        <MusicPlayer />

        {/* 🔻 FOOTER */}
        <footer className="border-t border-zinc-800 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} บริษัท แคทรันซีพียู  
            <div className="mt-2 text-xs text-zinc-500">
              บริการซ่อมคอม | โน้ตบุ๊ค | อัปเกรด | ลงวินโดว์
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}