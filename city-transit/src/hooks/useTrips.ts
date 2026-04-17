/**
 * @author Jack Buchholzer
 * useTrips Hook -- presentation logic layer
 *
 * This hook manages all the UI state for trip-related pages.
 * It calls the tripService for business logic but doesn't
 * do any data fetching or business rules itself.
 *
 * Updated for Sprint 5 to use Clerk auth. When the user is
 * signed out we skip the API calls and show empty data.
 * When signed in we pass the token so the backend knows
 * which user is making the request.
 */

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@clerk/clerk-react'
import type { Trip } from '../types/trip'
import tripService from '../services/tripService'

function useTrips() {
  const { getToken, isSignedIn } = useAuth()

  // form state
  const [selectedFrom, setSelectedFrom] = useState('')
  const [selectedTo, setSelectedTo] = useState('')

  // results from searching
  const [searchResults, setSearchResults] = useState<Trip[]>([])

  // user's saved trips (loaded from database)
  const [savedTrips, setSavedTrips] = useState<Trip[]>([])

  // loading and error state for the UI
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // load saved trips when the hook mounts or when sign-in state changes
  const loadData = useCallback(async () => {
    // if not signed in, dont try to fetch trips (the api will return 401)
    if (!isSignedIn) {
      setSavedTrips([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError('')
      const token = await getToken()
      const tripsData = await tripService.searchTrips('', '', token)
      setSavedTrips(tripsData)
    } catch {
      setError('Could not load trips from the backend.')
    } finally {
      setLoading(false)
    }
  }, [isSignedIn, getToken])

  useEffect(() => {
    loadData()
  }, [loadData])

  // search trips based on current from/to
  async function handleSearch() {
    const token = await getToken()
    const results = await tripService.searchTrips(selectedFrom, selectedTo, token)
    setSearchResults(results)
  }

  // create a new trip and refresh the list
  async function handleCreateTrip() {
    const token = await getToken()
    const trip = await tripService.createTrip(selectedFrom, selectedTo, token)
    if (trip) {
      await loadData()
    }
  }

  // remove a trip and refresh the list
  async function handleRemoveSavedTrip(tripId: number) {
    const token = await getToken()
    await tripService.deleteTrip(tripId, token)
    await loadData()
  }

  return {
    selectedFrom,
    selectedTo,
    setSelectedFrom,
    setSelectedTo,
    searchResults,
    savedTrips,
    loading,
    error,
    isSignedIn,
    handleSearch,
    handleCreateTrip,
    handleRemoveSavedTrip,
  }
}

export default useTrips