import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import RoutePlate from '../components/RoutePlate'
import ETABadge from '../components/ETABadge'
import ShareButton from '../components/ShareButton'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getRouteById } from '../data/routes'
import './RouteDetail.css'

const STATUS_TEXT = {
  moving: 'กำลังวิ่งมาตามเวลา',
  delayed: 'รถติด มาช้ากว่าปกติเล็กน้อย',
  last: 'เที่ยวนี้เป็นคันสุดท้ายของวัน',
}

export default function RouteDetail() {
  const { id } = useParams()
  const route = getRouteById(id)
  const [view, setView] = useState('list') // list ประหยัดดาต้ากว่า จึงเป็นค่าเริ่มต้น — ตรง opportunity ลดการโหลดแผนที่
  const [recent, setRecent] = useLocalStorage('recentRoutes', [])
  const [saved, setSaved] = useLocalStorage('savedRoutes', [])

  useEffect(() => {
    if (!route) return
    setRecent((prev) => {
      const without = prev.filter((r) => r.id !== route.id)
      return [route, ...without].slice(0, 6)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (!route) return <Navigate to="/" replace />

  const isSaved = saved.some((r) => r.id === route.id)

  function toggleSave() {
    setSaved((prev) =>
      isSaved ? prev.filter((r) => r.id !== route.id) : [...prev, route]
    )
  }

  return (
    <div className="page route-detail">
      <Link to="/" className="route-detail__back">← กลับ</Link>

      <header className="route-detail__header">
        <RoutePlate route={route} size="lg" />
        <div>
          <h1>สาย {route.number}</h1>
          <p className="route-detail__name">{route.name}</p>
        </div>
      </header>

      <div className="route-detail__status">{STATUS_TEXT[route.status]}</div>

      <div className="route-detail__eta-row">
        <ETABadge mins={route.etaMins} status={route.status} />
        <p className="route-detail__next">
          ป้ายถัดไป <strong>{route.nextStop}</strong><br />
          อีก {route.stopsAway} ป้ายถึงคุณ
        </p>
      </div>

      <div className="route-detail__toggle" role="tablist" aria-label="รูปแบบการแสดงผล">
        <button
          role="tab"
          aria-selected={view === 'list'}
          className={view === 'list' ? 'is-active' : ''}
          onClick={() => setView('list')}
        >
          รายการป้าย
        </button>
        <button
          role="tab"
          aria-selected={view === 'map'}
          className={view === 'map' ? 'is-active' : ''}
          onClick={() => setView('map')}
        >
          แผนที่
        </button>
      </div>

      {view === 'list' ? (
        <ol className="route-detail__stops">
          {route.stops.map((stop, i) => (
            <li
              key={stop}
              className={stop === route.nextStop ? 'is-next' : i < route.stops.indexOf(route.nextStop) ? 'is-passed' : ''}
            >
              <span className="route-detail__stop-dot" />
              {stop}
            </li>
          ))}
        </ol>
      ) : (
        <RouteMapMock route={route} />
      )}

      <div className="route-detail__actions">
        <button className={`route-detail__save${isSaved ? ' is-saved' : ''}`} onClick={toggleSave}>
          {isSaved ? '📌 บันทึกไว้แล้ว' : '📌 บันทึกสายนี้'}
        </button>
        <ShareButton route={route} />
      </div>
    </div>
  )
}

// แผนที่จำลอง — เส้นทางนิ่ง + จุดรถเคลื่อนที่ตาม progress ของ stopsAway
// ใน production ให้แทนที่ด้วย Mapbox/Google Maps ผูกพิกัด GPS จริง
function RouteMapMock({ route }) {
  const total = route.stops.length - 1
  const passed = route.stops.indexOf(route.nextStop)
  const progress = Math.min(1, Math.max(0, (passed) / total))

  return (
    <div className="route-map">
      <svg viewBox="0 0 320 60" className="route-map__svg">
        <line x1="20" y1="30" x2="300" y2="30" stroke="var(--border)" strokeWidth="4" strokeLinecap="round" />
        <circle
          cx={20 + progress * 280}
          cy="30"
          r="9"
          fill="var(--amber)"
          className="route-map__dot"
        />
      </svg>
      <p className="route-map__caption">ตำแหน่งรถโดยประมาณ — อัปเดตทุก 20 วินาที</p>
    </div>
  )
}
