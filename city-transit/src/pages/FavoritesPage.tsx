import BusStatusCard from "../components/bus-status-card/busStatusCard";

interface TrackedBus {
  id: number;
  routeNumber: string;
  destination: string;
  eta: number;
  status: "On Time" | "Delayed";
}

interface FavoritesPageProps {
  favorites: TrackedBus[];
  setFavorites: React.Dispatch<React.SetStateAction<TrackedBus[]>>;
}

const FavoritesPage = ({ favorites, setFavorites }: FavoritesPageProps) => {
  const removeFavorite = (id: number) => {
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