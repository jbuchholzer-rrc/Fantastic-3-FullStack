import { z } from "zod"

export const createTripSchema = z.object({
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
  route: z.string().min(1, "Route is required"),
  departureTime: z.string().min(1, "Departure time is required"),
  arrivalTime: z.string().min(1, "Arrival time is required"),
  duration: z.number().int().min(0, "Duration must be 0 or greater"),
  fare: z.number().min(0, "Fare must be 0 or greater"),
  status: z.enum(["scheduled", "in-progress", "completed", "cancelled"]),
})

export const updateTripSchema = z.object({
  origin: z.string().min(1).optional(),
  destination: z.string().min(1).optional(),
  route: z.string().min(1).optional(),
  departureTime: z.string().min(1).optional(),
  arrivalTime: z.string().min(1).optional(),
  duration: z.number().int().min(0).optional(),
  fare: z.number().min(0).optional(),
  status: z.enum(["scheduled", "in-progress", "completed", "cancelled"]).optional(),
})
