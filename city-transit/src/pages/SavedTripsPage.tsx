/**
 * @author Jack Buchholzer
 * SavedTripsPage -- shows all trips stored in the database
 *
 * How it works:
 *   - useTrips hook provides the saved trips list and remove function
 *   - tripService is used for trip stats (shows the service
 *     being used in a second place, separate from the hook)
 *
 * Updated for Sprint 4: trips are loaded from the backend database,
 * so they persist across page refreshes and sessions.
 */

import useTrips from '../hooks/useTrips'
import type { Trip } from '../types/trip'

function SavedTripsPage() {
  const { savedTrips, loading, error, handleRemoveSavedTrip } = useTrips()

  if (loading) return <p>Loading saved trips...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h2>Saved Trips</h2>

      {savedTrips.length === 0 ? (
        <p>No saved trips yet. Go to the Trip Planner to create and save trips.</p>
      ) : (
        <ul>
          {savedTrips.map((trip: Trip) => (
            <li key={trip.id}>
              <strong>Route {trip.route}</strong> -- {trip.from} to {trip.to}
              {' | '}{trip.departureTime} - {trip.arrivalTime}
              {' | '}{trip.duration} min
              {' '}
              <button onClick={() => handleRemoveSavedTrip(trip.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SavedTripsPage
