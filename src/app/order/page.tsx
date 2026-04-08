"use client";

import { useState, useEffect } from "react";
<<<<<<< HEAD
import { FaTools, FaUser, FaSignOutAlt, FaFilePdf } from "react-icons/fa";

type Order = {
  _id: string;
  name: string;
  phone: string;
  brand: string;
  sn: string;
  detail: string;
  price?: string;
  status: string;
  runningCode: string;
};

export default function OrderPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState("");

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [form, setForm] = useState<Order>({
    _id: "",
=======
import { jsPDF } from "jspdf";
import { font } from "@/lib/font"; // ✅ ต้องมีไฟล์นี้จริง

export default function OrderPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [password, setPassword] = useState("");

  const [form, setForm] = useState({
>>>>>>> 7bc84aa (fix tailwind config)
    name: "",
    phone: "",
    brand: "",
    sn: "",
    detail: "",
<<<<<<< HEAD
    price: "",
    status: "รอซ่อม",
    runningCode: "",
  });

  const [orders, setOrders] = useState<Order[]>([]);
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
=======
  });

  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
>>>>>>> 7bc84aa (fix tailwind config)

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/get-orders");
      const data = await res.json();
<<<<<<< HEAD
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetch error:", err);
      setOrders([]);
=======
      setOrders(data);
    } catch {
      alert("❌ โหลดข้อมูลไม่สำเร็จ");
>>>>>>> 7bc84aa (fix tailwind config)
    }
  };

  useEffect(() => {
<<<<<<< HEAD
    if (role === "admin") fetchOrders();
  }, [role]);

  const handleSubmit = async () => {
    if (!form.name || !form.phone) {
      alert("กรอกข้อมูลให้ครบ");
      return;
    }

    await fetch("/api/create-order", {
      method: "POST",
      body: JSON.stringify(form),
    });

    alert("✅ บันทึกสำเร็จ");

    setForm({
      _id: "",
      name: "",
      phone: "",
      brand: "",
      sn: "",
      detail: "",
      price: "",
      status: "รอซ่อม",
      runningCode: "",
=======
    if (isLogin) fetchOrders();
  }, [isLogin]);

  const handleLogin = () => {
    if (password === "admin181041") {
      setIsLogin(true);
    } else {
      alert("❌ รหัสไม่ถูกต้อง");
    }
  };

  const handleSubmit = async () => {
    const { name, phone, brand, sn } = form;

    if (!name || !phone || !brand || !sn) {
      alert("⚠️ กรอกข้อมูลให้ครบ");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ บันทึกสำเร็จ");
        setForm({ name: "", phone: "", brand: "", sn: "", detail: "" });
        fetchOrders();
      } else {
        alert("❌ บันทึกไม่สำเร็จ");
      }
    } catch {
      alert("❌ Server error");
    }

    setLoading(false);
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("ลบจริงไหม?")) return;

    await fetch("/api/delete-order", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
>>>>>>> 7bc84aa (fix tailwind config)
    });

    fetchOrders();
  };

<<<<<<< HEAD
  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/update-order", {
      method: "POST",
      body: JSON.stringify({ id, status }),
=======
  const updateOrder = async (o: any) => {
    const newName = prompt("แก้ชื่อ", o.name);
    if (!newName) return;

    await fetch("/api/update-order", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: o._id,
        data: { name: newName },
      }),
>>>>>>> 7bc84aa (fix tailwind config)
    });

    fetchOrders();
  };

