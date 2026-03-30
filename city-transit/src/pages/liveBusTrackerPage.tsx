/**
 * @author Jack Buchholzer
 * LiveBusTrackerPage -- browse routes and see live arrivals
 *
 * Click a route badge to see stops along that route and live
 * bus arrivals. Uses the real Winnipeg Transit API for everything.
 */

import { useState, useEffect } from "react"
import { Radio, MapPin } from "lucide-react"
import { getTransitRoutes, getRouteStops, getStopSchedule } from "../hooks/useTransit"
import { useBuses } from "../hooks/useBuses"
import RouteBadge from "../components/RouteBadge"
import StopScheduleCard from "../components/StopScheduleCard"
import BusStatusCard from "../components/bus-status-card/busStatusCard"
import "./liveBusTrackerPage.css"

type TransitRoute = {
  key: number
  number: string
  name: string
  badgeStyle?: string | null
}

type RouteStop = {
  key: number
  name: string
}

type ScheduleEntry = {
  routeNumber: string
  routeName: string
  destination: string
  etaMinutes: number
}

function LiveBusTrackerPage() {
  const [routes, setRoutes] = useState<TransitRoute[]>([])
  const [selectedRoute, setSelectedRoute] = useState<TransitRoute | null>(null)
  const [stops, setStops] = useState<RouteStop[]>([])
  const [selectedStopKey, setSelectedStopKey] = useState<number | null>(null)
  const [selectedStopName, setSelectedStopName] = useState("")
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([])
  const [loadingStops, setLoadingStops] = useState(false)
  const [loadingSchedule, setLoadingSchedule] = useState(false)

  const { buses, addBus, toggleFavorite, deleteBus } = useBuses()

  // load all routes on mount
  useEffect(() => {
    getTransitRoutes()
      .then((data) => setRoutes(data))
      .catch(() => {})
  }, [])

  // when a route is clicked, load its stops and auto-pick the first one
  const handlePickRoute = async (route: TransitRoute) => {
    setSelectedRoute(route)
    setStops([])
    setSchedule([])
    setSelectedStopKey(null)
    setLoadingStops(true)

    try {
      const data = await getRouteStops(String(route.number || route.key))
      const routeStops = data.stops || []
      setStops(routeStops.slice(0, 10))

      // auto load the first stop's schedule
      if (routeStops.length > 0) {
        loadSchedule(routeStops[0].key, routeStops[0].name)
      }
    } catch {
      setStops([])
    } finally {
      setLoadingStops(false)
    }
  }

  // load schedule for a specific stop
  const loadSchedule = async (stopKey: number, stopName: string) => {
    setSelectedStopKey(stopKey)
    setSelectedStopName(stopName)
    setLoadingSchedule(true)
    setSchedule([])

    try {
      const data = await getStopSchedule(stopKey)
      const routeSchedules = data["stop-schedule"]?.["route-schedules"] || []
      const entries: ScheduleEntry[] = []

      for (const rs of routeSchedules) {
        const route = rs.route || {}
        const scheduled = rs["scheduled-stops"] || []

        for (const s of scheduled) {
          const times = s.times || {}
          const departure = times.departure || {}
          const estimated = departure.estimated || departure.scheduled || ""

          let etaMinutes = 0
          if (estimated) {
            const diff = new Date(estimated).getTime() - Date.now()
            etaMinutes = Math.max(0, Math.round(diff / 60000))
          }

          const variant = s.variant || {}
          entries.push({
            routeNumber: String(route.number || route.key || "?"),
            routeName: route.name || "",
            destination: variant.name || "",
            etaMinutes,
          })
        }
      }

      entries.sort((a, b) => a.etaMinutes - b.etaMinutes)
      setSchedule(entries)
    } catch {
      setSchedule([])
    } finally {
      setLoadingSchedule(false)
    }
  }

  // toggle favorite on a bus from the live schedule
  // if it already exists in our db, toggle the flag
  // if not, create it as a favorite
  const handleFavoriteFromSchedule = async (entry: ScheduleEntry) => {
    const existing = buses.find((b) => b.routeNumber === entry.routeNumber)
    if (existing) {
      await toggleFavorite(existing.id, existing.favorite)
    } else {
      await addBus({
        routeNumber: entry.routeNumber,
        destination: entry.destination,
        nextStop: selectedStopName,
        eta: entry.etaMinutes,
        status: "On Time",
        favorite: true,
      })
    }
  }

  const isRouteFavorited = (routeNumber: string) => {
    return buses.some((b) => b.routeNumber === routeNumber && b.favorite)
  }

  return (
    <div className="live-tracker">
      <h2 className="page-title">Live Bus Tracker</h2>

      <div className="route-grid">
        {routes.map((route) => (
          <div
            key={route.key}
            className={`route-chip ${selectedRoute?.key === route.key ? "selected" : ""}`}
            onClick={() => handlePickRoute(route)}
          >
            <RouteBadge number={String(route.number)} badgeStyle={route.badgeStyle} />
          </div>
        ))}
      </div>

      {loadingStops && <p>Loading stops...</p>}

      {stops.length > 0 && (
        <div className="stop-chips">
          <MapPin size={14} style={{ color: "var(--color-text-light)", flexShrink: 0 }} />
          {stops.map((stop) => (
            <button
              key={stop.key}
              className={`stop-chip ${selectedStopKey === stop.key ? "active" : ""}`}
              onClick={() => loadSchedule(stop.key, stop.name)}
            >
              {stop.name}
            </button>
          ))}
        </div>
      )}

      {selectedStopName && (
        <div className="stop-info">
          <Radio size={16} />
          Live arrivals at {selectedStopName}
        </div>
      )}

      {loadingSchedule && <p>Loading schedule...</p>}

      {schedule.length > 0 && (
        <div className="schedule-list">
          {schedule.map((entry, i) => (
            <StopScheduleCard
              key={i}
              routeNumber={entry.routeNumber}
              routeName={entry.routeName}
              destination={entry.destination}
              etaMinutes={entry.etaMinutes}
              onFavorite={() => handleFavoriteFromSchedule(entry)}
              isFavorite={isRouteFavorited(entry.routeNumber)}
            />
          ))}
        </div>
      )}

      {buses.filter(b => b.favorite).length > 0 && (
        <>
          <hr className="tracker-divider" />
          <div className="tracker-section-title">Your Favorites</div>
          <div className="user-buses">
            {buses.filter(b => b.favorite).map((bus) => (
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
        </>
      )}
    </div>
  )
}

export default LiveBusTrackerPage
