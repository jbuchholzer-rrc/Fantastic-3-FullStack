/**
 * @author Jack Buchholzer
 * BusRouteMapPage -- map view of transit routes and stops
 *
 * Uses the real Winnipeg Transit API data to show routes and their
 * stops on a map. Also keeps the user custom stops feature from
 * Khush's sprint 4 work.
 */

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { useStops } from "../hooks/useStops"
import BusRouteMap from "../components/bus-route-map/BusRouteMap"

function BusRouteMapPage() {
  const { stops, addStop, deleteStop } = useStops()
  const [newStop, setNewStop] = useState("")

  const handleAdd = async () => {
    if (newStop.trim() === "") return
    await addStop(newStop)
    setNewStop("")
  }

  return (
    <div>
      <h2 className="page-title">Route Map</h2>

      <BusRouteMap />

      <div style={{ marginTop: "1.5rem" }}>
        <h3 style={{ fontSize: "1rem", marginBottom: "0.75rem" }}>Custom Stops</h3>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <input
            type="text"
            placeholder="Add a custom stop"
            value={newStop}
            onChange={(e) => setNewStop(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            style={{ flex: 1 }}
          />
          <button className="btn-primary" onClick={handleAdd}>
            <Plus size={16} />
          </button>
        </div>

        {stops.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {stops.map((stop: any) => (
              <div key={stop.id} className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.5rem 0.75rem" }}>
                <span>{stop.name}</span>
                <button className="btn-ghost" onClick={() => deleteStop(stop.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BusRouteMapPage
