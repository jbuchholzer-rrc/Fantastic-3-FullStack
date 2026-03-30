/**
 * @author Jack Buchholzer
 * Trip Repository -- data access layer
 *
 * All reads/writes to trip data go through here.
 * Previously this used local test data, now it calls the backend API
 * so trips are persisted in the database across sessions.
 */

import type { Trip } from '../types/trip'

const API_BASE = "/api/trips"

// get all trips from the database
async function getAllTrips(): Promise<Trip[]> {
  const response = await fetch(API_BASE)
  if (!response.ok) throw new Error("Failed to fetch trips")
  return response.json()
}

// get a single trip by id
async function getTripById(id: number): Promise<Trip | null> {
  const response = await fetch(`${API_BASE}/${id}`)
  if (!response.ok) return null
  return response.json()
}

// create a new trip and return it with the generated id
async function addTrip(trip: Omit<Trip, 'id'>): Promise<Trip> {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      origin: trip.from,
      destination: trip.to,
      route: trip.route,
      departureTime: trip.departureTime,
      arrivalTime: trip.arrivalTime,
      duration: trip.duration,
      fare: trip.fare,
      status: trip.status,
    }),
  })
  if (!response.ok) throw new Error("Failed to create trip")
  return mapTripFromApi(await response.json())
}

// remove a trip by id
async function removeTrip(id: number): Promise<boolean> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  })
  return response.ok
}

// the backend uses "origin" and "destination" but the frontend
// uses "from" and "to", so we map between them here
function mapTripFromApi(apiTrip: any): Trip {
  return {
    id: apiTrip.id,
    from: apiTrip.origin,
    to: apiTrip.destination,
    route: apiTrip.route,
    departureTime: apiTrip.departureTime,
    arrivalTime: apiTrip.arrivalTime,
    duration: apiTrip.duration,
    fare: apiTrip.fare,
    status: apiTrip.status,
  }
}

// get all unique stop names from the trip data (for dropdowns)
async function getAllStops(): Promise<string[]> {
  const trips = await getAllTrips()
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
  removeTrip,
  getAllStops,
  mapTripFromApi,
}

export default tripRepository
