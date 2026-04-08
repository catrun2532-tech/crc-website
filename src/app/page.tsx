export default function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* 🔥 ตัวนี้คือหัวใจ (ห้ามลืมเด็ดขาด) */}
      <div className="max-w-6xl mx-auto w-full px-4">

        {/* HERO */}
        <section className="bg-gradient-to-br from-black to-gray-800 text-white py-20 rounded-b-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            C.R.C. คอมพิวเตอร์
          </h1>

          <p className="text-gray-300 mb-6">
            รับซ่อมโน๊ตบุ๊ค / คอมพิวเตอร์ ครบจบในที่เดียว
          </p>
        </section>

        {/* VIDEO */}
        <section className="py-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            วิดีโอแนะนำร้าน
          </h2>

          <div className="bg-white rounded-2xl shadow p-4">
            <video
              controls
              className="w-full aspect-video rounded-xl"
              src="/video/promo.mp4"
            />
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            บริการของเรา
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow text-center">🔧 ซ่อมคอม</div>
            <div className="bg-white p-6 rounded-xl shadow text-center">💾 อัปเกรด</div>
            <div className="bg-white p-6 rounded-xl shadow text-center">🧠 กู้ข้อมูล</div>
          </div>
        </section>

      </div>
    </div>
  );
}