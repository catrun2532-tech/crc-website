export default function HomePage() {
  return (
    <div className="bg-gray-100">

      {/* 🔥 HERO */}
      <section className="bg-gradient-to-br from-black to-gray-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            C.R.C. คอมพิวเตอร์
          </h1>

          <p className="text-gray-300 mb-6">
            รับซ่อมโน๊ตบุ๊ค/คอมพิวเตอร์ ครบจบในที่เดียว ลงวินโดว์ กู้ข้อมูล อัปเกรด SSD/RAM
          </p>

          <div className="flex flex-wrap gap-3">
            <a className="bg-blue-600 px-4 py-2 rounded-full">Facebook</a>
            <a className="bg-green-500 px-4 py-2 rounded-full">LINE</a>
            <a className="bg-pink-500 px-4 py-2 rounded-full">โทร: 096xxxxxxx</a>
            <a className="bg-gray-700 px-4 py-2 rounded-full">เว็บไซต์</a>
          </div>
        </div>
      </section>

      {/* 🎬 VIDEO */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">วิดีโอแนะนำร้าน</h2>

          <div className="bg-white rounded-2xl shadow-md p-4">
            <video
              controls
              className="w-full rounded-xl"
              src="/video/promo.mp4"
            />
          </div>
        </div>
      </section>

      {/* 💻 SERVICES */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">บริการของเรา</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl shadow">
              🔧 ซ่อมคอม / โน๊ตบุ๊ค
            </div>
            <div className="p-6 rounded-xl shadow">
              💾 อัปเกรด SSD / RAM
            </div>
            <div className="p-6 rounded-xl shadow">
              🧠 กู้ข้อมูล / ลงวินโดว์
            </div>
          </div>
        </div>
      </section>

      {/* 📍 CONTACT */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">ติดต่อเรา</h2>

          <div className="bg-white p-6 rounded-xl shadow">
            📞 โทร: 096-xxx-xxxx <br />
            💬 LINE: catruncpu <br />
            🌐 www.catruncpu.com
          </div>
        </div>
      </section>

    </div>
  );
}