"use client";

import { useState, useEffect } from "react";
<<<<<<< HEAD
import html2pdf from "html2pdf.js";
import { FaTools, FaUser, FaSignOutAlt, FaFilePdf } from "react-icons/fa";

export default function OrderPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState("");

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    brand: "",
    sn: "",
    detail: "",
    price: "",
    status: "รอซ่อม",
  });

  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const handleLogin = () => {
    if (user === "admin" && pass === "crcpu1234") {
      setRole("admin");
      setIsLogin(true);
    } else if (user === "user" && pass === "1234") {
      setRole("user");
      setIsLogin(true);
    } else {
      alert("❌ user หรือ password ผิด");
    }
  };

  const logout = () => {
    setIsLogin(false);
    setUser("");
    setPass("");
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/get-orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("โหลดข้อมูลไม่ได้", err);
    }
  };

  useEffect(() => {
    if (role === "admin") fetchOrders();
  }, [role]);

  const handleSubmit = async () => {
    if (!form.name || !form.phone) {
      alert("กรอกข้อมูลให้ครบ");
      return;
    }

    try {
      await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // 🔥 สำคัญมาก
        },
        body: JSON.stringify(form),
      });

      alert("✅ บันทึกสำเร็จ");

      setForm({
        name: "",
        phone: "",
        brand: "",
        sn: "",
        detail: "",
        price: "",
        status: "รอซ่อม",
      });

      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const generatePDF = (o: any) => {
    const element = document.createElement("div");

    element.innerHTML = `
      <div style="padding:30px;font-family:sans-serif">
        <h2 style="text-align:center">📄 ใบงานซ่อม</h2>
        <hr/>
        <p><b>${o.runningCode || "-"}</b></p>
        <p>${o.date || "-"}</p>
        <p>${o.name}</p>
        <p>${o.phone}</p>
        <p>${o.brand}</p>
        <p>${o.sn}</p>
        <p>${o.status}</p>
        <p>${o.price}</p>
        <p>${o.detail}</p>
      </div>
    `;

    html2pdf().from(element).save(`${o.runningCode || "order"}.pdf`);
  };

  if (!isLogin) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginBox}>
          <h2><FaTools /> ระบบแจ้งซ่อม</h2>

          <input placeholder="Username" onChange={(e) => setUser(e.target.value)} style={styles.input} />
          <input type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} style={styles.input} />

          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  }

  const filtered = orders.filter((o) =>
    o.name?.toLowerCase().includes(search.toLowerCase()) ||
    o.phone?.includes(search)
  );

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2><FaTools /> Repair System</h2>

        <div>
          <FaUser /> {role}
          <button onClick={logout}><FaSignOutAlt /> Logout</button>
        </div>
      </div>

      <div style={styles.formCard}>
        <h3>➕ เพิ่มใบงาน</h3>

        <input placeholder="ชื่อ" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={styles.input} />
        <input placeholder="เบอร์" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={styles.input} />
        <input placeholder="ยี่ห้อ" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} style={styles.input} />
        <input placeholder="SN" value={form.sn} onChange={(e) => setForm({ ...form, sn: e.target.value })} style={styles.input} />
        <textarea placeholder="รายละเอียด" value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })} style={styles.input} />

        <input placeholder="ราคา" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} style={styles.input} />

        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} style={styles.input}>
          <option>รอซ่อม</option>
          <option>กำลังซ่อม</option>
          <option>เสร็จแล้ว</option>
        </select>

        <button onClick={handleSubmit} style={styles.saveBtn}>
          💾 บันทึก
        </button>
      </div>

      {role === "admin" && (
        <div style={styles.listCard}>
          <h3>📋 รายการ</h3>

          <input placeholder="ค้นหา..." value={search} onChange={(e) => setSearch(e.target.value)} style={styles.input} />

          {filtered.map((o) => (
            <div key={o._id} style={styles.item}>
              <div>
                <b>{o.runningCode}</b>
                <div>{o.name}</div>
                <div>{o.status}</div>
              </div>

              <button onClick={() => generatePDF(o)}>
                <FaFilePdf /> PDF
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles: any = {
  page: { padding: 20, background: "#f1f5f9", minHeight: "100vh" },
  header: { display: "flex", justifyContent: "space-between", marginBottom: 20 },
  formCard: {
    maxWidth: 500,
    margin: "auto",
    background: "#fff",
    padding: 20,
    borderRadius: 16,
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
  },
  listCard: {
    marginTop: 30,
    background: "#fff",
    padding: 20,
    borderRadius: 16,
  },
  input: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
  },
  saveBtn: {
    marginTop: 15,
    padding: 12,
    borderRadius: 10,
    background: "#22c55e",
    color: "#fff",
    border: "none",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
    borderBottom: "1px solid #eee",
    paddingBottom: 10,
  },
  loginPage: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginBox: {
    background: "#fff",
    padding: 30,
    borderRadius: 16,
  },
};
=======
import Link from "next/link";

type Order = {
  _id?: string;
  name: string;
  phone: string;
  service: string;
  details: string;
  sn: string;
  status: string;
  items?: string[];
  otherItem?: string;
  ram?: number;
  ssd?: number;
};

export default function OrderPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("ลงวินโดว์");
  const [details, setDetails] = useState("");
  const [sn, setSn] = useState("");
  const [status, setStatus] = useState("quote");

  const [items, setItems] = useState<string[]>([]);
  const [otherItem, setOtherItem] = useState("");
  const [ram, setRam] = useState("");
  const [ssd, setSsd] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loadOrders = async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const saveOrder = async () => {
    if (!name || !phone) {
      alert("กรอกชื่อ + เบอร์ก่อน");
      return;
    }

    setLoading(true);

    try {
      const url = editingId ? `/api/orders/${editingId}` : "/api/orders";
      const method = editingId ? "PUT" : "POST";

      const finalItems = items.map((item) => {
        item = item.trim();

        if (item === "RAM" && ram) return `RAM (${ram}GB)`;
        if (item === "SSD" && ssd) return `SSD (${ssd}GB)`;

        return item;
      });

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          service,
          details,
          sn,
          status,
          items: finalItems,
          otherItem,
          ram: ram ? parseInt(ram) : null,
          ssd: ssd ? parseInt(ssd) : null,
        }),
      });

      if (!res.ok) throw new Error();

      alert(editingId ? "✅ อัปเดตแล้ว" : "✅ บันทึกสำเร็จ");

      resetForm();
      loadOrders();
    } catch {
      alert("❌ error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setDetails("");
    setSn("");
    setStatus("quote");
    setItems([]);
    setOtherItem("");
    setRam("");
    setSsd("");
    setEditingId(null);
  };

  const editOrder = (o: Order) => {
    setName(o.name);
    setPhone(o.phone);
    setService(o.service);
    setDetails(o.details);
    setSn(o.sn);
    setStatus(o.status || "quote");

    // 🔥 FIX สำคัญ
    setItems(
      (o.items || []).map((i) => {
        if (i.includes("RAM")) return "RAM";
        if (i.includes("SSD")) return "SSD";
        return i.trim();
      })
    );

    setOtherItem(o.otherItem || "");
    setRam(o.ram?.toString() || "");
    setSsd(o.ssd?.toString() || "");
    setEditingId(o._id || null);
  };

  const renderStatus = (s: string) => {
    switch (s) {
      case "quote": return "เสนอราคา";
      case "repairing": return "กำลังซ่อม";
      case "waiting_parts": return "รออะไหล่";
      case "done": return "ซ่อมเสร็จ";
      default: return "-";
    }
  };

  const filtered = orders.filter(
    (o) =>
      o.name?.includes(search) ||
      o.phone?.includes(search) ||
      o.sn?.includes(search)
  );

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="p-6 bg-zinc-900 rounded">
          <input placeholder="user" className="block mb-2 p-2 bg-black" onChange={(e) => setUser(e.target.value)} />
          <input type="password" placeholder="pass" className="block mb-2 p-2 bg-black" onChange={(e) => setPass(e.target.value)} />
          <button
            onClick={() => {
              if (user === "admin" && pass === "admin040632") setIsAdmin(true);
              else alert("ผิด");
            }}
            className="bg-blue-600 px-4 py-2"
          >
            login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl mb-4">ระบบจัดการร้าน</h1>

      <div className="bg-zinc-900 p-4 rounded mb-6">
        <input placeholder="ชื่อ" value={name} className="block mb-2 p-2 w-full bg-black" onChange={(e) => setName(e.target.value)} />
        <input placeholder="เบอร์" value={phone} className="block mb-2 p-2 w-full bg-black" onChange={(e) => setPhone(e.target.value)} />
        <input placeholder="SN" value={sn} className="block mb-2 p-2 w-full bg-black" onChange={(e) => setSn(e.target.value)} />

        <select value={service} className="block mb-2 p-2 w-full bg-black" onChange={(e) => setService(e.target.value)}>
          <option>ลงวินโดว์</option>
          <option>กู้ข้อมูล</option>
          <option>อื่นๆ</option>
        </select>

        <select value={status} className="block mb-2 p-2 w-full bg-black" onChange={(e) => setStatus(e.target.value)}>
          <option value="quote">เสนอราคา</option>
          <option value="repairing">กำลังซ่อม</option>
          <option value="waiting_parts">รออะไหล่</option>
          <option value="done">ซ่อมเสร็จ</option>
        </select>

        <textarea placeholder="รายละเอียด" value={details} className="block mb-2 p-2 w-full bg-black" onChange={(e) => setDetails(e.target.value)} />

        <div className="mb-2">
          <label className="block">สิ่งที่นำมาด้วย:</label>

          {["กระเป๋า", "สายชาร์จ", "RAM", "SSD", "อื่นๆ"].map((item) => (
            <label key={item} className="block">
              <input
                type="checkbox"
                checked={items.some(i => i.includes(item))}
                onChange={(e) =>
                  e.target.checked
                    ? setItems([...items, item])
                    : setItems(items.filter(i => !i.includes(item)))
                }
              /> {item}
            </label>
          ))}

          {items.includes("RAM") && (
            <input
              className="p-1 mt-1 bg-black border"
              placeholder="RAM เช่น 16"
              value={ram}
              onChange={(e) => setRam(e.target.value.replace(/[^0-9]/g, ""))}
            />
          )}

          {items.includes("SSD") && (
            <input
              className="p-1 mt-1 bg-black border"
              placeholder="SSD เช่น 512"
              value={ssd}
              onChange={(e) => setSsd(e.target.value.replace(/[^0-9]/g, ""))}
            />
          )}

          {items.includes("อื่นๆ") && (
            <input className="mt-2 p-2 w-full bg-black" placeholder="อื่นๆ" value={otherItem} onChange={(e) => setOtherItem(e.target.value)} />
          )}
        </div>

        <button onClick={saveOrder} className="bg-green-600 px-4 py-2">
          {editingId ? "💾 อัปเดต" : "💾 บันทึก"}
        </button>
      </div>

      <input
        placeholder="🔍 ค้นหา"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 w-full bg-black border"
      />

      {filtered.map((o) => (
        <div key={o._id} className="bg-zinc-800 p-3 mb-3 rounded">
          <div>ชื่อ: {o.name}</div>
          <div>เบอร์: {o.phone}</div>
          <div>SN: {o.sn}</div>
          <div>สถานะ: {renderStatus(o.status)}</div>

          {o.ram && <div>RAM: {o.ram} GB</div>}
          {o.ssd && <div>SSD: {o.ssd} GB</div>}

          <div className="mt-1 text-sm text-gray-300">
            {[...(o.items || []), o.otherItem || ""].filter(Boolean).join(", ")}
          </div>

          <div className="mt-3 flex gap-2">
            <button onClick={() => editOrder(o)} className="bg-blue-500 px-3 py-1 rounded">
              ✏️ แก้ไข
            </button>

            <a
              href={`/api/orders/pdf/${o._id}`}
              target="_blank"
              className="bg-yellow-500 px-3 py-1 rounded text-black"
            >
              📄 PDF
            </a>
          </div>
        </div>
      ))}

      <Link href="/" className="text-blue-400 block mt-4">
        กลับหน้าแรก
      </Link>
    </main>
  );
}
>>>>>>> fix-work
