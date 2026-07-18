import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchRoutes } from '../data/routes'
import RoutePlate from './RoutePlate'
import './SearchBar.css'

// Auto-suggest ระหว่างพิมพ์ — opportunity เด่นสุดจาก pain point "พิมพ์ค้นหาแล้วระบบไม่ขึ้น suggestion"
export default function SearchBar({ onPick, autoFocus }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const results = searchRoutes(query)

  function pick(route) {
    setQuery('')
    setOpen(false)
    if (onPick) onPick(route)
    navigate(`/route/${route.id}`)
  }

  return (
    <div className="search-bar">
      <div className="search-bar__field">
        <span className="search-bar__icon" aria-hidden>🚌</span>
        <input
          ref={inputRef}
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          placeholder="พิมพ์เลขสาย เช่น 140 หรือปลายทาง"
          aria-label="ค้นหาสายรถเมล์"
        />
        {query && (
          <button
            className="search-bar__clear"
            aria-label="ล้างคำค้นหา"
            onClick={() => { setQuery(''); inputRef.current?.focus() }}
          >
            ✕
          </button>
        )}
      </div>

      {open && query && (
        <ul className="search-bar__suggestions">
          {results.length === 0 && (
            <li className="search-bar__empty">ไม่พบสาย "{query}" — ลองพิมพ์แค่เลขสาย</li>
          )}
          {results.map((r) => (
            <li key={r.id}>
              <button className="search-bar__suggestion" onClick={() => pick(r)}>
                <RoutePlate route={r} size="sm" />
                <div className="search-bar__suggestion-text">
                  <strong>สาย {r.number}</strong>
                  <span>{r.name}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
