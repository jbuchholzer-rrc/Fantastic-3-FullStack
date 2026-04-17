/**
 * @author Jack Buchholzer
 * Trip Service -- backend business logic layer
 *
 * Handles all database operations for trips using the Prisma client.
 * Called by the trip controller, never directly by routes.
 *
 * Updated for Sprint 5 to scope trips by userId so each user
 * only sees their own saved trips.
 */

import prisma from "../lib/prisma"

export type CreateTripInput = {
  origin: string
  destination: string
  route: string
  departureTime: string
  arrivalTime: string
  duration: number
  fare: number
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
}

export type UpdateTripInput = Partial<CreateTripInput>

// create or find the user record in our database
// clerk handles the actual auth, we just store the user id
// so we can link trips to users
export async function upsertUser(clerkId: string) {
  return prisma.user.upsert({
    where: { id: clerkId },
    update: {},
    create: {
      id: clerkId,
      email: clerkId,
    },
  })
}

// get all trips for a specific user
export async function getAllTrips(userId: string) {
  return prisma.trip.findMany({
    where: { userId },
    orderBy: { id: "asc" },
  })
}

export async function getTripById(id: number) {
  return prisma.trip.findUnique({
    where: { id },
  })
}

// create a trip and attach it to the user
export async function createTrip(data: CreateTripInput, userId: string) {
  return prisma.trip.create({
    data: {
      ...data,
      userId,
    },
  })
}

export async function updateTrip(id: number, data: UpdateTripInput) {
  return prisma.trip.update({
    where: { id },
    data,
  })
}

export async function deleteTrip(id: number) {
  return prisma.trip.delete({
    where: { id },
  })
}