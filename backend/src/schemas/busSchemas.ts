import { z } from "zod";

export const createBusSchema = z.object({
  routeNumber: z.string().min(1, "Route number is required"),
  destination: z.string().min(1, "Destination is required"),
  nextStop: z.string().min(1, "Next stop is required"),
  eta: z.number().int().min(0, "ETA must be 0 or greater"),
  status: z.enum(["On Time", "Delayed"]),
  favorite: z.boolean().optional(),
});

export const updateBusSchema = z.object({
  routeNumber: z.string().min(1).optional(),
  destination: z.string().min(1).optional(),
  nextStop: z.string().min(1).optional(),
  eta: z.number().int().min(0).optional(),
  status: z.enum(["On Time", "Delayed"]).optional(),
  favorite: z.boolean().optional(),
});