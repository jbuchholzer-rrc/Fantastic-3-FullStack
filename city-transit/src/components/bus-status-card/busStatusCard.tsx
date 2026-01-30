import "./BusStatusCard.css";

interface BusStatusCardProps {
  routeNumber: string;
  destination: string;
  eta: number;
  status: "On Time" | "Delayed";
  onRemove: () => void;
  onFavorite: () => void;
  isFavorite: boolean;
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
  return (
    <div className="bus-card">
      <strong>Route {routeNumber}</strong> – {destination}
      <div>ETA: {eta} min</div>
      <div className={status === "On Time" ? "on-time" : "delayed"}>
        {status}
      </div>
      <button onClick={onRemove}>Remove</button>
      <button onClick={onFavorite}>{isFavorite ? "Unfavorite" : "Favorite"}</button>
    </div>
  );
};

export default BusStatusCard;