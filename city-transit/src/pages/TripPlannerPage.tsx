import { useState } from "react"
import { Navigation, Trash2, Save } from "lucide-react"
import { useAuth } from "@clerk/clerk-react"
import { SignInButton } from "@clerk/clerk-react"
import { getTripPlan } from "../hooks/useTransit"
import tripRepository from "../repositories/tripRepository"
import useTrips from "../hooks/useTrips"
import TripSegment from "../components/TripSegment"
import type { Trip } from "../types/Trip"
import "./TripPlannerPage.css"

// popular winnipeg locations with their coordinates
// the transit trip planner API needs locations as geo/lat,lng
const LOCATIONS = [
  { name: "Portage and Main", value: "geo/49.8951,-97.1384" },
  { name: "University of Manitoba", value: "geo/49.8094,-97.1327" },
  { name: "The Forks", value: "geo/49.8889,-97.1313" },
  { name: "Polo Park", value: "geo/49.8815,-97.1973" },
  { name: "St Vital Centre", value: "geo/49.8286,-97.1130" },
  { name: "Kildonan Place", value: "geo/49.8957,-97.0474" },
  { name: "Health Sciences Centre", value: "geo/49.9037,-97.1642" },
  { name: "City Hall", value: "geo/49.8988,-97.1376" },
  { name: "Osborne Village", value: "geo/49.8814,-97.1470" },
  { name: "RRC Polytech Notre Dame", value: "geo/49.9044,-97.2030" },
]

type LatLng = { lat: number, lng: number }

type PlanSegment = {
  type: "walk" | "ride" | "transfer"
  from: string
  to: string
  duration?: number
  routeNumber?: string
  time?: string
  fromCoord?: LatLng
  toCoord?: LatLng
}

function TripPlannerPage() {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [segments, setSegments] = useState<PlanSegment[]>([])
  const [fare, setFare] = useState<number | null>(null)
  const [planLoading, setPlanLoading] = useState(false)
  const [planError, setPlanError] = useState("")

  const [tripSaved, setTripSaved] = useState(false)

  const { isSignedIn } = useAuth()
  const { getToken } = useAuth()
  const { savedTrips, loading, handleRemoveSavedTrip } = useTrips()

  // save the current planned trip to our database
  const handleSaveTrip = async () => {
    if (segments.length === 0) return

    const token = await getToken()

    // figure out the total duration and route from the segments
    const totalDuration = segments.reduce((sum, s) => sum + (s.duration || 0), 0)
    const rideSegment = segments.find((s) => s.type === "ride")
    const routeName = rideSegment?.routeNumber || "Walk"

    const originName = LOCATIONS.find(l => l.value === origin)?.name || "Unknown"
    const destName = LOCATIONS.find(l => l.value === destination)?.name || "Unknown"

    await tripRepository.addTrip({
      from: originName,
      to: destName,
      route: routeName,
      departureTime: rideSegment?.time || "Now",
      arrivalTime: "TBD",
      duration: totalDuration,
      fare: 3.15,
      status: "scheduled",
    }, token)

    setTripSaved(true)
    setTimeout(() => setTripSaved(false), 3000)
  }

  const handlePlanTrip = async () => {
    setTripSaved(false)
    if (!origin || !destination) return
    if (origin === destination) {
      setPlanError("Pick two different locations")
      return
    }

    setPlanLoading(true)
    setPlanError("")
    setSegments([])

    try {
      const data = await getTripPlan(origin, destination)

      const plans = data.plans || []
      if (plans.length === 0) {
        setPlanError("No routes found between those locations.")
        return
      }

      const plan = plans[0]

      // grab the fare if the API returns it
      const planFare = plan.costs?.adult || plan.fare?.adult || null
      setFare(planFare ? parseFloat(planFare) : null)

      const planSegments: PlanSegment[] = []

      // helper to pull lat/lng from the API's geographic object
      const getCoord = (obj: any): LatLng | undefined => {
        const geo = obj?.centre?.geographic || obj?.geographic
        if (geo) return { lat: parseFloat(geo.latitude), lng: parseFloat(geo.longitude) }
        // the origin/destination come back as geo/lat,lng strings
        const point = obj?.origin?.point || obj?.destination?.point || obj?.point
        if (point?.geographic) return { lat: parseFloat(point.geographic.latitude), lng: parseFloat(point.geographic.longitude) }
        return undefined
      }

      for (const seg of plan.segments || []) {
        const segType = seg.type as string

        if (segType === "walk") {
          const walk = seg.walk || seg
          planSegments.push({
            type: "walk",
            from: walk.from?.name || walk.from?.origin?.name || "Start",
            to: walk.to?.name || walk.to?.destination?.name || "End",
            duration: walk.times?.durations?.total,
            fromCoord: getCoord(walk.from?.stop || walk.from?.origin || walk.from),
            toCoord: getCoord(walk.to?.stop || walk.to?.destination || walk.to),
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
            fromCoord: getCoord(ride.from?.stop),
            toCoord: getCoord(ride.to?.stop),
          })
        } else if (segType === "transfer") {
          const transfer = seg.transfer || seg
          planSegments.push({
            type: "transfer",
            from: transfer.from?.stop?.name || "Stop",
            to: transfer.to?.stop?.name || "Stop",
            duration: transfer.times?.durations?.total,
            fromCoord: getCoord(transfer.from?.stop),
            toCoord: getCoord(transfer.to?.stop),
          })
        }
      }

      setSegments(planSegments)
    } catch {
      setPlanError("Could not plan trip. Try different locations.")
    } finally {
      setPlanLoading(false)
    }
  }

  return (
    <div className="trip-planner">
      <h2 className="page-title">Trip Planner</h2>

      <div className="card trip-form">
        <div className="trip-form-row">
          <label>From</label>
          <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
            <option value="">Select origin</option>
            {LOCATIONS.map((loc) => (
              <option key={loc.name} value={loc.value}>{loc.name}</option>
            ))}
          </select>
        </div>
        <div className="trip-form-row">
          <label>To</label>
          <select value={destination} onChange={(e) => setDestination(e.target.value)}>
            <option value="">Select destination</option>
            {LOCATIONS.map((loc) => (
              <option key={loc.name} value={loc.value}>{loc.name}</option>
            ))}
          </select>
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
            <span>{LOCATIONS.find(l => l.value === origin)?.name} to {LOCATIONS.find(l => l.value === destination)?.name}</span>
            <span>{fare ? `$${fare.toFixed(2)}` : ""} {segments.length} steps</span>
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.25rem" }}>
            <p className="trip-plan-note">
              Powered by Winnipeg Transit Open Data
            </p>
            {isSignedIn ? (
              <button
                className="btn-primary"
                onClick={handleSaveTrip}
                style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                <Save size={14} />
                {tripSaved ? "Saved!" : "Save Trip"}
              </button>
            ) : (
              <SignInButton mode="modal">
                <button className="btn-ghost" style={{ fontSize: "0.8rem" }}>
                  Sign in to save trips
                </button>
              </SignInButton>
            )}
          </div>
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