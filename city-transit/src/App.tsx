import './App.css'
import { Routes, Route } from 'react-router-dom'
import { BusProvider } from './context/BusContext'
import { useState } from 'react'
import Layout from './layout/Layout'
import LiveBusTrackerPage from './pages/liveBusTrackerPage'
import FavoritesPage from './pages/FavoritesPage'
import BusRouteMapPage from './pages/BusRouteMapPage'
import TripPlannerPage from './pages/TripPlannerPage'
import SavedTripsPage from './pages/SavedTripsPage'

function App() {
  const [trackedBuses, setTrackedBuses] = useState<TrackedBus[]>([]);
  const [favorites, setFavorites] = useState<TrackedBus[]>([]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<section><h2>Home</h2><p>Welcome to the Winnipeg Transit Tracker app.</p><p>Tracked Buses: {trackedBuses.length}</p></section>} />
        <Route path="/live-bus-tracker" element={<LiveBusTrackerPage trackedBuses={trackedBuses} setTrackedBuses={setTrackedBuses} favorites={favorites} setFavorites={setFavorites} />} />
        <Route path="/favorites" element={<FavoritesPage favorites={favorites} setFavorites={setFavorites} />} />
        <Route path="/bus-route-map" element={<BusRouteMapPage />} />
        <Route path="/trip-planner" element={<TripPlannerPage />} />
        <Route path="/saved-trips" element={<SavedTripsPage />} />
      </Routes>
    </Layout>
  )
}

export default App
