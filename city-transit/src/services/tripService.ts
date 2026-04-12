/**
 * @author Jack Buchholzer
 * Trip Service -- frontend business logic layer
 *
 * This handles all the "thinking" about trips:
 * searching, filtering, validation, calculations.
 *
 * It does NOT touch the UI (that's the hook's job).
 * It does NOT fetch data directly (that's the repository's job).
 *
 * Updated for Sprint 4 to work with async API calls.
 */

import type { Trip } from '../types/trip'
import tripRepository from '../repositories/tripRepository'

// search for trips that match a from/to combination
async function searchTrips(from: string, to: string): Promise<Trip[]> {
  const allTrips = await tripRepository.getAllTrips()

  return allTrips.filter((trip) => {
    const matchesFrom = from === '' || trip.from === from
    const matchesTo = to === '' || trip.to === to
    return matchesFrom && matchesTo
  })
}

// get trips filtered by status
async function getTripsByStatus(status: Trip['status']): Promise<Trip[]> {
  const allTrips = await tripRepository.getAllTrips()
  return allTrips.filter((trip) => trip.status === status)
}

// get all the stop names (for populating dropdowns)
async function getStopNames(): Promise<string[]> {
  return tripRepository.getAllStops()
}

// create a new trip from user input
async function createTrip(from: string, to: string): Promise<Trip | null> {
  if (!from || !to) return null
  if (from === to) return null

  const newTrip = await tripRepository.addTrip({
    from,
    to,
    route: 'TBD',
    departureTime: 'TBD',
    arrivalTime: 'TBD',
    duration: 0,
    fare: 3.15,
    status: 'scheduled',
  })

  return newTrip
}

// remove a trip
async function deleteTrip(id: number): Promise<boolean> {
  return tripRepository.removeTrip(id)
}

// get a single trip
async function getTrip(id: number): Promise<Trip | null> {
  return tripRepository.getTripById(id)
}

// calculate some basic stats about the trips
async function getTripStats() {
  const allTrips = await tripRepository.getAllTrips()

  const totalTrips = allTrips.length
  const scheduled = allTrips.filter((t) => t.status === 'scheduled').length
  const completed = allTrips.filter((t) => t.status === 'completed').length
  const cancelled = allTrips.filter((t) => t.status === 'cancelled').length

  const totalDuration = allTrips.reduce((sum, t) => sum + t.duration, 0)
  const avgDuration = totalTrips > 0 ? Math.round(totalDuration / totalTrips) : 0

  return {
    totalTrips,
    scheduled,
    completed,
    cancelled,
    avgDuration,
  }
}

const tripService = {
  searchTrips,
  getTripsByStatus,
  getStopNames,
  createTrip,
  deleteTrip,
  getTrip,
  getTripStats,
}

export default tripService
