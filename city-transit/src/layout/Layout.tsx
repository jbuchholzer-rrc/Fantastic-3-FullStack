import Nav from '../components/live-bus-tracker/nav/nav'
import { Bus } from 'lucide-react'
import type { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header>
        <div className="header-content">
          <Bus size={24} />
          <h1>Winnipeg Transit Tracker</h1>
        </div>
        <Nav />
      </header>

      <main>{children}</main>

      <footer>
        <p>Winnipeg Transit Tracker -- Harsh Pandya, Khush Patel, Jack Buchholzer</p>
      </footer>
    </>
  )
}

export default Layout
