import "./globals.css";
<<<<<<< HEAD

export const metadata = {
  title: "C.R.C. คอมพิวเตอร์",
  description: "รับซ่อมคอมพิวเตอร์ โน๊ตบุ๊ค อัปเกรด SSD RAM กู้ข้อมูล",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
=======
import type { Metadata } from "next";
import MusicPlayer from "../components/MusicPlayer";

export const metadata: Metadata = {
  title: "C.R.C. คอมพิวเตอร์",
  description: "เว็บไซต์ร้านซ่อมคอมพิวเตอร์",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
>>>>>>> fix-work
  return (
    <html lang="th">
      <body>
        {children}
<<<<<<< HEAD
      </body>
    </html>
  );
}
=======
        <MusicPlayer />
      </body>
    </html>
  );
}
>>>>>>> fix-work
