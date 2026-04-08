import { jsPDF } from "jspdf";
import { THSarabun } from "./font";

export const generatePDF = (data) => {
  const doc = new jsPDF();

  // 🔥 โหลด font ไทย
  doc.addFileToVFS("THSarabun.ttf", THSarabun);
  doc.addFont("THSarabun.ttf", "THSarabun", "normal");
  doc.setFont("THSarabun");

  // Title
  doc.setFontSize(18);
  doc.text("ใบแจ้งซ่อม (Repair Order)", 105, 20, { align: "center" });

  doc.setFontSize(12);

  let y = 40;

  const line = (label, value) => {
    doc.text(`${label}: ${value || "-"}`, 20, y);
    y += 10;
  };

  line("ชื่อ", data.name);
  line("เบอร์", data.phone);
  line("ยี่ห้อ", data.brand);
  line("SN", data.sn);
  line("รายละเอียด", data.detail);

  doc.text(
    `วันที่: ${new Date().toLocaleString("th-TH")}`,
    20,
    y + 10
  );

  doc.save(`job-${Date.now()}.pdf`);
};