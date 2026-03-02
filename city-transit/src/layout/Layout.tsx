import { Outlet } from "react-router-dom";
import Nav from '../components/live-bus-tracker/nav/nav'
import React from 'react'
import Nav from "../components/live-bus-tracker/nav/nav"

function Layout() {
  return (
    <>
      <header>
        <h1>Winnipeg Transit Tracker</h1>

        <Nav />
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
export default Layout
