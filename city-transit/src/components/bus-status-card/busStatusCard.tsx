import { Heart, Trash2 } from "lucide-react"
import "./busStatusCard.css"

type BusStatusCardProps = {
  routeNumber: string
  destination: string
  eta: number
  status: string
  onRemove: () => void
  onFavorite: () => void
  isFavorite: boolean
}

const BusStatusCard = ({
  routeNumber,
  destination,
  eta,
  status,
  onRemove,
  onFavorite,
  isFavorite,
}: BusStatusCardProps) => {
  const statusClass = status === "On Time" ? "status-on-time" : "status-delayed"

  return (
    <div className="bus-card">
      <div className="bus-card-badge">{routeNumber}</div>

      <div className="bus-card-info">
        <div className="bus-card-destination">{destination}</div>
        <div className="bus-card-meta">
          <span>{eta} min</span>
          <span className={statusClass}>{status}</span>
        </div>
      </div>

      <div className="bus-card-actions">
        <button
          className="btn-ghost"
          onClick={onFavorite}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={16} fill={isFavorite ? "var(--color-danger)" : "none"} color={isFavorite ? "var(--color-danger)" : "var(--color-text-light)"} />
        </button>
        <button className="btn-ghost" onClick={onRemove} title="Remove">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}

export default BusStatusCard
