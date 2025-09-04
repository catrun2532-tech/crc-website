"use client";

import { useState } from "react";

export default function OrderPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("ลงวินโดว์");
  const [details, setDetails] = useState("");

  const lineText = encodeURIComponent(
    `สวัสดีครับ บังแม็ก\nชื่อ: ${name}\nโทร: ${phone}\nบริการ: ${service}\nรายละเอียด: ${details}`
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">สั่งงาน / แจ้งซ่อม</h1>
        <p className="mt-2 text-gray-400">
          กรอกข้อมูลเบื้องต้นแล้วกดปุ่มด้านล่างเพื่อทัก LINE หรือโทรหาเรา
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-300">ชื่อ</label>
            <input
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="เช่น สมชาย"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">เบอร์ติดต่อ</label>
            <input
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="เช่น 093-478-3005"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">บริการ</label>
            <select
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option>ลงวินโดว์</option>
              <option>กู้ข้อมูล</option>
              <option>อัปเกรด SSD/RAM</option>
              <option>ทำความสะอาด/เปลี่ยนซิลิโคน</option>
              <option>ปัญหาอื่นๆ</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">รายละเอียด</label>
            <textarea
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 min-h-[120px]"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="อาการเครื่อง / รุ่น / สิ่งที่ต้องการให้ทำ"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <a
              href={`https://line.me/ti/p/~catruncpu?text=${lineText}`}
              className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl"
            >
              ทัก LINE ส่งรายละเอียด
            </a>
            <a
              href="tel:0934783005"
              className="bg-pink-600 hover:bg-pink-700 px-5 py-3 rounded-xl"
            >
              โทรหาเรา
            </a>
          </div>

          <p className="text-xs text-gray-500">
            *ถ้าปุ่ม LINE ไม่ขึ้น ให้คัดลอกข้อความเองแล้วส่งหาไลน์ @catruncpu
          </p>
        </div>

        <div className="mt-10">
          <a href="/" className="text-blue-400 hover:underline">← กลับหน้าแรก</a>
        </div>
      </section>
    </main>
  );
}
