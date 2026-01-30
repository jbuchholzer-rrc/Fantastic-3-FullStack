import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Nav from './components/live-bus-tracker/nav/nav'
import LiveBusTrackerPage from './pages/liveBusTrackerPage'
import FavoritesPage from './pages/FavoritesPage'
import BusRouteMapPage from './pages/BusRouteMapPage'

interface TrackedBus {
  id: number;
  routeNumber: string;
  destination: string;
  eta: number;
  status: "On Time" | "Delayed";
}

function App() {
  const [trackedBuses, setTrackedBuses] = useState<TrackedBus[]>([]);
  const [favorites, setFavorites] = useState<TrackedBus[]>([]);

  return (
    <>
      <header>
        <h1>Winnipeg Transit Tracker</h1>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<div><h2>Home</h2><p>Welcome to the app.</p><p>Tracked Buses: {trackedBuses.length}</p></div>} />
          <Route path="/live-bus-tracker" element={<LiveBusTrackerPage trackedBuses={trackedBuses} setTrackedBuses={setTrackedBuses} favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/favorites" element={<FavoritesPage favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/bus-route-map" element={<BusRouteMapPage />} />
        </Routes>
      </main>
      <footer>
        <p>Team Members: Harsh Pandya, Khush Patel, Jack Buchholzer</p>
      </footer>
    </>
  )
}

export default App
