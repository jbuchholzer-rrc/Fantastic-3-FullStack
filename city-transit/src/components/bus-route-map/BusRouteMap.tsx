import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { useState } from "react";
import { transitRoutes } from "../../data/transitData";

export default function BusRouteMap() {
  const [selectedRouteId, setSelectedRouteId] = useState("BLUE");

  const selectedRoute = transitRoutes.find(r => r.id === selectedRouteId)!;

  const positions = selectedRoute.stops.map(stop =>
    [stop.lat, stop.lng] as [number, number]
  );

  return (
    <section>
      <h2>Bus Route Map</h2>

      {/* Route Selector */}
      <select
        value={selectedRouteId}
        onChange={(e) => setSelectedRouteId(e.target.value)}
      >
        {transitRoutes.map(route => (
          <option key={route.id} value={route.id}>
            {route.label}
          </option>
        ))}
      </select>

      {/* Map */}
      <div style={{ height: "500px", width: "100%", marginTop: "10px" }}>
        <MapContainer
          key={selectedRoute.id}
          center={positions[0]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Stops */}
          {selectedRoute.stops.map(stop => (
            <Marker key={`${selectedRoute.id}-${stop.id}`} position={[stop.lat, stop.lng]}>
              <Popup>{stop.name}</Popup>
            </Marker>
          ))}

          {/* Route Line */}
          <Polyline
            key={selectedRoute.id}
            positions={positions}
            pathOptions={{ color: selectedRoute.color, weight: 5 }}
          />
        </MapContainer>
      </div>
    </section>
  );
}
