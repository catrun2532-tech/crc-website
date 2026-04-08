"use client";

import { useState, useEffect } from "react";
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
    const res = await fetch("/api/get-orders");
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
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
      name: "",
      phone: "",
      brand: "",
      sn: "",
      detail: "",
      price: "",
      status: "รอซ่อม",
    });

    fetchOrders();
  };

  // ✅ เปลี่ยนสถานะ
  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/update-order", {
      method: "POST",
      body: JSON.stringify({ id, status }),
    });

    fetchOrders();
  };

  const getStatusColor = (status: string) => {
    if (status === "รอซ่อม") return "#facc15"; // เหลือง
    if (status === "กำลังซ่อม") return "#3b82f6"; // ฟ้า
    if (status === "เสร็จแล้ว") return "#22c55e"; // เขียว
    return "#ccc";
  };

  const generatePDF = (o: any) => {
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
  };

  // 🔐 LOGIN
  if (!isLogin) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginBox}>
          <h2><FaTools /> ระบบแจ้งซ่อม</h2>

          <input placeholder="Username" onChange={(e) => setUser(e.target.value)} style={styles.input} />
          <input type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} style={styles.input} />

          <button onClick={handleLogin} style={styles.loginBtn}>Login</button>
        </div>
      </div>
    );
  }

  // 🔎 search
  const filtered = orders.filter((o) =>
    o.name?.toLowerCase().includes(search.toLowerCase()) ||
    o.phone?.includes(search) ||
    o.sn?.toLowerCase().includes(search.toLowerCase()) ||
    o.runningCode?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2><FaTools /> Repair System</h2>

        <div>
          <FaUser /> {role}
          <button onClick={logout} style={styles.logoutBtn}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* FORM */}
      <div style={styles.formCard}>
        <h3>➕ เพิ่มใบงาน</h3>

        <input placeholder="ชื่อ" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={styles.input} />
        <input placeholder="เบอร์" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={styles.input} />
        <input placeholder="ยี่ห้อ" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} style={styles.input} />
        <input placeholder="SN" value={form.sn} onChange={(e) => setForm({ ...form, sn: e.target.value })} style={styles.input} />

        <textarea placeholder="รายละเอียด" value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })} style={styles.input} />

        <button onClick={handleSubmit} style={styles.saveBtn}>
          💾 บันทึก
        </button>
      </div>

      {/* LIST */}
      {role === "admin" && (
        <div style={styles.listCard}>
          <h3>📋 รายการ</h3>

          <input
            placeholder="🔍 ค้นหา"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />

          {filtered.map((o) => (
            <div key={o._id} style={styles.item}>
              <div>
                <b>{o.runningCode}</b>
                <div>{o.name}</div>

                <div style={{ fontSize: 12 }}>SN: {o.sn}</div>

                {/* 🔥 status color */}
                <div
                  style={{
                    background: getStatusColor(o.status),
                    color: "#fff",
                    padding: "2px 8px",
                    borderRadius: 6,
                    display: "inline-block",
                    marginTop: 5,
                    fontSize: 12,
                  }}
                >
                  {o.status}
                </div>
              </div>

              {/* 🔥 edit status */}
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <select
                  value={o.status}
                  onChange={(e) => updateStatus(o._id, e.target.value)}
                  style={styles.input}
                >
                  <option>รอซ่อม</option>
                  <option>กำลังซ่อม</option>
                  <option>เสร็จแล้ว</option>
                </select>

                <button onClick={() => generatePDF(o)} style={styles.pdfBtn}>
                  <FaFilePdf />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles: any = {
  page: {
    padding: 15,
    background: "#f1f5f9",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  formCard: {
    maxWidth: 500,
    margin: "auto",
    background: "#fff",
    padding: 20,
    borderRadius: 16,
  },

  listCard: {
    marginTop: 20,
    background: "#fff",
    padding: 15,
    borderRadius: 16,
  },

  input: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
    width: "100%",
  },

  saveBtn: {
    marginTop: 15,
    padding: 12,
    borderRadius: 10,
    background: "#22c55e",
    color: "#fff",
    border: "none",
  },

  pdfBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: 8,
    borderRadius: 8,
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
    borderBottom: "1px solid #eee",
    paddingBottom: 10,
    flexWrap: "wrap", // ✅ รองรับมือถือ
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

  loginBtn: {
    marginTop: 10,
    padding: 10,
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: 8,
  },

  logoutBtn: {
    marginLeft: 10,
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: 6,
  },
};