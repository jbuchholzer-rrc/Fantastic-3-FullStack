/**
 * @author Jack Buchholzer
 * Trip Controller -- handles incoming HTTP requests for trips
 *
 * Each function maps to a route and delegates work to the trip service.
 * The controller only deals with req/res, the service handles the database.
 */

import { Request, Response } from "express"
import * as tripService from "../services/tripService"

export async function getTrips(req: Request, res: Response) {
  try {
    const trips = await tripService.getAllTrips()
    res.json(trips)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trips" })
  }
}

export async function getTrip(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const trip = await tripService.getTripById(id)

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" })
    }

    res.json(trip)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trip" })
  }
}

export async function createTrip(req: Request, res: Response) {
  try {
    const newTrip = await tripService.createTrip(req.body)
    res.status(201).json(newTrip)
  } catch (error) {
    res.status(500).json({ message: "Failed to create trip" })
  }
}

export async function updateTrip(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)

    const existingTrip = await tripService.getTripById(id)
    if (!existingTrip) {
      return res.status(404).json({ message: "Trip not found" })
    }

    const updatedTrip = await tripService.updateTrip(id, req.body)
    res.json(updatedTrip)
  } catch (error) {
    res.status(500).json({ message: "Failed to update trip" })
  }
}

export async function deleteTrip(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)

    const existingTrip = await tripService.getTripById(id)
    if (!existingTrip) {
      return res.status(404).json({ message: "Trip not found" })
    }

    await tripService.deleteTrip(id)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: "Failed to delete trip" })
  }
}
