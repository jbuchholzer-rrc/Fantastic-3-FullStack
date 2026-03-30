type BusStatusCardProps = {
  routeNumber: string;
  destination: string;
  eta: number;
  status: string;
  onRemove: () => void;
  onFavorite: () => void;
  isFavorite: boolean;
};

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
    <div>
      <h3>{routeNumber}</h3>
      <p>{destination}</p>
      <p>ETA: {eta} min</p>
      <p>Status: {status}</p>

      <button onClick={onFavorite}>
        {isFavorite ? "Unfavorite" : "Favorite"}
      </button>

      <button onClick={onRemove}>Remove</button>
    </div>
  );
};

export default BusStatusCard;