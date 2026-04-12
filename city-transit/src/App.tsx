import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import HomePage from './pages/HomePage'
import LiveBusTrackerPage from './pages/liveBusTrackerPage'
import FavoritesPage from './pages/FavoritesPage'
import BusRouteMapPage from './pages/BusRouteMapPage'
import TripPlannerPage from './pages/TripPlannerPage'
import SavedTripsPage from './pages/SavedTripsPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/live-bus-tracker" element={<LiveBusTrackerPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/bus-route-map" element={<BusRouteMapPage />} />
        <Route path="/trip-planner" element={<TripPlannerPage />} />
        <Route path="/saved-trips" element={<SavedTripsPage />} />
      </Routes>
    </Layout>
  )
}

export default App
