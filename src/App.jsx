import { Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import RouteDetail from './pages/RouteDetail'
import Saved from './pages/Saved'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/route/:id" element={<RouteDetail />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
      <BottomNav />
    </>
  )
}
