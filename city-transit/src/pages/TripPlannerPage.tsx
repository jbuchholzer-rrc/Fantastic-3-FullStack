/**
 * @author Jack Buchholzer
 * TripPlannerPage -- refactored to use hook -> service -> repository
 *
 * How it works:
 *   - useTrips hook handles all the UI state (form selections, results, saved trips)
 *   - The hook calls tripService for business logic (searching, filtering)
 *   - tripService calls tripRepository which now hits the backend API
 *
 * Updated for Sprint 4: trips are persisted in the database.
 * Creating a trip saves it to the backend, and it stays after refresh.
 */

import useTrips from '../hooks/useTrips'
import TripForm from '../components/TripForm'
import type { Trip } from '../types/trip'

function TripPlannerPage() {
  const {
    stops,
    selectedFrom,
    selectedTo,
    setSelectedFrom,
    setSelectedTo,
    searchResults,
    savedTrips,
    loading,
    error,
    handleSearch,
    handleCreateTrip,
    handleRemoveSavedTrip,
  } = useTrips()

  if (loading) return <p>Loading trips...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h2>Trip Planner</h2>

      {/* current selection */}
      <p>From: {selectedFrom || 'not selected'}</p>
      <p>To: {selectedTo || 'not selected'}</p>

      {/* TripForm handles the dropdowns, stop names come from the hook */}
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
        <button onClick={handleCreateTrip}>Save New Trip</button>
      </div>

      {/* search results */}
      <h3>Search Results</h3>
      {searchResults.length === 0 ? (
        <p>No trips found. Try searching above.</p>
      ) : (
        <ul>
          {searchResults.map((trip: Trip) => (
            <li key={trip.id}>
              <strong>Route {trip.route}</strong> -- {trip.from} to {trip.to}
              {' | '}{trip.departureTime} - {trip.arrivalTime}
              {' | '}{trip.duration} min
              {' | '}${trip.fare.toFixed(2)}
              {' | '}{trip.status}
            </li>
          ))}
        </ul>
      )}

      {/* saved trips from the database */}
      <h3>Saved Trips</h3>
      {savedTrips.length === 0 ? (
        <p>No saved trips yet</p>
      ) : (
        <ul>
          {savedTrips.map((trip: Trip) => (
            <li key={trip.id}>
              Route {trip.route} -- {trip.from} to {trip.to}
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
