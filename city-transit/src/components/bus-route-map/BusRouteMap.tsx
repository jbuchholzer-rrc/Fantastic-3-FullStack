/**
 * @author Jack Buchholzer
 * BusRouteMap -- scrollable route panel + leaflet map
 *
 * All real routes from the Winnipeg Transit API show up in a
 * panel on the left with their colored badges. Click one and
 * the map shows the stops along that route.
 */

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet"
import { useState, useEffect } from "react"
import { getTransitRoutes, getRouteStops, ensureTransitData } from "../../hooks/useTransit"
import RouteBadge from "../RouteBadge"
import "./BusRouteMap.css"

type TransitRoute = {
  key: number
  number: string
  name: string
  coverageType?: string | null
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

  // load all routes on mount, sync from API if DB is empty
  useEffect(() => {
    ensureTransitData()
      .then(() => getTransitRoutes())
      .then((data) => setRoutes(data))
      .catch(() => {})
  }, [])

  // when you click a route, fetch the stops along it
  const handleSelectRoute = (route: TransitRoute) => {
    const key = String(route.key)
    if (key === selectedRouteKey) return

    setSelectedRouteKey(key)
    setSelectedRoute(route)
    setLoading(true)
    setRouteStops([])

    getRouteStops(String(route.number || route.key))
      .then((data) => {
        const stops = data.stops || []
        setRouteStops(stops)
      })
      .catch(() => setRouteStops([]))
      .finally(() => setLoading(false))
  }

  // turn the API stop data into lat/lng markers
  const markers = routeStops
    .filter((s) => s.centre?.geographic)
    .map((s) => ({
      key: s.key,
      name: s.name,
      lat: parseFloat(s.centre!.geographic!.latitude),
      lng: parseFloat(s.centre!.geographic!.longitude),
    }))

  // draw a line connecting the stops
  const polylinePositions = markers.map((m) => [m.lat, m.lng] as [number, number])

  // figure out the route color from the badge style
  let routeColor = "var(--color-primary)"
  if (selectedRoute?.badgeStyle) {
    try {
      const parsed = JSON.parse(selectedRoute.badgeStyle)
      routeColor = parsed["background-color"] || routeColor
    } catch {}
  }

  // center on first stop or downtown winnipeg
  const center: [number, number] = markers.length > 0
    ? [markers[0].lat, markers[0].lng]
    : [49.8951, -97.1384]

  return (
    <div>
      <div className="route-map-layout">
        <div className="route-panel">
          <div className="route-panel-header">
            {routes.length} Routes
          </div>
          {routes.map((route) => (
            <div
              key={route.key}
              className={`route-item ${String(route.key) === selectedRouteKey ? "active" : ""}`}
              onClick={() => handleSelectRoute(route)}
            >
              <RouteBadge number={String(route.number)} badgeStyle={route.badgeStyle} />
              <div>
                <div className="route-item-name">{route.name}</div>
                {route.coverageType && (
                  <div className="route-item-coverage">{route.coverageType}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="map-wrapper">
          {loading ? (
            <div className="map-loading">Loading stops...</div>
          ) : (
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

              {polylinePositions.length > 1 && (
                <Polyline
                  positions={polylinePositions}
                  pathOptions={{ color: routeColor, weight: 4, opacity: 0.7 }}
                />
              )}
            </MapContainer>
          )}
        </div>
      </div>

    </div>
  )
}
