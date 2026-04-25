type TripFormProps = {
  stops: string[]
  selectedFrom: string
  setSelectedFrom: (value: string) => void
  selectedTo: string
  setSelectedTo: (value: string) => void
}

function TripForm({ stops, selectedFrom, setSelectedFrom, selectedTo, setSelectedTo }: TripFormProps) {
  return (
    <div>
      <select value={selectedFrom} onChange={(e) => setSelectedFrom(e.target.value)}>
        <option value="">From</option>
        {stops.map((stop) => (
          <option key={stop} value={stop}>{stop}</option>
        ))}
      </select>

      <select value={selectedTo} onChange={(e) => setSelectedTo(e.target.value)}>
        <option value="">To</option>
        {stops.map((stop) => (
          <option key={stop} value={stop}>{stop}</option>
        ))}
      </select>
    </div>
  )
}

export default TripForm