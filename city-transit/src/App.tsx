import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Nav from './components/live-bus-tracker/nav/Nav'
import LiveBusTrackerPage from './pages/LiveBusTrackerPage'
import FavoritesPage from './pages/FavoritesPage'

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
    <Router>
      <header>
        <h1>Winnipeg Transit Tracker</h1>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<div><h2>Home</h2><p>Welcome to the app.</p><p>Tracked Buses: {trackedBuses.length}</p></div>} />
          <Route path="/live-bus-tracker" element={<LiveBusTrackerPage trackedBuses={trackedBuses} setTrackedBuses={setTrackedBuses} favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/favorites" element={<FavoritesPage favorites={favorites} setFavorites={setFavorites} />} />
        </Routes>
      </main>
      <footer>
        <p>Team Members: Harsh Pandya, Khush Patel, Jack Buchholzer</p>
      </footer>
    </Router>
  )
}

export default App
