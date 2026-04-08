export default function HomePage() {
  return (
    <div className="bg-gray-100 text-gray-800">

      {/* 🔥 HERO */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-wide">
            C.R.C. คอมพิวเตอร์
          </h1>

          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
            รับซ่อมโน๊ตบุ๊ค / คอมพิวเตอร์ ครบจบในที่เดียว 
            ลงวินโดว์ กู้ข้อมูล อัปเกรด SSD/RAM
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-full shadow">
              Facebook
            </a>
            <a className="bg-green-500 hover:bg-green-600 transition px-5 py-2 rounded-full shadow">
              LINE
            </a>
            <a className="bg-pink-500 hover:bg-pink-600 transition px-5 py-2 rounded-full shadow">
              โทร: 096xxxxxxx
            </a>
            <a className="bg-gray-700 hover:bg-gray-800 transition px-5 py-2 rounded-full shadow">
              เว็บไซต์
            </a>
          </div>

        </div>
      </section>

      {/* 🎬 VIDEO */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            วิดีโอแนะนำร้าน
          </h2>

          <div className="bg-white rounded-2xl shadow-xl p-4">
            <video
              controls
              className="w-full rounded-xl"
              src="/video/promo.mp4"
            />
          </div>
        </div>
      </section>

      {/* 💻 SERVICES */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center">
            บริการของเรา
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="p-8 rounded-2xl shadow-md hover:shadow-xl transition bg-gray-50 text-center">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="font-semibold text-lg mb-2">ซ่อมคอม / โน๊ตบุ๊ค</h3>
              <p className="text-gray-500 text-sm">
                ตรวจเช็คและซ่อมแซมโดยช่างมืออาชีพ
              </p>
            </div>

            <div className="p-8 rounded-2xl shadow-md hover:shadow-xl transition bg-gray-50 text-center">
              <div className="text-4xl mb-4">💾</div>
              <h3 className="font-semibold text-lg mb-2">อัปเกรด SSD / RAM</h3>
              <p className="text-gray-500 text-sm">
                เพิ่มความเร็วเครื่องให้ลื่นเหมือนใหม่
              </p>
            </div>

            <div className="p-8 rounded-2xl shadow-md hover:shadow-xl transition bg-gray-50 text-center">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="font-semibold text-lg mb-2">กู้ข้อมูล / ลงวินโดว์</h3>
              <p className="text-gray-500 text-sm">
                กู้ข้อมูลสำคัญและติดตั้งระบบใหม่
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 📍 CONTACT */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">ติดต่อเรา</h2>

          <div className="bg-white p-8 rounded-2xl shadow-lg space-y-2">
            <p>📞 โทร: 096-xxx-xxxx</p>
            <p>💬 LINE: catruncpu</p>
            <p>🌐 www.catruncpu.com</p>
          </div>
        </div>
      </section>

    </div>
  );
}