import Nav from '../components/live-bus-tracker/nav/nav'
import type { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header>
        <h1>Winnipeg Transit Tracker</h1>
        <Nav />
      </header>

      <main>
        {children}
      </main>

      <footer>
        <p>Team: Harsh Pandya, Khush Patel, Jack Buchholzer</p>
      </footer>
    </>
  );
}

export default Layout
