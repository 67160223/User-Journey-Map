import { Link } from 'react-router-dom'
import RoutePlate from '../components/RoutePlate'
import { useLocalStorage } from '../hooks/useLocalStorage'
import './Saved.css'

export default function Saved() {
  const [saved] = useLocalStorage('savedRoutes', [])

  return (
    <div className="page saved">
      <header>
        <p className="eyebrow">บันทึกไว้</p>
        <h1>สายที่ติดตามอยู่</h1>
      </header>

      {saved.length === 0 ? (
        <p className="empty-state">
          ยังไม่มีสายที่บันทึกไว้ — เปิดสายที่ใช้บ่อยแล้วกด "บันทึกสายนี้"
          <br />ครั้งหน้าจะเจอที่นี่ทันที ไม่ต้องพิมพ์ค้นหาใหม่
        </p>
      ) : (
        <ul className="saved__list">
          {saved.map((r) => (
            <li key={r.id}>
              <Link to={`/route/${r.id}`} className="saved__item">
                <RoutePlate route={r} />
                <div className="saved__text">
                  <strong>สาย {r.number}</strong>
                  <span>{r.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
