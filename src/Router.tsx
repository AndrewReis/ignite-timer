// dependencies
import { Routes, Route } from 'react-router-dom'

// layouts
import { DefaultLayout } from './layouts/Default'

// pages
import { History } from './pages/History'
import { Home } from './pages/Home'
import { About } from './pages/About'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  )
}
