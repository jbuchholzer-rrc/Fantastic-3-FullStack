import { useState } from "react";
import { useBusContext } from "../context/BusContext";
import BusStatusCard from "../components/bus-status-card/busStatusCard";

/**
 * I.3: LiveBusTrackerPage
 * 
 * Purpose:
 * This page demonstrates the use of BusContext for shared page state (T.4).
 * Instead of receiving props from App.tsx, it uses the useBusContext hook.
 * 
 * Architecture:
 * - Uses BusContext (T.4) for shared state between pages
 */

const LiveBusTrackerPage = () => {
  const { trackedBuses, setTrackedBuses, favorites, setFavorites } = useBusContext();
  const [routeInput, setRouteInput] = useState("");

  const addBus = () => {
    if (!routeInput.trim()) return;

    const destinations = ["Downtown", "Corydon", "Transcona", "Pembina", "Stafford", "St. Vital", "Fort Garry", "Waverley", "Selkirk"];
    const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];

    const newBus = {
      id: Date.now().toString(),
      routeNumber: routeInput,
      destination: randomDestination,
      nextStop: "Upcoming",
      eta: Math.floor(Math.random() * 10) + 1,
      status: Math.random() > 0.7 ? "Delayed" as const : "On Time" as const,
    };

    setTrackedBuses([...trackedBuses, newBus]);
    setRouteInput("");
  };

  const removeBus = (id: string) => {
    setTrackedBuses(trackedBuses.filter((bus) => bus.id !== id));
  };

  const toggleFavorite = (bus: typeof trackedBuses[0]) => {
    const isFav = favorites.some((fav) => fav.id === bus.id);
    if (isFav) {
      setFavorites(favorites.filter((fav) => fav.id !== bus.id));
    } else {
      setFavorites([...favorites, bus]);
    }
  };

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
        <button onClick={addBus}>Track Bus</button>
      </div>

      <div>
        {trackedBuses.map((bus) => (
          <BusStatusCard
            key={bus.id}
            routeNumber={bus.routeNumber}
            destination={bus.destination}
            eta={bus.eta}
            status={bus.status}
            onRemove={() => removeBus(bus.id)}
            onFavorite={() => toggleFavorite(bus)}
            isFavorite={favorites.some((fav) => fav.id === bus.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default LiveBusTrackerPage;