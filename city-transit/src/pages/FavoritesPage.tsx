import { useBusContext } from "../context/BusContext";
import BusStatusCard from "../components/bus-status-card/busStatusCard";

/**
 * I.3: FavoritesPage - Uses BusContext for shared page state (T.4)
 * Replaces prop drilling from App.tsx with useBusContext hook
 */
const FavoritesPage = () => {
  const { favorites, setFavorites } = useBusContext();

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((bus) => bus.id !== id));
  };

  return (
    <section>
      <h2>Favorites</h2>
      <div>
        {favorites.map((bus) => (
          <BusStatusCard
            key={bus.id}
            routeNumber={bus.routeNumber}
            destination={bus.destination}
            eta={bus.eta}
            status={bus.status}
            onRemove={() => removeFavorite(bus.id)}
            onFavorite={() => {}} 
            isFavorite={true}
          />
        ))}
      </div>
    </section>
  );
};

export default FavoritesPage;