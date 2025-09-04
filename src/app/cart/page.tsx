"use client";

import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  img: string;   // ใส่รูปไว้ใน /public/uploads
};

const PRODUCTS: Product[] = [
  { id: "ssd-512",  name: "SSD 512GB (SATA/ NVMe)", price: 1290, img: "/uploads/ssd512.jpg" },
  { id: "ssd-1tb",  name: "SSD 1TB (NVMe)",         price: 2190, img: "/uploads/ssd1tb.jpg" },
  { id: "ram-8",    name: "RAM 8GB DDR4",           price: 590,  img: "/uploads/ram8.jpg" },
  { id: "ram-16",   name: "RAM 16GB DDR4",          price: 1090, img: "/uploads/ram16.jpg" },
  { id: "cleaning", name: "ทำความสะอาด + เปลี่ยนซิลิโคน", price: 600,  img: "/uploads/clean.jpg" },
  { id: "win",      name: "ลงวินโดว์ + โปรแกรมพื้นฐาน",  price: 700,  img: "/uploads/windows.jpg" },
];

type CartItem = { id: string; qty: number };

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("cart") || "[]"); }
  catch { return []; }
}
function saveCart(items: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(items));
}

export default function ProductsPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => { setCart(loadCart()); }, []);
  const countInCart = cart.reduce((n, i) => n + i.qty, 0);

  function addToCart(id: string) {
    setCart(prev => {
      const next = [...prev];
      const found = next.find(i => i.id === id);
      if (found) found.qty += 1;
      else next.push({ id, qty: 1 });
      saveCart(next);
      return next;
    });
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <a href="/" className="text-lg">← กลับหน้าแรก</a>
        <a href="/cart" className="relative bg-blue-600 px-4 py-2 rounded-xl">
          ตะกร้า ({countInCart})
        </a>
      </header>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">เลือกอุปกรณ์/บริการ</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {PRODUCTS.map(p => (
            <div key={p.id} className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
              <img src={p.img} alt={p.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-gray-300 mt-1">{p.price.toLocaleString()} บาท</p>
                <button
                  onClick={() => addToCart(p.id)}
                  className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 py-2 rounded-xl"
                >
                  หยิบใส่ตะกร้า
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-400 mt-6">
          *รูปควรอยู่ใน <code>/public/uploads/</code> และอ้างด้วย <code>/uploads/ชื่อไฟล์.jpg</code>
        </p>
      </section>
    </main>
  );
}
