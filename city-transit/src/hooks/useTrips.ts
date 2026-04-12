/**
 * @author Jack Buchholzer
 * useTrips Hook -- presentation logic layer
 *
 * This hook manages all the UI state for trip-related pages.
 * It calls the tripService for business logic but doesn't
 * do any data fetching or business rules itself.
 *
 * Used in: TripPlannerPage, SavedTripsPage
 *
 * Updated for Sprint 4 to handle async API calls and
 * persist trip data to the backend database.
 */

import { useState, useEffect, useCallback } from 'react'
import type { Trip } from '../types/trip'
import tripService from '../services/tripService'

function useTrips() {
  // form state
  const [selectedFrom, setSelectedFrom] = useState('')
  const [selectedTo, setSelectedTo] = useState('')

  // all stop names for the dropdowns
  const [stops, setStops] = useState<string[]>([])

  // results from searching
  const [searchResults, setSearchResults] = useState<Trip[]>([])

  // user's saved trips (loaded from database)
  const [savedTrips, setSavedTrips] = useState<Trip[]>([])

  // loading and error state for the UI
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // load trips and stop names when the hook first mounts
  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const [tripsData, stopsData] = await Promise.all([
        tripService.searchTrips('', ''),
        tripService.getStopNames(),
      ])
      setSavedTrips(tripsData)
      setStops(stopsData)
    } catch {
      setError('Could not load trips from the backend.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  // search trips based on current from/to
  async function handleSearch() {
    const results = await tripService.searchTrips(selectedFrom, selectedTo)
    setSearchResults(results)
  }

  // create a new trip and refresh the list
  async function handleCreateTrip() {
    const trip = await tripService.createTrip(selectedFrom, selectedTo)
    if (trip) {
      await loadData()
    }
  }

  // remove a trip and refresh the list
  async function handleRemoveSavedTrip(tripId: number) {
    await tripService.deleteTrip(tripId)
    await loadData()
  }

  return {
    stops,
    selectedFrom,
    selectedTo,
    setSelectedFrom,
    setSelectedTo,
    searchResults,
    savedTrips,
    loading,
    error,
    handleSearch,
    handleCreateTrip,
    handleRemoveSavedTrip,
  }
}

export default useTrips
