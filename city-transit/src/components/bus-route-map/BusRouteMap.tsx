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
  const [selectedRoute, setSelectedRoute] = useState<TransitRoute | null>(null)
  const [routeStops, setRouteStops] = useState<RouteStop[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    ensureTransitData()
      .then(() => getTransitRoutes())
      .then((data) => setRoutes(data))
  }, [])

  const handleSelectRoute = (route: TransitRoute) => {
    setSelectedRoute(route)
    setLoading(true)
    setRouteStops([])

    getRouteStops(String(route.number || route.key))
      .then((data) => setRouteStops(data.stops || []))
      .finally(() => setLoading(false))
  }

  const filteredRoutes = routes.filter((route) =>
    route.number.toLowerCase().includes(search.toLowerCase()) ||
    route.name.toLowerCase().includes(search.toLowerCase())
  )

  const markers = routeStops
    .filter((s) => s.centre?.geographic)
    .map((s) => ({
      key: s.key,
      name: s.name,
      lat: parseFloat(s.centre!.geographic!.latitude),
      lng: parseFloat(s.centre!.geographic!.longitude),
    }))

  const polylinePositions = markers.map((m) => [m.lat, m.lng] as [number, number])

  let routeColor = "#003a8f"
  if (selectedRoute?.badgeStyle) {
    try {
      const parsed = JSON.parse(selectedRoute.badgeStyle)
      routeColor = parsed["background-color"] || routeColor
    } catch {}
  }

  const center: [number, number] =
    markers.length > 0
      ? [markers[0].lat, markers[0].lng]
      : [49.8951, -97.1384]

  return (
    <div>
      <div className="route-map-layout">

        <div className="route-panel">

          <div style={{ padding: "10px" }}>
            <input
              type="text"
              placeholder="Search route (e.g. F8, D16)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc"
              }}
            />
          </div>

          <div className="route-panel-header">
            {filteredRoutes.length} Routes
          </div>

          {filteredRoutes.map((route) => (
            <div
              key={route.key}
              className={`route-item ${selectedRoute?.key === route.key ? "active" : ""}`}
              onClick={() => handleSelectRoute(route)}
            >
              <RouteBadge number={route.number} badgeStyle={route.badgeStyle} />
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
              zoom={13}
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
                  pathOptions={{
                    color: routeColor,
                    weight: 5,
                    opacity: 0.9,
                  }}
                />
              )}
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  )
}