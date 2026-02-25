import { useState } from "react";
import { useStops } from "../context/StopsContext";
import BusRouteMap from "../components/bus-route-map/BusRouteMap";

function BusRouteMapPage() {
  const { stops, setStops } = useStops();
  const [newStop, setNewStop] = useState("");

  function addStop() {
    if (newStop.trim() === "") {
      alert("Stop name cannot be empty");
      return;
    }
    setStops([...stops, newStop]);
    setNewStop("");
  }

  function removeStop(index: number) {
    setStops(stops.filter((_, i) => i !== index));
  }

  return (
    <section>
      <h2>Bus Route Map</h2>

      {/* Form Component (I.2) */}
      <input
        type="text"
        placeholder="Enter stop name"
        value={newStop}
        onChange={(e) => setNewStop(e.target.value)}
      />
      <button onClick={addStop}>Add Stop</button>

      {/* Dynamic List (I.3) */}
      <ul>
        {stops.map((stop, index) => (
          <li key={index}>
            {stop}
            <button onClick={() => removeStop(index)}>❌</button>
          </li>
        ))}
      </ul>

      {/* Reusing BusRouteMap Component (I.1) */}
      <BusRouteMap />
    </section>
  );
}

export default BusRouteMapPage;