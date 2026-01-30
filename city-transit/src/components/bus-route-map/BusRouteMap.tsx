import "./BusRouteMap.css";

type Stop = {
  id: number;
  name: string;
};

const stops: Stop[] = [
  { id: 1, name: "Downtown Station" },
  { id: 2, name: "City Hall" },
  { id: 3, name: "University of Manitoba" },
  { id: 4, name: "Polo Park Mall" },
];

export default function BusRouteMap() {
  return (
    <section className="bus-route-map" aria-labelledby="route-map-title">
      <h2 id="route-map-title">Bus Route Map</h2>

      <div className="map-area">
        <svg
          width="100%"
          height="180"
          role="img"
          aria-label="Static illustration of bus routes"
        >
          <line
            x1="20"
            y1="90"
            x2="300"
            y2="90"
            stroke="#1565c0"
            strokeWidth="4"
          />
          <line
            x1="300"
            y1="90"
            x2="520"
            y2="40"
            stroke="#2e7d32"
            strokeWidth="4"
          />
        </svg>

        <ul className="stop-list">
          {stops.map((stop) => (
            <li key={stop.id}>
              <button type="button">{stop.name}</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
