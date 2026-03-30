/**
 * @author Jack Buchholzer
 * Trip Service -- backend business logic layer
 *
 * Handles all database operations for trips using the Prisma client.
 * Called by the trip controller, never directly by routes.
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

export async function getAllTrips() {
  return prisma.trip.findMany({
    orderBy: { id: "asc" },
  })
}

export async function getTripById(id: number) {
  return prisma.trip.findUnique({
    where: { id },
  })
}

export async function createTrip(data: CreateTripInput) {
  return prisma.trip.create({
    data,
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
