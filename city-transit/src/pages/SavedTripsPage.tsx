/**
 * @author Jack Buchholzer
 * SavedTripsPage — second page that uses the useTrips hook
 *
 * How it works:
 *   - useTrips hook provides the saved trips list and remove function
 *   - tripService is used directly here for trip stats (shows the service
 *     being used in a second place, separate from the hook)
 *
 * Why this page exists:
 *   - Demonstrates the hook being reused across multiple components
 *   - Demonstrates the service being called from a component (not just the hook)
 */

import useTrips from '../hooks/useTrips'
import tripService from '../services/TripService'
import type { Trip } from '../types/Trip'

function SavedTripsPage() {
  // hook gives us saved trips and the remove function
  const { savedTrips, handleRemoveSavedTrip } = useTrips()

  // calling the service directly for stats (service used in 2 places now)
  const stats = tripService.getTripStats()

  return (
    <div>
      <h2>Saved Trips</h2>

      {/* trip stats from the service */}
      <div className="card">
        <h3>Trip Stats</h3>
        <p>Total trips in system: {stats.totalTrips}</p>
        <p>Scheduled: {stats.scheduled}</p>
        <p>Completed: {stats.completed}</p>
        <p>Cancelled: {stats.cancelled}</p>
        <p>Average duration: {stats.avgDuration} min</p>
      </div>

      {/* saved trips from the hook */}
      <h3>Your Saved Trips</h3>
      {savedTrips.length === 0 ? (
        <p>No saved trips yet. Go to the Trip Planner to search and save trips.</p>
      ) : (
        <ul>
          {savedTrips.map((trip: Trip) => (
            <li key={trip.id}>
              <strong>Route {trip.route}</strong> — {trip.from} to {trip.to}
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
