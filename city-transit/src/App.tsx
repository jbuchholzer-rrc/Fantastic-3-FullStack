import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import TripPlanner from './TripPlanner'
import LiveBusTracker from './LiveBusTracker'
import BusRouteMap from './BusRouteMap'

function App() {
  const [selectedFrom, setSelectedFrom] = useState('')

  return (
    <Routes>
      <Route path="/" element={<TripPlanner selectedFrom={selectedFrom} setSelectedFrom={setSelectedFrom} />} />
      <Route path="/live" element={<LiveBusTracker selectedFrom={selectedFrom} setSelectedFrom={setSelectedFrom} />} />
      <Route path="/map" element={<BusRouteMap selectedFrom={selectedFrom} setSelectedFrom={setSelectedFrom} />} />
    </Routes>
  )
}

export default App
