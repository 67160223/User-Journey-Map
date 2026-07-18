// ข้อมูลจำลอง — ใน production ให้แทนที่ด้วย fetch จาก transit API จริง (เช่น ViaBus / ขสมก. GTFS-realtime)
// โครงสร้างนี้ตั้งใจให้ตรงกับสิ่งที่ผู้ใช้ต้องการเห็นตาม journey: เลขสาย, ประเภทรถ (สี), ป้ายถัดไป, ETA, พิกัดคันที่วิ่งอยู่

export const PLATE_TYPES = {
  ordinary: { label: 'ธรรมดา', bg: 'var(--plate-cream)', fg: '#1c2128' },
  aircon: { label: 'ปรับอากาศ', bg: '#2b5aa0', fg: '#f4f6f9' },
  brt: { label: 'ด่วนพิเศษ', bg: 'var(--red)', fg: '#f4f6f9' },
}

export const ROUTES = [
  {
    id: '140',
    number: '140',
    plate: 'ordinary',
    name: 'อนุสาวรีย์ชัยฯ – ปากน้ำ',
    stops: ['อนุสาวรีย์ชัยสมรภูมิ', 'สนามเป้า', 'อโศก', 'บางนา', 'ปากน้ำ'],
    etaMins: 6,
    nextStop: 'อโศก',
    stopsAway: 2,
    status: 'moving', // moving | delayed | last
  },
  {
    id: '25',
    number: '25',
    plate: 'ordinary',
    name: 'ท่าเตียน – มีนบุรี',
    stops: ['ท่าเตียน', 'สะพานพุทธ', 'ประตูน้ำ', 'มีนบุรี'],
    etaMins: 14,
    nextStop: 'ประตูน้ำ',
    stopsAway: 5,
    status: 'delayed',
  },
  {
    id: '511',
    number: '511',
    plate: 'aircon',
    name: 'อนุสาวรีย์ชัยฯ – ปู่เจ้าสมิงพราย',
    stops: ['อนุสาวรีย์ชัยสมรภูมิ', 'สาทร', 'บางนา', 'ปู่เจ้าสมิงพราย'],
    etaMins: 3,
    nextStop: 'สาทร',
    stopsAway: 1,
    status: 'moving',
  },
  {
    id: 'BRT1',
    number: 'BRT',
    plate: 'brt',
    name: 'สาทร – ราชพฤกษ์',
    stops: ['สาทร', 'เจริญนคร', 'ราชพฤกษ์'],
    etaMins: 9,
    nextStop: 'เจริญนคร',
    stopsAway: 1,
    status: 'last',
  },
]

export function searchRoutes(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return ROUTES.filter(
    (r) => r.number.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)
  )
}

export function getRouteById(id) {
  return ROUTES.find((r) => r.id === id)
}
