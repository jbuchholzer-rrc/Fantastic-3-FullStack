/**
 * @author Jack Buchholzer
 * BusRouteMap -- shows transit routes on a leaflet map
 *
 * Loads real routes from the Winnipeg Transit API (cached in our DB).
 * When you pick a route, it fetches the stops along that route
 * from the live API and plots them on the map with markers.
 */

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"
import { getTransitRoutes, getRouteStops } from "../../hooks/useTransit"
import RouteBadge from "../RouteBadge"
import "./BusRouteMap.css"

type TransitRoute = {
  key: number
  number: string
  name: string
  badgeStyle?: string | null
}

type RouteStop = {
  key: number
  name: string
  centre?: {
    geographic?: {
      latitude: string
      longitude: string
    }
  }
}

export default function BusRouteMap() {
  const [routes, setRoutes] = useState<TransitRoute[]>([])
  const [selectedRouteKey, setSelectedRouteKey] = useState("")
  const [selectedRoute, setSelectedRoute] = useState<TransitRoute | null>(null)
  const [routeStops, setRouteStops] = useState<RouteStop[]>([])
  const [loading, setLoading] = useState(false)

  // load all routes when the component mounts
  useEffect(() => {
    getTransitRoutes()
      .then((data) => setRoutes(data))
      .catch(() => {})
  }, [])

  // when a route is selected, fetch the stops along it
  useEffect(() => {
    if (!selectedRouteKey) {
      setRouteStops([])
      return
    }

    const route = routes.find((r) => String(r.key) === selectedRouteKey)
    setSelectedRoute(route || null)
    setLoading(true)

    getRouteStops(selectedRouteKey)
      .then((data) => {
        const stops = data.stops || []
        setRouteStops(stops)
      })
      .catch(() => setRouteStops([]))
      .finally(() => setLoading(false))
  }, [selectedRouteKey, routes])

  // convert the API stop data to lat/lng for the map
  const markers = routeStops
    .filter((s) => s.centre?.geographic)
    .map((s) => ({
      key: s.key,
      name: s.name,
      lat: parseFloat(s.centre!.geographic!.latitude),
      lng: parseFloat(s.centre!.geographic!.longitude),
    }))

  // center the map on the first stop or default to downtown winnipeg
  const center: [number, number] = markers.length > 0
    ? [markers[0].lat, markers[0].lng]
    : [49.8951, -97.1384]

  return (
    <div className="route-map-container">
      <div className="route-selector">
        <select
          value={selectedRouteKey}
          onChange={(e) => setSelectedRouteKey(e.target.value)}
        >
          <option value="">Pick a route</option>
          {routes.map((route) => (
            <option key={route.key} value={route.key}>
              {route.number} - {route.name}
            </option>
          ))}
        </select>

        {selectedRoute && (
          <div className="selected-badge">
            <RouteBadge number={selectedRoute.number} badgeStyle={selectedRoute.badgeStyle} />
            {selectedRoute.name}
          </div>
        )}
      </div>

      {loading && <p>Loading stops...</p>}

      <div className="map-wrapper">
        <MapContainer
          key={center.join(",")}
          center={center}
          zoom={markers.length > 0 ? 13 : 12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {markers.map((stop) => (
            <Marker key={stop.key} position={[stop.lat, stop.lng]}>
              <Popup>
                <strong>{stop.name}</strong><br />
                Stop #{stop.key}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {markers.length > 0 && (
        <div className="route-stops-list">
          {markers.map((stop) => (
            <div key={stop.key} className="route-stop-item">
              <MapPin size={14} />
              {stop.name}
              <span className="stop-key">#{stop.key}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
