/**
 * @author Jack Buchholzer
 * Trip Service — business logic layer
 *
 * This handles all the "thinking" about trips:
 * searching, filtering, validation, calculations.
 *
 * It does NOT touch the UI (that's the hook's job).
 * It does NOT fetch data directly (that's the repository's job).
 */

import Trip from '../types/trip'
import tripRepository from '../repository/tripRepository'

// search for trips that match a from/to combination
// if only "from" is provided, returns all trips leaving from that stop
// if only "to" is provided, returns all trips going to that stop
function searchTrips(from: string, to: string): Trip[] {
  const allTrips = tripRepository.getAllTrips()

  return allTrips.filter((trip) => {
    const matchesFrom = from === '' || trip.from === from
    const matchesTo = to === '' || trip.to === to
    return matchesFrom && matchesTo
  })
}

// get trips filtered by status
function getTripsByStatus(status: Trip['status']): Trip[] {
  const allTrips = tripRepository.getAllTrips()
  return allTrips.filter((trip) => trip.status === status)
}

// get all the stop names (for populating dropdowns)
function getStopNames(): string[] {
  return tripRepository.getAllStops()
}

// create a new trip from user input
// this is where we validate and set defaults before saving
function createTrip(from: string, to: string): Trip | null {
  if (!from || !to) return null
  if (from === to) return null

  const newTrip = tripRepository.addTrip({
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
function deleteTrip(id: number): boolean {
  return tripRepository.removeTrip(id)
}

// get a single trip
function getTrip(id: number): Trip | undefined {
  return tripRepository.getTripById(id)
}

// calculate some basic stats about the trips
function getTripStats() {
  const allTrips = tripRepository.getAllTrips()

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
