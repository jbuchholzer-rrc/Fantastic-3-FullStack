/**
 * @author Jack Buchholzer
 * TripSegment -- one leg of a planned trip
 *
 * Shows a walk, ride, or transfer segment from the
 * Winnipeg Transit trip planner API results.
 */

import { Footprints, Bus, ArrowLeftRight } from "lucide-react"
import RouteBadge from "./RouteBadge"
import "./TripSegment.css"

type TripSegmentProps = {
  type: "walk" | "ride" | "transfer"
  from: string
  to: string
  duration?: number
  routeNumber?: string
  time?: string
}

function TripSegment({ type, from, to, duration, routeNumber, time }: TripSegmentProps) {
  const Icon = type === "walk" ? Footprints : type === "ride" ? Bus : ArrowLeftRight

  return (
    <div className={`trip-segment ${type}`}>
      <div className={`segment-icon ${type}`}>
        <Icon size={18} />
      </div>

      <div className="segment-details">
        <div className="segment-title">
          {type === "walk" && "Walk"}
          {type === "ride" && routeNumber && (
            <>
              Ride <RouteBadge number={routeNumber} />
            </>
          )}
          {type === "transfer" && "Transfer"}
        </div>
        <div className="segment-info">
          {from} to {to}
          {duration ? ` -- ${duration} min` : ""}
        </div>
      </div>

      {time && <div className="segment-time">{time}</div>}
    </div>
  )
}

export default TripSegment
