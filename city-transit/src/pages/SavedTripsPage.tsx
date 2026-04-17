/**
 * @author Jack Buchholzer
 * SavedTripsPage -- shows all trips stored in the database
 *
 * Click on a saved trip to re-plan it and see the step by step
 * directions from the Winnipeg Transit API.
 */

import { useState } from "react"
import { Trash2, Clock, ChevronDown, ChevronUp } from "lucide-react"
import { SignInButton } from "@clerk/clerk-react"
import useTrips from "../hooks/useTrips"
import { getTripPlan } from "../hooks/useTransit"
import TripSegment from "../components/TripSegment"
import type { Trip } from "../types/trip"

// same locations list from the trip planner so we can look up coords
const LOCATIONS: Record<string, string> = {
  "Portage and Main": "geo/49.8951,-97.1384",
  "University of Manitoba": "geo/49.8094,-97.1327",
  "The Forks": "geo/49.8889,-97.1313",
  "Polo Park": "geo/49.8815,-97.1973",
  "St Vital Centre": "geo/49.8286,-97.1130",
  "Kildonan Place": "geo/49.8957,-97.0474",
  "Health Sciences Centre": "geo/49.9037,-97.1642",
  "City Hall": "geo/49.8988,-97.1376",
  "Osborne Village": "geo/49.8814,-97.1470",
  "RRC Polytech Notre Dame": "geo/49.9044,-97.2030",
}

type PlanSegment = {
  type: "walk" | "ride" | "transfer"
  from: string
  to: string
  duration?: number
  routeNumber?: string
  time?: string
}

function SavedTripsPage() {
  const { savedTrips, loading, error, isSignedIn, handleRemoveSavedTrip } = useTrips()
  const [expandedTripId, setExpandedTripId] = useState<number | null>(null)
  const [segments, setSegments] = useState<PlanSegment[]>([])
  const [planLoading, setPlanLoading] = useState(false)

  // when you click a trip, re-plan it to show the steps
  const handleExpandTrip = async (trip: Trip) => {
    // if already expanded, collapse it
    if (expandedTripId === trip.id) {
      setExpandedTripId(null)
      setSegments([])
      return
    }

    setExpandedTripId(trip.id)
    setSegments([])
    setPlanLoading(true)

    // look up the geo coordinates for this trip's origin and destination
    const originGeo = LOCATIONS[trip.from]
    const destGeo = LOCATIONS[trip.to]

    if (!originGeo || !destGeo) {
      setPlanLoading(false)
      return
    }

    try {
      const data = await getTripPlan(originGeo, destGeo)
      const plans = data.plans || []
      if (plans.length === 0) {
        setPlanLoading(false)
        return
      }

      const plan = plans[0]
      const planSegments: PlanSegment[] = []

      for (const seg of plan.segments || []) {
        const segType = seg.type as string

        if (segType === "walk") {
          const walk = seg.walk || seg
          planSegments.push({
            type: "walk",
            from: walk.from?.name || walk.from?.origin?.name || "Start",
            to: walk.to?.name || walk.to?.destination?.name || "End",
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
      setSegments([])
    } finally {
      setPlanLoading(false)
    }
  }

  if (!isSignedIn) {
    return (
      <div>
        <h2 className="page-title">Saved Trips</h2>
        <div className="empty-state">
          <Clock size={32} style={{ marginBottom: "0.5rem", opacity: 0.4 }} />
          <p>Sign in to view your saved trips</p>
          <SignInButton mode="modal">
            <button className="btn-primary" style={{ marginTop: "0.5rem" }}>Sign In</button>
          </SignInButton>
        </div>
      </div>
    )
  }

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
            <div key={trip.id}>
              <div
                className="card"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", cursor: "pointer" }}
                onClick={() => handleExpandTrip(trip)}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{ color: "var(--color-primary)" }}>Route {trip.route}</span>
                    {trip.from} to {trip.to}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-light)", marginTop: "0.15rem" }}>
                    {trip.duration} min | ${trip.fare.toFixed(2)} | {trip.status}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.35rem", alignItems: "center" }}>
                  {expandedTripId === trip.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  <button className="btn-ghost" onClick={(e) => { e.stopPropagation(); handleRemoveSavedTrip(trip.id) }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {expandedTripId === trip.id && (
                <div style={{ borderLeft: "2px solid var(--color-primary)", marginLeft: "1rem", marginTop: "0.25rem" }}>
                  {planLoading && <p style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>Loading directions...</p>}
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
                  {!planLoading && segments.length === 0 && (
                    <p style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", color: "var(--color-text-light)" }}>
                      Could not load directions for this trip
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedTripsPage
