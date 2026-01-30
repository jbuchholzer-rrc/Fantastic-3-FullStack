/**
 * @author Jack Buchholzer
 * @date Jan 9 2026
 * @Description Basic Component: Trip planner for Transit WebApp
 */

import { useState } from 'react'

type TripPlannerProps = {
  selectedFrom: string
  setSelectedFrom: (value: string) => void
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

      {/* Trip Form */}
      <div className="card">
        <select value={selectedFrom} onChange={(e) => setSelectedFrom(e.target.value)}>
          <option value="">From</option>
          <option value="Portage & Main">Portage & Main</option>
          <option value="The Forks">The Forks</option>
          <option value="Polo Park">Polo Park</option>
          <option value="St Vital Centre">St Vital Centre</option>
          <option value="U of M">U of M</option>
          <option value="Osborne Village">Osborne Village</option>
          <option value="HSC">HSC</option>
          <option value="Kildonan Place">Kildonan Place</option>
        </select>

        <select value={selectedTo} onChange={(e) => setSelectedTo(e.target.value)}>
          <option value="">To</option>
          <option value="Portage & Main">Portage & Main</option>
          <option value="The Forks">The Forks</option>
          <option value="Polo Park">Polo Park</option>
          <option value="St Vital Centre">St Vital Centre</option>
          <option value="U of M">U of M</option>
          <option value="Osborne Village">Osborne Village</option>
          <option value="HSC">HSC</option>
          <option value="Kildonan Place">Kildonan Place</option>
        </select>

        <br /><br />
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
