# CRC Website

โปรเจกต์นี้เป็นเว็บ Next.js สำหรับร้านซ่อมคอม โดยมีหน้าจัดการงานซ่อมและ API สำหรับดาวน์โหลดใบรับงานเป็น PDF

## สิ่งที่แก้ในรอบนี้

- ปุ่มในหน้าจัดการงานซ่อมสามารถดาวน์โหลดไฟล์ PDF ลงเครื่องได้จริง
- API `/api/orders/pdf/[id]` ส่งกลับไฟล์ `application/pdf` พร้อมชื่อไฟล์ดาวน์โหลด

## การรันในเครื่อง

1. ติดตั้งแพ็กเกจ
```bash
npm install
```

2. สร้างไฟล์ `.env.local`
```bash
MONGODB_URI=your_mongodb_connection_string
```

3. รันโปรเจกต์
```bash
npm run dev
```

4. เปิดใช้งานที่ [http://localhost:3000](http://localhost:3000)

## การนำรีโปขึ้นเว็บไซต์

1. Push โปรเจกต์นี้ขึ้น GitHub
2. เข้า [Vercel](https://vercel.com/)
3. เลือก `Add New Project`
4. Import repository นี้
5. ตั้งค่า Environment Variable ชื่อ `MONGODB_URI`
6. กด Deploy

## หมายเหตุ

- ถ้าไม่มี `MONGODB_URI` ระบบรายการงานซ่อมและการสร้าง PDF จะใช้งานไม่ได้
- ตอน deploy บน Vercel ต้องเพิ่มค่า env เดียวกับที่ใช้ในเครื่อง
