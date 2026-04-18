import PDFDocument from "pdfkit";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const doc = new PDFDocument();
  const chunks: Uint8Array[] = [];

  doc.on("data", (chunk) => chunks.push(chunk));
  doc.on("end", () => {});

  // 👉 เนื้อหา PDF
  doc.fontSize(20).text(`Order ID: ${id}`);
  doc.text("ระบบซ่อมคอม");
  doc.text("ขอบคุณที่ใช้บริการ");

  doc.end();

  const pdfBuffer = await new Promise<Buffer>((resolve) => {
    doc.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
  });

  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=order-${id}.pdf`,
    },
  });
}