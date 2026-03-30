import { useState } from "react";
import { useStops } from "../hooks/useStops";
import BusRouteMap from "../components/bus-route-map/BusRouteMap";

function BusRouteMapPage() {
  const { stops, addStop, deleteStop } = useStops();
  const [newStop, setNewStop] = useState("");

  const handleAdd = async () => {
    if (newStop.trim() === "") {
      alert("Stop name cannot be empty");
      return;
    }

    await addStop(newStop);
    setNewStop("");
  };

  return (
    <section>
      <h2>Bus Route Map</h2>

      <input
        type="text"
        placeholder="Enter stop name"
        value={newStop}
        onChange={(e) => setNewStop(e.target.value)}
      />

      <button onClick={handleAdd}>Add Stop</button>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
        {stops.map((stop: any) => (
          <li
            key={stop.id}
            style={{
              marginBottom: "0.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {stop.name}

            <button
              onClick={() => deleteStop(stop.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <BusRouteMap />
    </section>
  );
}

export default BusRouteMapPage;