<<<<<<< HEAD
  const getStatusColor = (status: string) => {
    if (status === "รอซ่อม") return "#facc15";
    if (status === "กำลังซ่อม") return "#3b82f6";
    if (status === "เสร็จแล้ว") return "#22c55e";
    return "#ccc";
  };

  // ✅ FIX: ใช้ dynamic import (สำคัญมาก)
  const generatePDF = async (o: Order) => {
    const html2pdf = require("html2pdf.js");

    const element = document.createElement("div");

    element.innerHTML = `
      <div style="padding:30px;font-family:sans-serif">
        <h2 style="text-align:center">📄 ใบงานซ่อม</h2>
        <hr/>
        <p><b>${o.runningCode}</b></p>
        <p>${o.name}</p>
        <p>${o.phone}</p>
        <p>SN: ${o.sn}</p>
        <p>สถานะ: ${o.status}</p>
        <p>${o.detail}</p>
      </div>
    `;

    html2pdf().from(element).save(`${o.runningCode}.pdf`);
=======
  // ✅🔥 FIX ภาษาไทย PDF
  const downloadPDF = (o: any) => {
    const doc = new jsPDF();

    // ✅ ใส่ font เข้า jsPDF
    doc.addFileToVFS("THSarabunNew.ttf", font);
    doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");

    doc.setFont("THSarabunNew");
    doc.setFontSize(20);

    doc.text("ใบรับซ่อม", 105, 20, { align: "center" });

    doc.setFontSize(16);

    let y = 35;

    const line = (label: string, value: string) => {
      doc.text(`${label}: ${value || "-"}`, 20, y);
      y += 10;
    };

    line("รหัส", `CR-${o._id}`);
    line("ชื่อ", o.name);
    line("เบอร์โทร", o.phone);
    line("ยี่ห้อ", o.brand);
    line("SN", o.sn);
    line("รายละเอียด", o.detail);

    const date = new Date().toLocaleString("th-TH");
    doc.text(`วันที่: ${date}`, 20, y + 10);

    doc.save(`CR-${o._id}.pdf`);
>>>>>>> 7bc84aa (fix tailwind config)
  };

  const filtered = orders.filter((o) =>
    (o.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (o.phone || "").includes(search) ||
<<<<<<< HEAD
    (o.sn || "").toLowerCase().includes(search.toLowerCase()) ||
    (o.runningCode || "").toLowerCase().includes(search.toLowerCase())
=======
    (o.sn || "").includes(search)
>>>>>>> 7bc84aa (fix tailwind config)
  );

  if (!isLogin) {
    return (
<<<<<<< HEAD
      <div style={styles.loginPage}>
        <div style={styles.loginBox}>
          <h2><FaTools /> ระบบแจ้งซ่อม</h2>

          <input placeholder="Username" onChange={(e) => setUser(e.target.value)} style={styles.input} />
          <input type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} style={styles.input} />

          <button onClick={handleLogin} style={styles.loginBtn}>Login</button>
        </div>
=======
      <div style={styles.loginWrapper}>
        <div style={styles.loginBox}>
          <h2>🔐 Admin</h2>
          <input
            type="password"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>เข้าสู่ระบบ</button>
        </div>
        <style jsx>{inputStyle}</style>
>>>>>>> 7bc84aa (fix tailwind config)
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div style={styles.page}>
      <div style={styles.header}>
        <h2><FaTools /> Repair System</h2>

        <div>
          <FaUser /> {role}
          <button onClick={logout} style={styles.logoutBtn}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      <input
        placeholder="ค้นหา..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />

      <div style={styles.listCard}>
        {filtered.map((o) => (
          <div key={o._id} style={styles.item}>
            <div>
              <b>{o.runningCode}</b> - {o.name} ({o.phone})
              <div>{o.detail}</div>
              <span style={{ color: getStatusColor(o.status) }}>{o.status}</span>
            </div>

            <button style={styles.pdfBtn} onClick={() => generatePDF(o)}>
              <FaFilePdf /> PDF
            </button>
          </div>
        ))}
      </div>
=======
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>📄 แจ้งซ่อม</h2>

        {Object.keys(form).map((key) =>
          key !== "detail" ? (
            <input
              key={key}
              placeholder={key}
              value={(form as any)[key]}
              onChange={(e) =>
                setForm({ ...form, [key]: e.target.value })
              }
            />
          ) : (
            <textarea
              key={key}
              placeholder="รายละเอียด"
              value={form.detail}
              onChange={(e) =>
                setForm({ ...form, detail: e.target.value })
              }
            />
          )
        )}

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "⏳ กำลังบันทึก..." : "💾 บันทึก"}
        </button>
      </div>

      <div style={styles.card}>
        <h2>🔍 ค้นหาใบงาน</h2>

        <input
          placeholder="ค้นหา..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filtered.length === 0 ? (
          <p>ไม่มีข้อมูล</p>
        ) : (
          filtered.map((o) => (
            <div key={o._id} style={styles.item}>
              <b>{o.name}</b>
              <div>{o.phone}</div>
              <div>{o.brand}</div>
              <div>SN: {o.sn}</div>

              <div style={{ marginTop: 10 }}>
                <button onClick={() => downloadPDF(o)}>📄 PDF</button>
                <button onClick={() => updateOrder(o)}>✏️ แก้</button>
                <button onClick={() => deleteOrder(o._id)}>❌ ลบ</button>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{inputStyle}</style>
>>>>>>> 7bc84aa (fix tailwind config)
    </div>
  );
}

<<<<<<< HEAD
const styles = {
  page: { padding: 15, background: "#f1f5f9", minHeight: "100vh" },
  header: { display: "flex", justifyContent: "space-between", marginBottom: 20 },
  listCard: { marginTop: 20, background: "#fff", padding: 15, borderRadius: 16 },
  input: { marginTop: 10, padding: 10, borderRadius: 8, border: "1px solid #ddd", width: "100%" },
  pdfBtn: { background: "#ef4444", color: "#fff", border: "none", padding: 8, borderRadius: 8 },
  item: { display: "flex", justifyContent: "space-between", marginTop: 10, borderBottom: "1px solid #eee", paddingBottom: 10 },
  loginPage: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" },
  loginBox: { background: "#fff", padding: 30, borderRadius: 16 },
  loginBtn: { marginTop: 10, padding: 10, background: "#3b82f6", color: "#fff", border: "none", borderRadius: 8 },
  logoutBtn: { marginLeft: 10, background: "#ef4444", color: "#fff", border: "none", padding: "5px 10px", borderRadius: 6 },
};
=======
const styles: any = {
  loginWrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f1f5f9",
  },
  loginBox: {
    background: "#fff",
    padding: 30,
    borderRadius: 12,
    width: 300,
  },
  container: {
    display: "flex",
    gap: 20,
    padding: 20,
  },
  card: {
    flex: 1,
    background: "#fff",
    padding: 20,
    borderRadius: 12,
  },
  item: {
    border: "1px solid #eee",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
};

const inputStyle = `
input, textarea {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

button {
  margin-top: 10px;
  margin-right: 5px;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  background: linear-gradient(90deg,#00c6ff,#0072ff);
  color: #fff;
  cursor: pointer;
}
`;
>>>>>>> 7bc84aa (fix tailwind config)
