/**
 * @author Jack Buchholzer
 * Trip Controller -- handles incoming HTTP requests for trips
 *
 * Each function maps to a route and delegates work to the trip service.
 * The controller only deals with req/res, the service handles the database.
 *
 * Updated for Sprint 5 to use Clerk auth. Every request goes through
 * requireAuth first so we know userId is always available here.
 * We also check ownership on get/update/delete so users can only
 * touch their own trips.
 */

import { Request, Response } from "express"
import { getAuth } from "@clerk/express"
import * as tripService from "../services/tripService"

export async function getTrips(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req)
    const trips = await tripService.getAllTrips(userId!)
    res.json(trips)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trips" })
  }
}

export async function getTrip(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req)
    const id = Number(req.params.id)
    const trip = await tripService.getTripById(id)

    if (!trip || trip.userId !== userId) {
      return res.status(404).json({ message: "Trip not found" })
    }

    res.json(trip)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trip" })
  }
}

export async function createTrip(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req)

    // make sure the user exists in our db (lazy creation)
    await tripService.upsertUser(userId!)

    const newTrip = await tripService.createTrip(req.body, userId!)
    res.status(201).json(newTrip)
  } catch (error) {
    res.status(500).json({ message: "Failed to create trip" })
  }
}

export async function updateTrip(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req)
    const id = Number(req.params.id)

    const existingTrip = await tripService.getTripById(id)
    if (!existingTrip || existingTrip.userId !== userId) {
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
    const { userId } = getAuth(req)
    const id = Number(req.params.id)

    const existingTrip = await tripService.getTripById(id)
    if (!existingTrip || existingTrip.userId !== userId) {
      return res.status(404).json({ message: "Trip not found" })
    }

    await tripService.deleteTrip(id)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: "Failed to delete trip" })
  }
}
