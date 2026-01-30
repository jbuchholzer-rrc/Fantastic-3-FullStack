import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import TripPlanner from './TripPlanner'

function App() {
  // Shared state managed at top level
  const [selectedFrom, setSelectedFrom] = useState('')

  return (
    <Routes>
      <Route
        path="/"
        element={<TripPlanner selectedFrom={selectedFrom} setSelectedFrom={setSelectedFrom} />}
      />
    </Routes>
  )
}

export default App
