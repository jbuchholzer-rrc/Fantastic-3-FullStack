/**
 * @author Jack Buchholzer
 * TripPlannerPage -- plan trips using real Winnipeg Transit data
 *
 * Uses the Winnipeg Transit trip planner API to calculate routes
 * between two locations. Shows step-by-step walking and riding
 * segments. Also keeps the saved trips feature from sprint 4.
 */

import { useState } from "react"
import { Navigation, Trash2 } from "lucide-react"
import { getTripPlan } from "../hooks/useTransit"
import useTrips from "../hooks/useTrips"
import TripSegment from "../components/TripSegment"
import type { Trip } from "../types/trip"
import "./TripPlannerPage.css"

type PlanSegment = {
  type: "walk" | "ride" | "transfer"
  from: string
  to: string
  duration?: number
  routeNumber?: string
  time?: string
}

function TripPlannerPage() {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [segments, setSegments] = useState<PlanSegment[]>([])
  const [planLoading, setPlanLoading] = useState(false)
  const [planError, setPlanError] = useState("")

  // saved trips from our database
  const { savedTrips, loading, handleRemoveSavedTrip } = useTrips()

  // call the real winnipeg transit trip planner
  const handlePlanTrip = async () => {
    if (!origin.trim() || !destination.trim()) return

    setPlanLoading(true)
    setPlanError("")
    setSegments([])

    try {
      // the API wants locations as addresses or geo coordinates
      const data = await getTripPlan(origin, destination)

      // the response has an array of trip plans, grab the first one
      const plans = data.plans || []
      if (plans.length === 0) {
        setPlanError("No routes found between those locations.")
        return
      }

      const plan = plans[0]
      const planSegments: PlanSegment[] = []

      // each plan has segments (walk, ride, transfer)
      for (const seg of plan.segments || []) {
        const segType = seg.type as string

        if (segType === "walk") {
          const walk = seg.walk || seg
          planSegments.push({
            type: "walk",
            from: walk.from?.name || walk.from?.origin?.name || origin,
            to: walk.to?.name || walk.to?.destination?.name || destination,
            duration: walk.times?.durations?.total,
          })
        } else if (segType === "ride") {
          const ride = seg.ride || seg
          const route = ride.route || {}
          planSegments.push({
            type: "ride",
            from: ride.from?.stop?.name || "Stop",
            to: ride.to?.stop?.name || "Stop",
            routeNumber: route.number || route.key?.toString(),
            duration: ride.times?.durations?.total,
            time: ride.times?.start,
          })
        } else if (segType === "transfer") {
          const transfer = seg.transfer || seg
          planSegments.push({
            type: "transfer",
            from: transfer.from?.stop?.name || "Stop",
            to: transfer.to?.stop?.name || "Stop",
            duration: transfer.times?.durations?.total,
          })
        }
      }

      setSegments(planSegments)
    } catch {
      setPlanError("Could not plan trip. Try using an address or intersection.")
    } finally {
      setPlanLoading(false)
    }
  }

  return (
    <div className="trip-planner">
      <h2 className="page-title">Trip Planner</h2>

      <div className="card trip-form">
        <div className="trip-form-row">
          <input
            type="text"
            placeholder="From (address or intersection)"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </div>
        <div className="trip-form-row">
          <input
            type="text"
            placeholder="To (address or intersection)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <button className="btn-primary" onClick={handlePlanTrip} style={{ display: "flex", alignItems: "center", gap: "0.4rem", justifyContent: "center" }}>
          <Navigation size={16} />
          Plan Trip
        </button>
      </div>

      {planLoading && <p>Planning your trip...</p>}
      {planError && <p style={{ color: "var(--color-danger)", fontSize: "0.9rem" }}>{planError}</p>}

      {segments.length > 0 && (
        <div className="trip-plan-result">
          <div className="trip-plan-header">
            <span>{origin} to {destination}</span>
            <span>{segments.length} steps</span>
          </div>
          <div className="trip-plan-segments">
            {segments.map((seg, i) => (
              <TripSegment
                key={i}
                type={seg.type}
                from={seg.from}
                to={seg.to}
                duration={seg.duration}
                routeNumber={seg.routeNumber}
                time={seg.time}
              />
            ))}
          </div>
          <p className="trip-plan-note">
            Powered by Winnipeg Transit Open Data
          </p>
        </div>
      )}

      <div className="saved-trips-section">
        <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Saved Trips</h3>

        {loading && <p>Loading...</p>}

        {savedTrips.length === 0 && !loading ? (
          <p className="empty-state">No saved trips yet</p>
        ) : (
          savedTrips.map((trip: Trip) => (
            <div key={trip.id} className="card saved-trip-card">
              <div className="saved-trip-info">
                <strong>Route {trip.route}</strong> -- {trip.from} to {trip.to}
                <div className="saved-trip-meta">
                  {trip.departureTime} - {trip.arrivalTime} | {trip.duration} min | ${trip.fare.toFixed(2)}
                </div>
              </div>
              <button className="btn-ghost" onClick={() => handleRemoveSavedTrip(trip.id)}>
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TripPlannerPage
