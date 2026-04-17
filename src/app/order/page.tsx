"use client";

import { useState, useEffect } from "react";
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
          "Content-Type": "application/json",
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

  // 🔥 FIX ตรงนี้ (dynamic import)
  const generatePDF = async (o: any) => {
    const html2pdf = (await import("html2pdf.js")).default;

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