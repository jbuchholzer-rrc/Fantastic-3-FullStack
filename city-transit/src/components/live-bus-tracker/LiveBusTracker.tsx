import { useEffect, useState } from "react";
import "LiveBusTracker.css";

type BusStatus = "On Time" | "Delayed";

interface Bus {
  id: number;
  routeNumber: string;
  destination: string;
  nextStop: string;
  eta: number;
  status: BusStatus;
}

const LiveBusTracker = () => {
  const [buses, setBuses] = useState<Bus[]>([
    {
      id: 1,
      routeNumber: "D19",
      destination: "Corydon",
      nextStop: "Stafford St",
      eta: 5,
      status: "On Time",
    },
    {
      id: 2,
      routeNumber: "FX3",
      destination: "Transcona",
      nextStop: "Plessis Rd",
      eta: 12,
      status: "Delayed",
    },
    {
      id: 3,
      routeNumber: "F8",
      destination: "Pembina",
      nextStop: "Plaza Dr",
      eta: 3,
      status: "On Time",
    },
  ]);

  // Simulate real-time ETA updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prevBuses) =>
        prevBuses.map((bus) => ({
          ...bus,
          eta: bus.eta > 1 ? bus.eta - 1 : 1,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="live-bus-tracker">
      <h2>Live Bus Tracker</h2>
      <ul className="bus-list">
        {buses.map((bus: Bus) => (
          <li key={bus.id} className="bus-card">
            <div><strong>Route:</strong> {bus.routeNumber}</div>
            <div><strong>Destination:</strong> {bus.destination}</div>
            <div><strong>Next Stop:</strong> {bus.nextStop}</div>
            <div><strong>ETA:</strong> {bus.eta} min</div>
            <div><strong>Status:</strong> <span className={bus.status === "On Time" ? "status-on-time" : "status-delayed"}>{bus.status}</span></div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LiveBusTracker;