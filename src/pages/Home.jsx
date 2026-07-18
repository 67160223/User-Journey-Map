import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import RoutePlate from '../components/RoutePlate'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { ROUTES } from '../data/routes'
import './Home.css'

// Stage 1 (ตอนอยู่บ้าน/กำลังเดินไปป้าย): เปิดมาต้องเจอช่องค้นหาทันที ไม่มีอะไรกั้น
// Stage 2 (ถึงป้ายแล้ว): ถ้าเคยดูสายไหนมาก่อน ให้กดซ้ำได้เลยไม่ต้องพิมพ์ใหม่
export default function Home() {
  const [recent] = useLocalStorage('recentRoutes', [])

  return (
    <div className="page home">
      <header className="home__header">
        <p className="eyebrow">สายเลข</p>
        <h1>รถเมล์สายไหนอยู่ตรงไหนแล้ว</h1>
        <p className="home__sub">พิมพ์เลขสายเดียว ไม่ต้องเปิดแอปหนัก ๆ</p>
      </header>

      <SearchBar autoFocus />

      {recent.length > 0 && (
        <section className="home__section">
          <p className="eyebrow">ดูล่าสุด</p>
          <div className="home__chip-row">
            {recent.map((r) => (
              <Link key={r.id} to={`/route/${r.id}`} className="home__chip">
                <RoutePlate route={r} size="sm" />
                <span>{r.number}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="home__section">
        <p className="eyebrow">สายยอดนิยมแถวนี้</p>
        <ul className="home__list">
          {ROUTES.map((r) => (
            <li key={r.id}>
              <Link to={`/route/${r.id}`} className="home__list-item">
                <RoutePlate route={r} />
                <div className="home__list-text">
                  <strong>สาย {r.number}</strong>
                  <span>{r.name}</span>
                </div>
                <span className="home__list-eta">{r.etaMins} นาที</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
