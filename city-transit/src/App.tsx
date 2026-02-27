import './App.css'
import { Routes, Route } from 'react-router-dom'
import { BusProvider } from './context/BusContext'
import Nav from './components/live-bus-tracker/nav/nav'
import { useState } from 'react'
import Layout from './layout/Layout'
import LiveBusTrackerPage from './pages/liveBusTrackerPage'
import FavoritesPage from './pages/FavoritesPage'
import BusRouteMapPage from './pages/BusRouteMapPage'
import TripPlannerPage from './pages/TripPlannerPage'

function App() {

  return (
    <BusProvider>
      <header>
        <h1>Winnipeg Transit Tracker</h1>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<div><h2>Home</h2><p>Welcome to the Winnipeg Transit Tracker app.</p></div>} />
          <Route path="/live-bus-tracker" element={<LiveBusTrackerPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
      <footer>
        <p>Team Members: Harsh Pandya, Khush Patel, Jack Buchholzer</p>
      </footer>
    </BusProvider>

  const [trackedBuses, setTrackedBuses] = useState<TrackedBus[]>([]);
  const [favorites, setFavorites] = useState<TrackedBus[]>([]);
  const [selectedFrom, setSelectedFrom] = useState('');
  const [selectedTo, setSelectedTo] = useState('');
  const [savedTrips, setSavedTrips] = useState<string[]>([]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<section><h2>Home</h2><p>Welcome to the Winnipeg Transit Tracker app.</p><p>Tracked Buses: {trackedBuses.length}</p></section>} />
        <Route path="/live-bus-tracker" element={<LiveBusTrackerPage trackedBuses={trackedBuses} setTrackedBuses={setTrackedBuses} favorites={favorites} setFavorites={setFavorites} />} />
        <Route path="/favorites" element={<FavoritesPage favorites={favorites} setFavorites={setFavorites} />} />
        <Route path="/bus-route-map" element={<BusRouteMapPage />} />
        <Route path="/trip-planner" element={<TripPlannerPage selectedFrom={selectedFrom} setSelectedFrom={setSelectedFrom} selectedTo={selectedTo} setSelectedTo={setSelectedTo} savedTrips={savedTrips} setSavedTrips={setSavedTrips} />} />
      </Routes>
    </Layout>
  )
}

export default App