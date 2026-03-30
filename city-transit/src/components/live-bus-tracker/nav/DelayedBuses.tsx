import { useBuses } from "../../../hooks/useBuses";

const DelayedBuses = () => {
  const { buses } = useBuses();
  const delayedBuses = buses.filter(bus => bus.status === "Delayed");

  return (
    <div>
      <h2>Delayed Routes</h2>
      {delayedBuses.length === 0 ? (
        <p>No delayed buses</p>
      ) : (
        delayedBuses.map(bus => (
          <p key={bus.id}>{bus.routeNumber} - {bus.destination} ({bus.eta} min)</p>
        ))
      )}
    </div>
  );
};

export default DelayedBuses;
