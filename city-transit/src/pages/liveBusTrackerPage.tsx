import { useState } from "react";
import BusStatusCard from "../components/bus-status-card/busStatusCard";

interface TrackedBus {
  id: number;
  routeNumber: string;
  destination: string;
  eta: number;
  status: "On Time" | "Delayed";
}

interface LiveBusTrackerPageProps {
  trackedBuses: TrackedBus[];
  setTrackedBuses: React.Dispatch<React.SetStateAction<TrackedBus[]>>;
  favorites: TrackedBus[];
  setFavorites: React.Dispatch<React.SetStateAction<TrackedBus[]>>;
}

const LiveBusTrackerPage = ({ trackedBuses, setTrackedBuses, favorites, setFavorites }: LiveBusTrackerPageProps) => {
  const [routeInput, setRouteInput] = useState("");

  const addBus = () => {
    if (!routeInput.trim()) return;

    const destinations = ["Downtown", "Corydon", "Transcona", "Pembina", "Stafford"," St. Vital"," Fort Garry","Waverley","selkirk"];
    const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];

    const newBus: TrackedBus = {
      id: Date.now(),
      routeNumber: routeInput,
      destination: randomDestination,
      eta: Math.floor(Math.random() * 10) + 1,
      status: Math.random() > 0.7 ? "Delayed" : "On Time",
    };

    setTrackedBuses([...trackedBuses, newBus]);
    setRouteInput("");
  };

  const removeBus = (id: number) => {
    setTrackedBuses(trackedBuses.filter((bus) => bus.id !== id));
  };

  const toggleFavorite = (bus: TrackedBus) => {
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

      {/* I.2 – Form Component */}
      <div>
        <input
          type="text"
          placeholder="Enter route number"
          value={routeInput}
          onChange={(e) => setRouteInput(e.target.value)}
        />
        <button onClick={addBus}>Track Bus</button>
      </div>

      {/* I.3 – List with add/remove */}
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