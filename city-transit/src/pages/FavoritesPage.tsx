import { useBuses } from "../hooks/useBuses";
import BusStatusCard from "../components/bus-status-card/busStatusCard";

const FavoritesPage = () => {
  const { buses, loading, error, toggleFavorite } = useBuses();
  const favorites = buses.filter((bus) => bus.favorite);

  if (loading) return <p>Loading favorites...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite buses yet. Go to the Live Bus Tracker to favorite some.</p>
      ) : (
        <div>
          {favorites.map((bus) => (
            <BusStatusCard
              key={bus.id}
              routeNumber={bus.routeNumber}
              destination={bus.destination}
              eta={bus.eta}
              status={bus.status}
              onRemove={() => toggleFavorite(bus.id, bus.favorite)}
              onFavorite={() => toggleFavorite(bus.id, bus.favorite)}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FavoritesPage;
