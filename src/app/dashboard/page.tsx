"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [todayCount, setTodayCount] = useState(0);

  const fetchOrders = async () => {
    const res = await fetch("/api/get-orders");
    const data = await res.json();
    setOrders(data);

    // นับงานวันนี้
    const today = new Date().toLocaleDateString("th-TH");
    const count = data.filter((o: any) =>
      o.date?.includes(today)
    ).length;

    setTodayCount(count);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={styles.page}>
      <h1>📊 Dashboard ร้านซ่อม</h1>

      {/* 🔥 สรุป */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>📄 งานทั้งหมด</h3>
          <h1>{orders.length}</h1>
        </div>

        <div style={styles.card}>
          <h3>📅 งานวันนี้</h3>
          <h1>{todayCount}</h1>
        </div>
      </div>

      {/* 🔥 รายการล่าสุด */}
      <div style={styles.card}>
        <h3>📋 งานล่าสุด</h3>

        {orders.slice(0, 5).map((o) => (
          <div key={o._id} style={styles.item}>
            <div>
              <b>{o.runningCode}</b>
              <div>{o.name}</div>
              <small>{o.date}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: any = {
  page: {
    padding: 20,
    background: "#f1f5f9",
    minHeight: "100vh",
  },
  grid: {
    display: "flex",
    gap: 20,
    marginTop: 20,
  },
  card: {
    flex: 1,
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  item: {
    borderBottom: "1px solid #eee",
    padding: 10,
  },
};