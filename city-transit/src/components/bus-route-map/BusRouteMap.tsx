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
          width="100"
          height="180"
          role="img"
          aria-label="Static illustration of bus routes"
        >
          <line
            x1="50"
            y1="20"
            x2="50"
            y2="160"
            stroke="#003A8F"
            strokeWidth="4"
          />
          {stops.map((stop, index) => (
            <circle
              key={stop.id}
              cx="50"
              cy={20 + index * 35}
              r="6"
              fill="#003A8F"
            />
          ))}
        </svg>

        <ul className="stop-list">
          {stops.map((stop, index) => (
            <li key={stop.id} style={{ marginTop: index === 0 ? '0' : '1rem' }}>
              <button type="button">{stop.name}</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
