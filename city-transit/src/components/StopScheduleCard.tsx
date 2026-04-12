/**
 * @author Jack Buchholzer
 * StopScheduleCard -- shows an arriving bus at a stop
 *
 * Used on the live tracker page. Takes the schedule data
 * from the Winnipeg Transit API and displays it as a card
 * with the route badge, destination, and ETA.
 */

import { Heart } from "lucide-react"
import RouteBadge from "./RouteBadge"
import "./StopScheduleCard.css"

type StopScheduleCardProps = {
  routeNumber: string
  routeName: string
  destination: string
  etaMinutes: number
  badgeStyle?: string | null
  onFavorite?: () => void
  isFavorite?: boolean
}

function StopScheduleCard({ routeNumber, routeName, destination, etaMinutes, badgeStyle, onFavorite, isFavorite }: StopScheduleCardProps) {
  const etaClass = etaMinutes <= 3 ? "eta-soon" : "eta-normal"

  return (
    <div className="schedule-card">
      <RouteBadge number={routeNumber} badgeStyle={badgeStyle} />

      <div className="route-info">
        <div className="route-name">{routeName}</div>
        <div className="route-destination">to {destination}</div>
      </div>

      {onFavorite && (
        <button
          className="btn-ghost"
          onClick={onFavorite}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          style={{ padding: "0.3rem" }}
        >
          <Heart
            size={16}
            fill={isFavorite ? "var(--color-danger)" : "none"}
            color={isFavorite ? "var(--color-danger)" : "var(--color-text-light)"}
          />
        </button>
      )}

      <div className="eta-block">
        <div className={`eta ${etaClass}`}>{etaMinutes}</div>
        <div className="eta-label">min</div>
      </div>
    </div>
  )
}

export default StopScheduleCard
