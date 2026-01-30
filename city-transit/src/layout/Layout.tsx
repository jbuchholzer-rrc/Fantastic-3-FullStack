import Nav from "../components/nav/Nav"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <h1>Winnipeg Transit Tracker</h1>
        <Nav /> 
      </header>e

      <main>{children}</main>

      <footer>
        <p>Team: Harsh Pandya, Khush Patel, Jack Buchholzer</p>
      </footer>
    </>
  )
}

export default Layout
