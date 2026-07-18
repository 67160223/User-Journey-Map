# สายเลข — เช็คสายรถเมล์ Real-time

Frontend scaffold ที่ map ตรงกับ 5 stage ใน User Journey Map (Awareness & Entry →
Exploration & Search → Conversion / Getting Info → Retention / Experience → Advocacy / Share)

Stack: **React + Vite + React Router**, ไม่มี UI library หนัก ๆ, CSS ล้วน — เพื่อให้เว็บโหลดเบา
ตาม pain point "เว็บโหลดช้า คอนเทนต์หน้าตาไม่เหมาะกับมือถือ" และตั้งเป็น **PWA** (installable +
cache แบบ offline-first) ตาม opportunity "ทำให้เว็บเบาที่สุด"

## โครงสร้างโปรเจกต์ ↔ User Journey

| Stage | ไฟล์หลักที่รับผิดชอบ |
|---|---|
| 1. Awareness & Entry | `src/pages/Home.jsx`, PWA manifest ใน `vite.config.js` (เปิดแอปได้ทันทีจากหน้าจอโฮม) |
| 2. Exploration & Search | `src/components/SearchBar.jsx` (auto-suggest ระหว่างพิมพ์) |
| 3. Conversion / Getting Info | `src/pages/RouteDetail.jsx` (ETA, สลับ List/Map), `src/components/ETABadge.jsx` |
| 4. Retention / Experience | `src/hooks/useLocalStorage.js`, ปุ่มบันทึกใน `RouteDetail.jsx`, หน้า `src/pages/Saved.jsx` |
| 5. Advocacy / Share | `src/components/ShareButton.jsx` (short link + native share sheet) |

องค์ประกอบภาพหลักของแอปคือ **RoutePlate** (`src/components/RoutePlate.jsx`) — จำลองป้ายเลขสาย
รถเมล์จริงที่ติดหน้ารถ (สีตามประเภทรถ + จุดสถานะกะพริบ) ให้เป็นจุดจำสายที่สุดของทั้งแอป
เหมือนที่คนใช้จำสายกันในชีวิตจริงอยู่แล้ว

## ข้อมูล

`src/data/routes.js` เป็น mock data ตั้งใจให้ตรงกับ shape ที่ต้องใช้จริง (เลขสาย, ประเภทรถ,
ป้ายถัดไป, ETA, สถานะ) — เมื่อต่อ backend จริง ให้แทนที่ฟังก์ชัน `searchRoutes` /
`getRouteById` ด้วยการเรียก API (เช่น ViaBus API หรือ GTFS-realtime ของ ขสมก.) โดยไม่ต้องแก้
component ใด ๆ

## เริ่มพัฒนา

```bash
npm install
npm run dev
```

## Build สำหรับ deploy

```bash
npm run build
npm run preview   # ทดสอบ build ก่อน deploy จริง
```

ผลลัพธ์จะอยู่ใน `dist/`

## Deploy

โปรเจกต์นี้เป็น static SPA ล้วน deploy ได้ทันทีบน Vercel หรือ Netlify:

- **Vercel**: `vercel deploy` (มี `vercel.json` จัดการ rewrite ให้ทุก route กลับไปที่ `index.html` แล้ว)
- **Netlify**: ลาก-วางโฟลเดอร์ `dist/` หรือ `netlify deploy`, มี `public/_redirects` จัดการ SPA routing ให้แล้ว
- **บริการ static hosting อื่น ๆ**: ตรวจสอบให้แน่ใจว่า config ให้ทุก path fallback ไปที่ `index.html`
  (จำเป็นเพราะใช้ React Router แบบ BrowserRouter)

## ต่อยอด (ตาม "โอกาสพัฒนาเว็บ" ในแผนที่)

- ต่อ WebSocket / polling ทุง 15-20 วิ แทนตำแหน่งรถ mock ใน `RouteDetail.jsx` เพื่อความ real-time จริง
- เพิ่ม Auto-Suggest ให้ดึงจาก search history ของผู้ใช้จริงแทน mock array
- ทำ push notification (ผ่าน service worker ที่ตั้งไว้แล้วใน `vite-plugin-pwa`) แจ้งเตือนก่อนรถถึง
- แทนที่ `public/icon-192.png` / `icon-512.png` ด้วยไอคอนแบรนด์จริงก่อน deploy ขึ้น production
