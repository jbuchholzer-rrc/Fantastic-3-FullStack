/**
 * @author Jack Buchholzer
 * Trip Repository -- data access layer
 *
 * All reads/writes to trip data go through here.
 * Calls the backend API with the user's auth token
 * so the backend knows who is making the request.
 */

import type { Trip } from '../types/trip'

const API_BASE = "/api/trips"

// builds headers with the auth token if we have one
function buildHeaders(token: string | null): HeadersInit {
  const headers: HeadersInit = { "Content-Type": "application/json" }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }
  return headers
}

// get all trips for the logged in user
async function getAllTrips(token: string | null): Promise<Trip[]> {
  const response = await fetch(API_BASE, {
    headers: buildHeaders(token),
  })
  if (!response.ok) throw new Error("Failed to fetch trips")
  const data = await response.json()
  return data.map(mapTripFromApi)
}

// get a single trip by id
async function getTripById(id: number, token: string | null): Promise<Trip | null> {
  const response = await fetch(`${API_BASE}/${id}`, {
    headers: buildHeaders(token),
  })
  if (!response.ok) return null
  return response.json()
}

// create a new trip and return it with the generated id
async function addTrip(trip: Omit<Trip, 'id'>, token: string | null): Promise<Trip> {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: buildHeaders(token),
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
async function removeTrip(id: number, token: string | null): Promise<boolean> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: buildHeaders(token),
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

const tripRepository = {
  getAllTrips,
  getTripById,
  addTrip,
  removeTrip,
  mapTripFromApi,
}

export default tripRepository
