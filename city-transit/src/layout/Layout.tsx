import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header>
        <h1>Winnipeg Transit Tracker</h1>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>Team: Harsh Pandya, Khush Patel, Jack Buchholzer</p>
      </footer>
    </>
  );
}

export default Layout;