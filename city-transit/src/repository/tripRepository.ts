/**
 * @author Jack Buchholzer
 * Trip Repository — data access layer
 *
 * All reads/writes to trip data go through here.
 * Right now it uses the test data array in memory.
 * Next sprint this will connect to a real database.
 */

import Trip from '../types/trip'
import testTrips from '../data/tripData'

// in-memory copy of our test data (acts like a database table)
let trips: Trip[] = [...testTrips]

// keeps track of the next id to use when creating a trip
let nextId = trips.length + 1

// ---------- CRUD Methods ----------

// get all trips
function getAllTrips(): Trip[] {
  return [...trips]
}

// get a single trip by its id
function getTripById(id: number): Trip | undefined {
  return trips.find((trip) => trip.id === id)
}

// add a new trip and return it with the generated id
function addTrip(trip: Omit<Trip, 'id'>): Trip {
  const newTrip: Trip = { ...trip, id: nextId }
  nextId++
  trips.push(newTrip)
  return newTrip
}

// update an existing trip, returns the updated trip or undefined if not found
function updateTrip(id: number, updates: Partial<Trip>): Trip | undefined {
  const index = trips.findIndex((trip) => trip.id === id)
  if (index === -1) return undefined

  trips[index] = { ...trips[index], ...updates }
  return trips[index]
}

// remove a trip by id, returns true if it was removed
function removeTrip(id: number): boolean {
  const before = trips.length
  trips = trips.filter((trip) => trip.id !== id)
  return trips.length < before
}

// get all unique stop names from the trip data
function getAllStops(): string[] {
  const stopSet = new Set<string>()
  trips.forEach((trip) => {
    stopSet.add(trip.from)
    stopSet.add(trip.to)
  })
  return Array.from(stopSet).sort()
}

const tripRepository = {
  getAllTrips,
  getTripById,
  addTrip,
  updateTrip,
  removeTrip,
  getAllStops,
}

export default tripRepository
