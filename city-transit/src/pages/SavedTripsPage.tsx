/**
 * @author Jack Buchholzer
 * SavedTripsPage -- shows all trips stored in the database
 *
 * Trips are loaded from the backend and persist across sessions.
 * Each trip can be removed with the delete button.
 */

import { Trash2, Clock } from "lucide-react"
import useTrips from "../hooks/useTrips"
import type { Trip } from "../types/trip"

function SavedTripsPage() {
  const { savedTrips, loading, error, handleRemoveSavedTrip } = useTrips()

  if (loading) return <p>Loading saved trips...</p>
  if (error) return <p style={{ color: "var(--color-danger)" }}>{error}</p>

  return (
    <div>
      <h2 className="page-title">Saved Trips</h2>

      {savedTrips.length === 0 ? (
        <div className="empty-state">
          <Clock size={32} style={{ marginBottom: "0.5rem", opacity: 0.4 }} />
          <p>No saved trips yet</p>
          <p style={{ fontSize: "0.8rem", marginTop: "0.25rem" }}>
            Go to the Trip Planner to create and save trips
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {savedTrips.map((trip: Trip) => (
            <div key={trip.id} className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--color-primary)" }}>Route {trip.route}</span>
                  {" -- "}{trip.from} to {trip.to}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--color-text-light)", marginTop: "0.15rem" }}>
                  {trip.departureTime} - {trip.arrivalTime} | {trip.duration} min | ${trip.fare.toFixed(2)} | {trip.status}
                </div>
              </div>
              <button className="btn-ghost" onClick={() => handleRemoveSavedTrip(trip.id)}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedTripsPage
