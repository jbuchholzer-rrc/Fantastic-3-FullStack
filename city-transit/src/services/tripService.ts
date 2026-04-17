/**
 * @author Jack Buchholzer
 * Trip Service -- frontend business logic layer
 *
 * This handles all the "thinking" about trips:
 * searching, filtering, validation, calculations.
 *
 * Updated for Sprint 5 to pass the auth token through
 * to the repository so the backend knows who is calling.
 */

import type { Trip } from '../types/trip'
import tripRepository from '../repositories/tripRepository'

// search for trips that match a from/to combination
async function searchTrips(from: string, to: string, token: string | null): Promise<Trip[]> {
  const allTrips = await tripRepository.getAllTrips(token)

  return allTrips.filter((trip) => {
    const matchesFrom = from === '' || trip.from === from
    const matchesTo = to === '' || trip.to === to
    return matchesFrom && matchesTo
  })
}

// create a new trip from user input
async function createTrip(from: string, to: string, token: string | null): Promise<Trip | null> {
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
  }, token)

  return newTrip
}

// remove a trip
async function deleteTrip(id: number, token: string | null): Promise<boolean> {
  return tripRepository.removeTrip(id, token)
}

const tripService = {
  searchTrips,
  createTrip,
  deleteTrip,
}

export default tripService
