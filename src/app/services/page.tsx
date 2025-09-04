export default function ServicesPage() {
  const services = [
    { name: "ลงวินโดว์ + โปรแกรมพื้นฐาน", price: "500–800 บาท", detail: "ติดตั้งวินโดว์ล่าสุด + โปรแกรม Office, Zoom ฯลฯ" },
    { name: "อัปเกรด SSD", price: "สอบถามราคา", detail: "เพิ่มความเร็ว เปิดเครื่องไวกว่าเดิม 5–10 เท่า" },
    { name: "ทำความสะอาด + เปลี่ยนซิลิโคน", price: "400–700 บาท", detail: "ลดความร้อน CPU/GPU ทำให้เครื่องเงียบขึ้น" },
    { name: "กู้ข้อมูล/ไฟล์หาย", price: "ประเมินก่อนซ่อม", detail: "กู้คืนไฟล์รูป งานเอกสาร หรือไฟล์งานสำคัญ" },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-4 py-16 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">บริการทั้งหมด</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <div key={i} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">{s.name}</h2>
            <p className="text-gray-400 mt-2">{s.detail}</p>
            <div className="mt-3 text-pink-400 font-bold">{s.price}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
