/**
 * @author Jack Buchholzer
 * LiveBusTrackerPage -- real-time bus arrivals for any stop
 *
 * Enter a Winnipeg Transit stop number and see live arriving buses
 * with route badges, destinations, and ETAs from the real API.
 * Also keeps the manual bus tracking feature from earlier sprints.
 */

import { useState } from "react"
import { Search } from "lucide-react"
import { getStopSchedule } from "../hooks/useTransit"
import { useBuses } from "../hooks/useBuses"
import StopScheduleCard from "../components/StopScheduleCard"
import BusStatusCard from "../components/bus-status-card/busStatusCard"
import "./liveBusTrackerPage.css"

type ScheduleEntry = {
  routeNumber: string
  routeName: string
  destination: string
  etaMinutes: number
  badgeStyle?: string | null
}

function LiveBusTrackerPage() {
  const [stopKey, setStopKey] = useState("")
  const [stopName, setStopName] = useState("")
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([])
  const [scheduleLoading, setScheduleLoading] = useState(false)
  const [scheduleError, setScheduleError] = useState("")

  // also keep the manual bus tracking from sprint 4
  const { buses, loading, error, addBus, toggleFavorite, deleteBus } = useBuses()

  // look up the live schedule for a stop number
  const handleSearch = async () => {
    const key = parseInt(stopKey)
    if (isNaN(key)) return

    setScheduleLoading(true)
    setScheduleError("")
    setSchedule([])

    try {
      const data = await getStopSchedule(key)

      // grab the stop name from the response
      const stop = data["stop-schedule"]?.stop || data.stopSchedule?.stop
      if (stop) {
        setStopName(stop.name || `Stop #${key}`)
      }

      // parse the route schedules into a flat list of arriving buses
      const routeSchedules = data["stop-schedule"]?.["route-schedules"]
        || data.stopSchedule?.routeSchedules
        || []

      const entries: ScheduleEntry[] = []

      for (const rs of routeSchedules) {
        const route = rs.route || {}
        const stops = rs["scheduled-stops"] || rs.scheduledStops || []

        for (const s of stops) {
          // figure out the ETA from the estimated or scheduled departure
          const times = s.times || {}
          const departure = times.departure || {}
          const estimated = departure.estimated || departure.scheduled || ""

          let etaMinutes = 0
          if (estimated) {
            const diff = new Date(estimated).getTime() - Date.now()
            etaMinutes = Math.max(0, Math.round(diff / 60000))
          }

          // get the destination from the variant
          const variant = s.variant || {}

          entries.push({
            routeNumber: route.number || route.key?.toString() || "?",
            routeName: route.name || "",
            destination: variant.name || variant.destination?.name || "",
            etaMinutes,
          })
        }
      }

      // sort by ETA so the soonest bus is first
      entries.sort((a, b) => a.etaMinutes - b.etaMinutes)
      setSchedule(entries)
    } catch {
      setScheduleError("Could not load schedule. Check the stop number and try again.")
    } finally {
      setScheduleLoading(false)
    }
  }

  // manual bus add (kept from sprint 4 for the CRUD demo)
  const handleAddBus = async () => {
    const destinations = ["Downtown", "Corydon", "Transcona", "Pembina", "St. Vital"]
    await addBus({
      routeNumber: stopKey || "??",
      destination: destinations[Math.floor(Math.random() * destinations.length)],
      nextStop: "Upcoming",
      eta: Math.floor(Math.random() * 10) + 1,
      status: Math.random() > 0.7 ? "Delayed" : "On Time",
      favorite: false,
    })
  }

  return (
    <div className="live-tracker">
      <h2 className="page-title">Live Bus Tracker</h2>

      <div className="stop-search">
        <input
          type="text"
          placeholder="Enter stop number (e.g. 10064)"
          value={stopKey}
          onChange={(e) => setStopKey(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="btn-primary" onClick={handleSearch}>
          <Search size={16} />
        </button>
      </div>

      {stopName && (
        <div className="stop-info">
          Showing arrivals for: {stopName} (#{stopKey})
        </div>
      )}

      {scheduleLoading && <p>Loading schedule...</p>}
      {scheduleError && <p style={{ color: "var(--color-danger)" }}>{scheduleError}</p>}

      {schedule.length > 0 && (
        <div className="schedule-list">
          {schedule.map((entry, i) => (
            <StopScheduleCard
              key={i}
              routeNumber={entry.routeNumber}
              routeName={entry.routeName}
              destination={entry.destination}
              etaMinutes={entry.etaMinutes}
              badgeStyle={entry.badgeStyle}
            />
          ))}
        </div>
      )}

      <hr className="tracker-divider" />

      <div className="tracker-section-title">Your Tracked Buses</div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button className="btn-primary" onClick={handleAddBus}>Add Test Bus</button>
      </div>

      {loading && <p>Loading buses...</p>}
      {error && <p style={{ color: "var(--color-danger)" }}>{error}</p>}

      <div className="user-buses">
        {buses.map((bus) => (
          <BusStatusCard
            key={bus.id}
            routeNumber={bus.routeNumber}
            destination={bus.destination}
            eta={bus.eta}
            status={bus.status}
            onRemove={() => deleteBus(bus.id)}
            onFavorite={() => toggleFavorite(bus.id, bus.favorite)}
            isFavorite={bus.favorite}
          />
        ))}
      </div>
    </div>
  )
}

export default LiveBusTrackerPage
