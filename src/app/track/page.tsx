import Link from "next/link";

export default function TrackPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center relative">
      
      {/* 🔙 ปุ่มกลับหน้าหลัก */}
      <div className="absolute top-4 left-4">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-white transition"
        >
          ← กลับหน้าหลัก
        </Link>
      </div>

      {/* กล่องเช็คสถานะ */}
      <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md shadow-xl border border-zinc-800">
        <h1 className="text-2xl font-bold mb-4 text-center">
          🔍 เช็คสถานะงานซ่อม
        </h1>

        <input
          type="text"
          placeholder="กรอก SN เช่น CRC1234"
          className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 mb-4 outline-none focus:border-yellow-400"
        />

        <button className="w-full p-3 rounded-xl bg-gradient-to-r from-yellow-400 to-red-500 text-black font-semibold hover:opacity-90 transition">
          ค้นหา
        </button>

        <p className="text-xs text-gray-500 mt-4 text-center">
          * ใส่รหัสงานหรือเบอร์โทรเพื่อตรวจสอบสถานะ
        </p>
      </div>
    </main>
  );
}