import { useState } from "react";
import { useBuses } from "../hooks/useBuses";
import BusStatusCard from "../components/bus-status-card/busStatusCard";

const LiveBusTrackerPage = () => {
  const { buses, loading, error, addBus, toggleFavorite, deleteBus } = useBuses();
  const [routeInput, setRouteInput] = useState("");

  const handleAddBus = async () => {
    if (!routeInput.trim()) return;

    const destinations = [
      "Downtown",
      "Corydon",
      "Transcona",
      "Pembina",
      "Stafford",
      "St. Vital",
      "Fort Garry",
      "Waverley",
      "Selkirk",
    ];

    const randomDestination =
      destinations[Math.floor(Math.random() * destinations.length)];

    await addBus({
      routeNumber: routeInput,
      destination: randomDestination,
      nextStop: "Upcoming",
      eta: Math.floor(Math.random() * 10) + 1,
      status: Math.random() > 0.7 ? "Delayed" : "On Time",
      favorite: false,
    });

    setRouteInput("");
  };

  if (loading) return <p>Loading buses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>Live Bus Tracker</h2>

      <div>
        <input
          type="text"
          placeholder="Enter route number"
          value={routeInput}
          onChange={(e) => setRouteInput(e.target.value)}
        />
        <button onClick={handleAddBus}>Track Bus</button>
      </div>

      <div>
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
    </section>
  );
};

export default LiveBusTrackerPage;