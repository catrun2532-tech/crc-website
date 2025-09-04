import "./globals.css";
import type { Metadata } from "next";
import MusicPlayer from "../components/MusicPlayer";

export const metadata: Metadata = {
  title: "C.R.C. คอมพิวเตอร์",
  description: "เว็บไซต์ร้านซ่อมคอมพิวเตอร์",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
}
