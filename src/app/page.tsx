export default function HomePage() {
  return (
    <div className="w-full text-gray-800">

      {/* 🔥 HERO */}
      <section className="w-full bg-gradient-to-br from-black via-zinc-900 to-gray-800 text-white py-28 relative overflow-hidden">
        
        {/* glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-blue-500/10 blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-wide leading-tight">
            C.R.C. คอมพิวเตอร์
          </h1>

          <p className="text-gray-300 mb-10 text-lg max-w-2xl mx-auto">
            ซ่อมคอม โน๊ตบุ๊ค ครบจบในที่เดียว  
            กู้ข้อมูล • ลงวินโดว์ • อัปเกรด SSD / RAM
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full shadow-lg hover:scale-105 transition">
              Facebook
            </a>
            <a className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full shadow-lg hover:scale-105 transition">
              LINE
            </a>
            <a className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-full shadow-lg hover:scale-105 transition">
              โทร: 096xxxxxxx
            </a>
          </div>

        </div>
      </section>

      {/* 🎬 VIDEO */}
      <section className="w-full py-24 bg-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            วิดีโอแนะนำร้าน
          </h2>

          <div className="bg-white rounded-3xl shadow-2xl p-4 hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition">
            <video
              controls
              className="w-full rounded-2xl"
              src="/video/promo.mp4"
            />
          </div>

        </div>
      </section>

      {/* 💻 SERVICES */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            บริการของเรา
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            {/* card */}
            <div className="group p-8 rounded-3xl bg-gray-50 shadow hover:shadow-2xl transition hover:-translate-y-2 text-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition">🔧</div>
              <h3 className="font-semibold text-xl mb-2">ซ่อมคอม / โน๊ตบุ๊ค</h3>
              <p className="text-gray-500 text-sm">
                วิเคราะห์ปัญหาและซ่อมโดยช่างมืออาชีพ
              </p>
            </div>

            <div className="group p-8 rounded-3xl bg-gray-50 shadow hover:shadow-2xl transition hover:-translate-y-2 text-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition">💾</div>
              <h3 className="font-semibold text-xl mb-2">อัปเกรด SSD / RAM</h3>
              <p className="text-gray-500 text-sm">
                เพิ่มสปีดเครื่องให้เร็วแรงเหมือนใหม่
              </p>
            </div>

            <div className="group p-8 rounded-3xl bg-gray-50 shadow hover:shadow-2xl transition hover:-translate-y-2 text-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition">🧠</div>
              <h3 className="font-semibold text-xl mb-2">กู้ข้อมูล / ลงวินโดว์</h3>
              <p className="text-gray-500 text-sm">
                กู้ข้อมูลสำคัญ พร้อมติดตั้งระบบใหม่
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 📍 CONTACT */}
      <section className="w-full py-24 bg-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            ติดต่อเรา
          </h2>

          <div className="bg-white p-10 rounded-3xl shadow-xl space-y-3 hover:shadow-2xl transition">
            <p className="text-lg">📞 โทร: 096-xxx-xxxx</p>
            <p className="text-lg">💬 LINE: catruncpu</p>
            <p className="text-lg">🌐 www.catruncpu.com</p>
          </div>

        </div>
      </section>

    </div>
  );
}