/**
 * @author Jack Buchholzer
 * @date Jan 9 2026
 * @Description Basic Component: Trip planner for Transit WebApp
 */

import { useState } from 'react'
import TripForm from './TripForm'

type TripPlannerProps = {
  selectedFrom: string
  setSelectedFrom: (value: string) => void
  selectedTo: string
  setSelectedTo: (value: string) => void
  savedTrips: string[]
  setSavedTrips: React.Dispatch<React.SetStateAction<string[]>>
}

function TripPlanner({ selectedFrom, setSelectedFrom }: TripPlannerProps) {
  const [selectedTo, setSelectedTo] = useState('')
  const [savedTrips, setSavedTrips] = useState<string[]>([])

  // add trip to saved list
  function handleSaveTrip() {
    if (selectedFrom && selectedTo) {
      const trip = selectedFrom + ' to ' + selectedTo
      setSavedTrips([...savedTrips, trip])
    }
  }

  // remove trip from list
  function handleRemoveTrip(index: number) {
    const newTrips = savedTrips.filter((_, i) => i !== index)
    setSavedTrips(newTrips)
  }

  return (
    <div>
      <h2>Trip Planner</h2>

      {/* Shows current selection in real time */}
      <p>From: {selectedFrom || 'not selected'}</p>
      <p>To: {selectedTo || 'not selected'}</p>

      {/* Trip Form Component */}
      <div className="card">
        <TripForm
          selectedFrom={selectedFrom}
          setSelectedFrom={setSelectedFrom}
          selectedTo={selectedTo}
          setSelectedTo={setSelectedTo}
        />
        <br />
        <button onClick={handleSaveTrip}>Save Trip</button>
      </div>

      {/* Saved Trips List */}
      <h3>Saved Trips</h3>
      {savedTrips.length === 0 ? (
        <p>No saved trips yet</p>
      ) : (
        <ul>
          {savedTrips.map((trip, index) => (
            <li key={index}>
              {trip} <button onClick={() => handleRemoveTrip(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TripPlanner
