import './App.css'
import { Routes, Route } from 'react-router-dom'
import { BusProvider } from './context/BusContext'
import { useState } from 'react'
import Layout from './layout/Layout'
import LiveBusTrackerPage from './pages/liveBusTrackerPage'
import FavoritesPage from './pages/FavoritesPage'
import BusRouteMapPage from './pages/BusRouteMapPage'
import TripPlannerPage from './pages/TripPlannerPage'

function App() {
  const [selectedFrom, setSelectedFrom] = useState('');
  const [selectedTo, setSelectedTo] = useState('');
  const [savedTrips, setSavedTrips] = useState<string[]>([]);

  return (
    <BusProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<section><h2>Home</h2><p>Welcome to the Winnipeg Transit Tracker app.</p></section>} />
          <Route path="/live-bus-tracker" element={<LiveBusTrackerPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/bus-route-map" element={<BusRouteMapPage />} />
          <Route path="/trip-planner" element={<TripPlannerPage selectedFrom={selectedFrom} setSelectedFrom={setSelectedFrom} selectedTo={selectedTo} setSelectedTo={setSelectedTo} savedTrips={savedTrips} setSavedTrips={setSavedTrips} />} />
        </Routes>
      </Layout>
    </BusProvider>
  )
}

export default App
