/**
 * I.3: LiveBusTracker Component
 * 
 * Purpose:
 * This is the main component that demonstrates the complete hook-service-repository architecture.
 * It shows how all three layers work together.
 * 
 * Architecture:
 * 1. Presentation Layer: This component (LiveBusTracker)
 * 2. Hook Layer: useBuses - handles presentation logic
 * 3. Service Layer: BusService - handles business logic
 * 4. Repository Layer: BusRepository - handles data access
 * 
 * How it works:
 * - Component uses useBuses hook for presentation logic
 * - Hook uses BusService for business operations
 * - Service uses BusRepository for CRUD operations
 * - Repository manages test data (will be replaced with database in next module)
 */

import { useEffect, useState } from "react";
import { useBuses } from "../../hooks/useBuses";
import type { Bus } from "../../types/Bus";
import "./LiveBusTracker.css";

const LiveBusTracker = () => {
  const { buses, loading } = useBuses();
  const delayedBuses = buses.filter(bus => bus.status === "Delayed");
  const [displayMode, setDisplayMode] = useState<"all" | "sorted">("all");

  // Local state for simulating real-time ETA updates
  const [displayedBuses, setDisplayedBuses] = useState<Bus[]>([]);

  // Update displayed buses based on mode
  useEffect(() => {
    if (displayMode === "sorted") {
      setDisplayedBuses([...buses].sort((a, b) => a.eta - b.eta));
    } else {
      setDisplayedBuses(buses);
    }
  }, [buses, displayMode]);

  // Simulate real-time ETA updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedBuses(prev => 
        prev.map(bus => ({
          ...bus,
          eta: bus.eta > 1 ? bus.eta - 1 : 1,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div>Loading buses...</div>;
  }

  return (
    <section className="live-bus-tracker">
      <h2>Live Bus Tracker</h2>
      
      {/* Display mode toggle */}
      <div className="controls">
        <button 
          onClick={() => setDisplayMode("all")}
          className={displayMode === "all" ? "active" : ""}
        >
          All Buses
        </button>
        <button 
          onClick={() => setDisplayMode("sorted")}
          className={displayMode === "sorted" ? "active" : ""}
        >
          Sort by ETA
        </button>
      </div>

      {/* Show delayed count */}
      <p className="delayed-count">
        Delayed Buses: {delayedBuses.length}
      </p>

      {/* Bus list */}
      <div className="bus-list">
        {displayedBuses.map(bus => (
          <div key={bus.id} className={`bus-item ${bus.status.toLowerCase().replace(" ", "-")}`}>
            <h3>{bus.routeNumber}</h3>
            <p>Destination: {bus.destination}</p>
            <p>Next Stop: {bus.nextStop}</p>
            <p>ETA: {bus.eta} min</p>
            <p className="status">Status: {bus.status}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LiveBusTracker;