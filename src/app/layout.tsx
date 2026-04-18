import "./globals.css";

export const metadata = {
  title: "C.R.C. คอมพิวเตอร์",
  description: "รับซ่อมคอมพิวเตอร์ โน๊ตบุ๊ค อัปเกรด SSD RAM กู้ข้อมูล",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        {children}
      </body>
    </html>
  );
}