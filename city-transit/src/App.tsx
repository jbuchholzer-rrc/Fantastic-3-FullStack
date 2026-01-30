import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import TripPlanner from './TripPlanner'
import BusRouteMap from './components/bus-route-map/BusRouteMap'

function App() {
  const [selectedFrom, setSelectedFrom] = useState('')

  return (
    <div className="app">
      <header className="app-header">
        <h1>City Transit Planner</h1>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<TripPlanner selectedFrom={selectedFrom} setSelectedFrom={setSelectedFrom} />} />
          <Route path="/map" element={<BusRouteMap />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>Team Members: Khush, Harsh, Jack</p>
      </footer>
    </div>
  )
}

export default App
