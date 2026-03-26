import { useEffect, useState } from "react";
import type { Bus } from "../types/Bus";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Bus[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteBuses");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFavorite = (id: number) => {
    const updatedFavorites = favorites.filter((bus) => bus.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteBuses", JSON.stringify(updatedFavorites));
  };

  return (
    <section>
      <h2>Favorite Buses</h2>

      {favorites.length === 0 ? (
        <p>No favorite buses yet.</p>
      ) : (
        <ul>
          {favorites.map((bus) => (
            <li key={bus.id}>
              Route {bus.routeNumber} - {bus.destination} - ETA: {bus.eta} min - {bus.status}
              <button onClick={() => removeFavorite(bus.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default FavoritesPage;