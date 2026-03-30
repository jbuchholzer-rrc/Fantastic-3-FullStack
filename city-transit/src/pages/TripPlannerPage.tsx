import TripPlanner from '../TripPlanner'

interface TripPlannerPageProps {
  selectedFrom: string
  setSelectedFrom: (value: string) => void
  selectedTo: string
  setSelectedTo: (value: string) => void
  savedTrips: string[]
  setSavedTrips: React.Dispatch<React.SetStateAction<string[]>>
}

function TripPlannerPage({ selectedFrom, setSelectedFrom, selectedTo, setSelectedTo, savedTrips, setSavedTrips }: TripPlannerPageProps) {
  return (
    <section>
      <TripPlanner
        selectedFrom={selectedFrom}
        setSelectedFrom={setSelectedFrom}
        selectedTo={selectedTo}
        setSelectedTo={setSelectedTo}
        savedTrips={savedTrips}
        setSavedTrips={setSavedTrips}
      />
    </section>
  )
}

export default TripPlannerPage
