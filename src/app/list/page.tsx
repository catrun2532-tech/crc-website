"use client";

import { useEffect, useState } from "react";

type Order = {
  name: string;
  phone: string;
  sn: string;
  runningCode: string;
  brand: string;
  detail: string;
};

export default function ListPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/get-orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const filtered = orders.filter((item) =>
    `${item.name} ${item.phone} ${item.sn} ${item.runningCode}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20, background: "#0f172a", minHeight: "100vh", color: "white" }}>
      <h2>📋 รายการงานทั้งหมด</h2>

      {/* 🔍 ช่องค้นหา */}
      <input
        placeholder="ค้นหา ชื่อ / เบอร์ / SN / CR"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginTop: 10,
          marginBottom: 20,
          borderRadius: 8,
          border: "none",
        }}
      />

      {/* 📊 ตาราง */}
      <table style={{ width: "100%", background: "#1e293b", borderRadius: 10 }}>
        <thead>
          <tr>
            <th>เลขที่</th>
            <th>ชื่อ</th>
            <th>เบอร์</th>
            <th>ยี่ห้อ</th>
            <th>SN</th>
            <th>รายละเอียด</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((item, i) => (
            <tr key={i}>
              <td>{item.runningCode}</td>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.brand}</td>
              <td>{item.sn}</td>
              <td>{item.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}