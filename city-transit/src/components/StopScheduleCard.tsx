/**
 * @author Jack Buchholzer
 * StopScheduleCard -- shows an arriving bus at a stop
 *
 * Used on the live tracker page. Takes the schedule data
 * from the Winnipeg Transit API and displays it as a card
 * with the route badge, destination, and ETA.
 */

import RouteBadge from "./RouteBadge"
import "./StopScheduleCard.css"

type StopScheduleCardProps = {
  routeNumber: string
  routeName: string
  destination: string
  etaMinutes: number
  badgeStyle?: string | null
}

function StopScheduleCard({ routeNumber, routeName, destination, etaMinutes, badgeStyle }: StopScheduleCardProps) {
  const etaClass = etaMinutes <= 3 ? "eta-soon" : "eta-normal"

  return (
    <div className="schedule-card">
      <RouteBadge number={routeNumber} badgeStyle={badgeStyle} />

      <div className="route-info">
        <div className="route-name">{routeName}</div>
        <div className="route-destination">to {destination}</div>
      </div>

      <div>
        <div className={`eta ${etaClass}`}>{etaMinutes}</div>
        <div className="eta-label">min</div>
      </div>
    </div>
  )
}

export default StopScheduleCard
