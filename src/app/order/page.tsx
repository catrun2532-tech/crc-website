const saveOrder = async () => {
  if (!name || !phone) {
    alert("กรอกชื่อ + เบอร์ก่อน");
    return;
  }

  setLoading(true);

  try {
    const url = editingId ? `/api/orders/${editingId}` : "/api/orders";
    const method = editingId ? "PUT" : "POST";

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
        items,
        otherItem,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("API ERROR:", data);
      throw new Error(data?.error || "Server error");
    }

    alert(editingId ? "✅ อัปเดตแล้ว" : "✅ บันทึกสำเร็จ");

    resetForm();
    loadOrders();
  } catch (err: any) {
    console.error("SAVE ERROR:", err);
    alert("❌ " + (err.message || "error"));
  } finally {
    setLoading(false);
  }
};