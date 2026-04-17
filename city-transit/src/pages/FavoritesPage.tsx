/**
 * @author Jack Buchholzer
 * FavoritesPage -- shows buses the user has favorited
 *
 * Favorites are stored in the database (favorite boolean on the Bus model)
 * so they persist across page refreshes and sessions.
 */

import { Heart } from "lucide-react"
import { Link } from "react-router-dom"
import { useBuses } from "../hooks/useBuses"
import BusStatusCard from "../components/bus-status-card/busStatusCard"

const FavoritesPage = () => {
  const { buses, loading, error, toggleFavorite, deleteBus } = useBuses()
  const favorites = buses.filter((bus) => bus.favorite)

  if (loading) return <p>Loading favorites...</p>
  if (error) return <p style={{ color: "var(--color-danger)" }}>{error}</p>

  return (
    <div>
      <h2 className="page-title">Favorites</h2>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <Heart size={32} style={{ marginBottom: "0.5rem", opacity: 0.4 }} />
          <p>No favorite buses yet</p>
          <p style={{ fontSize: "0.8rem", marginTop: "0.25rem" }}>
            <Link to="/live-bus-tracker" style={{ color: "var(--color-primary)" }}>
              Go to the Live Tracker
            </Link>{" "}
            to favorite some buses
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {favorites.map((bus) => (
            <BusStatusCard
              key={bus.id}
              routeNumber={bus.routeNumber}
              destination={bus.destination}
              eta={bus.eta}
              status={bus.status}
              onRemove={() => deleteBus(bus.id)}
              onFavorite={() => toggleFavorite(bus.id, bus.favorite)}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesPage