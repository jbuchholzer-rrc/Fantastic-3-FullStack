type TripFormProps = {
  selectedFrom: string
  setSelectedFrom: (value: string) => void
  selectedTo: string
  setSelectedTo: (value: string) => void
}

function TripForm({ selectedFrom, setSelectedFrom, selectedTo, setSelectedTo }: TripFormProps) {
  return (
    <div>
      <select value={selectedFrom} onChange={(e) => setSelectedFrom(e.target.value)}>
        <option value="">From</option>
        <option value="Portage & Main">Portage & Main</option>
        <option value="The Forks">The Forks</option>
        <option value="Polo Park">Polo Park</option>
        <option value="St Vital Centre">St Vital Centre</option>
        <option value="U of M">U of M</option>
        <option value="Osborne Village">Osborne Village</option>
        <option value="HSC">HSC</option>
        <option value="Kildonan Place">Kildonan Place</option>
      </select>

      <select value={selectedTo} onChange={(e) => setSelectedTo(e.target.value)}>
        <option value="">To</option>
        <option value="Portage & Main">Portage & Main</option>
        <option value="The Forks">The Forks</option>
        <option value="Polo Park">Polo Park</option>
        <option value="St Vital Centre">St Vital Centre</option>
        <option value="U of M">U of M</option>
        <option value="Osborne Village">Osborne Village</option>
        <option value="HSC">HSC</option>
        <option value="Kildonan Place">Kildonan Place</option>
      </select>
    </div>
  )
}

export default TripForm
