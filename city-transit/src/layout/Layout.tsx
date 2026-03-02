import React from 'react'
import Nav from "../components/live-bus-tracker/nav/nav"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <h1>Winnipeg Transit Tracker</h1>
        <Nav />
      </header>

      <main>{children}</main>

      <footer>
        <p>Team: Harsh Pandya, Khush Patel, Jack Buchholzer</p>
      </footer>
    </>
  )
}

export default Layout