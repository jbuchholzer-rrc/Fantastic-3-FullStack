import Nav from '../components/live-bus-tracker/nav/nav'
import type { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header>
        <div className="header-content">
          <img src="/transit-logo.png" alt="Winnipeg Transit" style={{ height: 28, filter: 'brightness(0) invert(1)' }} />
          <h1>Winnipeg Transit Tracker</h1>
          <span className="header-team">Harsh Pandya, Khush Patel, Jack Buchholzer</span>
        </div>
        <Nav />
      </header>

      <main>{children}</main>
    </>
  )
}

export default Layout
