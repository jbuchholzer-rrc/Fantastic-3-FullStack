/**
 * @author Jack Buchholzer
 * TripPlannerPage — refactored to use hook -> service -> repository
 *
 * How it works:
 *   - useTrips hook handles all the UI state (form selections, results, saved trips)
 *   - The hook calls tripService for business logic (searching, filtering)
 *   - tripService calls tripRepository for data access (reading from test data)
 *
 * Why this structure:
 *   - No more prop drilling. The hook owns the state instead of passing it
 *     down from App -> TripPlanner -> TripForm.
 *   - Each layer has one job: repository = data, service = logic, hook = UI state.
 *   - When we add a real database next sprint, we only change the repository.
 */

import useTrips from '../hooks/useTrips'
import TripForm from '../components/TripForm'
import type { Trip } from '../types/Trip'

function TripPlannerPage() {
  // the hook gives us everything we need for this page
  const {
    stops,
    selectedFrom,
    selectedTo,
    setSelectedFrom,
    setSelectedTo,
    searchResults,
    savedTrips,
    handleSearch,
    handleSaveTrip,
    handleRemoveSavedTrip,
  } = useTrips()

  return (
    <div>
      <h2>Trip Planner</h2>

      {/* current selection */}
      <p>From: {selectedFrom || 'not selected'}</p>
      <p>To: {selectedTo || 'not selected'}</p>

      {/* TripForm handles the dropdowns, we pass the hook state down */}
      <div className="card">
        <TripForm
          stops={stops}
          selectedFrom={selectedFrom}
          setSelectedFrom={setSelectedFrom}
          selectedTo={selectedTo}
          setSelectedTo={setSelectedTo}
        />
        <br />
        <button onClick={handleSearch}>Search Trips</button>
      </div>

      {/* search results */}
      <h3>Available Trips</h3>
      {searchResults.length === 0 ? (
        <p>No trips found. Try searching above.</p>
      ) : (
        <ul>
          {searchResults.map((trip: Trip) => (
            <li key={trip.id}>
              <strong>Route {trip.route}</strong> — {trip.from} to {trip.to}
              {' | '}{trip.departureTime} - {trip.arrivalTime}
              {' | '}{trip.duration} min
              {' | '}${trip.fare.toFixed(2)}
              {' | '}{trip.status}
              {' '}
              <button onClick={() => handleSaveTrip(trip)}>Save</button>
            </li>
          ))}
        </ul>
      )}

      {/* saved trips */}
      <h3>Saved Trips</h3>
      {savedTrips.length === 0 ? (
        <p>No saved trips yet</p>
      ) : (
        <ul>
          {savedTrips.map((trip: Trip) => (
            <li key={trip.id}>
              Route {trip.route} — {trip.from} to {trip.to}
              {' '}
              <button onClick={() => handleRemoveSavedTrip(trip.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TripPlannerPage
