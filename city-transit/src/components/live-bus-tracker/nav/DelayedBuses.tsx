/**
 * I.3: DelayedBuses Component
 * 
 * Purpose:
 * This component displays a list of delayed bus routes.
 * It demonstrates the use of the useBuses hook (T.1).
 * 
 * Architecture:
 * - Uses useBuses hook to get delayed buses
 * - Hook uses BusService for business logic
 * - Service uses BusRepository for data access
 */

import { useBuses } from "../../../hooks/useBuses";

const DelayedBuses = () => {
  const { delayedBuses } = useBuses();

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