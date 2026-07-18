import { PLATE_TYPES } from '../data/routes'
import './RoutePlate.css'

const STATUS_COPY = {
  moving: { label: 'กำลังมา', dot: 'var(--green)' },
  delayed: { label: 'ช้ากว่าปกติ', dot: 'var(--amber)' },
  last: { label: 'คันสุดท้าย', dot: 'var(--red)' },
}

// ทรงป้ายและตัวเลขล้อจากป้ายบอกสายจริงบนหน้ารถเมล์ — จุดจำง่ายที่สุดของทั้งแอป
export default function RoutePlate({ route, size = 'md' }) {
  const plate = PLATE_TYPES[route.plate]
  const status = STATUS_COPY[route.status]

  return (
    <div className={`route-plate route-plate--${size}`} style={{ '--plate-bg': plate.bg, '--plate-fg': plate.fg }}>
      <span className="route-plate__rivet route-plate__rivet--tl" />
      <span className="route-plate__rivet route-plate__rivet--tr" />
      <span className="route-plate__number">{route.number}</span>
      {status && (
        <span className="route-plate__status" style={{ '--dot': status.dot }}>
          <span className="route-plate__dot" />
        </span>
      )}
    </div>
  )
}
