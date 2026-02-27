/**
 * @author Jack Buchholzer
 * useTrips Hook — presentation logic layer
 *
 * This hook manages all the UI state for trip-related pages.
 * It calls the tripService for business logic but doesn't
 * do any data fetching or business rules itself.
 *
 * Used in: TripPlannerPage, SavedTripsPage
 *
 * Returned values:
 *   stops          - list of stop names for the dropdowns
 *   selectedFrom   - currently selected "from" stop
 *   selectedTo     - currently selected "to" stop
 *   setSelectedFrom - update the "from" selection
 *   setSelectedTo   - update the "to" selection
 *   searchResults  - trips matching the current from/to selection
 *   savedTrips     - trips the user has saved
 *   handleSearch   - run a search with current from/to values
 *   handleSaveTrip - save a trip to the saved list
 *   handleRemoveSavedTrip - remove a trip from saved list
 */

import { useState } from 'react'
import Trip from '../types/trip'
import tripService from '../services/tripService'

function useTrips() {
  // form state
  const [selectedFrom, setSelectedFrom] = useState('')
  const [selectedTo, setSelectedTo] = useState('')

  // results from searching
  const [searchResults, setSearchResults] = useState<Trip[]>([])

  // user's saved trips
  const [savedTrips, setSavedTrips] = useState<Trip[]>([])

  // get all stop names for the dropdowns
  const stops = tripService.getStopNames()

  // search trips based on current from/to
  function handleSearch() {
    const results = tripService.searchTrips(selectedFrom, selectedTo)
    setSearchResults(results)
  }

  // add a trip to the saved list
  function handleSaveTrip(trip: Trip) {
    // don't save duplicates
    const alreadySaved = savedTrips.some((saved) => saved.id === trip.id)
    if (alreadySaved) return

    setSavedTrips([...savedTrips, trip])
  }

  // remove a trip from saved list
  function handleRemoveSavedTrip(tripId: number) {
    setSavedTrips(savedTrips.filter((trip) => trip.id !== tripId))
  }

  return {
    stops,
    selectedFrom,
    selectedTo,
    setSelectedFrom,
    setSelectedTo,
    searchResults,
    savedTrips,
    handleSearch,
    handleSaveTrip,
    handleRemoveSavedTrip,
  }
}

export default useTrips
