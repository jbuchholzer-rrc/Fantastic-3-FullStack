/**
 * @author Jack Buchholzer
 * Transit Controller -- handles requests for Winnipeg Transit data
 *
 * Some endpoints return cached data from our database (stops, routes).
 * Others proxy live data from the Winnipeg Transit API (schedules, trip plans).
 * The API key stays on the server so it never reaches the browser.
 */

import { Request, Response } from "express"
import * as transitService from "../services/transitService"

// return all cached transit stops from our database
export async function getTransitStops(req: Request, res: Response) {
  try {
    const stops = await transitService.getCachedStops()
    res.json(stops)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transit stops" })
  }
}

// find stops near a lat/lng (calls the live API)
export async function getNearbyStops(req: Request, res: Response) {
  try {
    const lat = parseFloat(req.query.lat as string)
    const lon = parseFloat(req.query.lon as string)
    const distance = parseInt(req.query.distance as string) || 500

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ message: "lat and lon query params are required" })
    }

    const data = await transitService.fetchNearbyStops(lat, lon, distance)
    res.json(data)
  } catch (error) {
    res.status(502).json({ message: "Winnipeg Transit API is unavailable" })
  }
}

// get a single stop by its winnipeg transit key
export async function getTransitStop(req: Request, res: Response) {
  try {
    const key = parseInt(req.params.stopKey)
    const stop = await transitService.getCachedStopByKey(key)

    if (!stop) {
      return res.status(404).json({ message: "Stop not found" })
    }

    res.json(stop)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stop" })
  }
}

// get the live schedule for a stop (arriving buses and ETAs)
export async function getStopSchedule(req: Request, res: Response) {
  try {
    const stopKey = parseInt(req.params.stopKey)
    const data = await transitService.fetchStopSchedule(stopKey)
    res.json(data)
  } catch (error) {
    res.status(502).json({ message: "Winnipeg Transit API is unavailable" })
  }
}

// return all cached transit routes from our database
export async function getTransitRoutes(req: Request, res: Response) {
  try {
    const routes = await transitService.getCachedRoutes()
    res.json(routes)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transit routes" })
  }
}

// get a single route by its key
export async function getTransitRoute(req: Request, res: Response) {
  try {
    const key = parseInt(req.params.routeKey)
    const route = await transitService.getCachedRouteByKey(key)

    if (!route) {
      return res.status(404).json({ message: "Route not found" })
    }

    res.json(route)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch route" })
  }
}

// get all stops along a route (calls the live API)
export async function getRouteStops(req: Request, res: Response) {
  try {
    const routeKey = req.params.routeKey
    const data = await transitService.fetchRouteStops(routeKey)
    res.json(data)
  } catch (error) {
    res.status(502).json({ message: "Winnipeg Transit API is unavailable" })
  }
}

// plan a trip between two locations (calls the live API)
export async function getTripPlan(req: Request, res: Response) {
  try {
    const origin = req.query.origin as string
    const destination = req.query.destination as string

    if (!origin || !destination) {
      return res.status(400).json({ message: "origin and destination query params are required" })
    }

    const data = await transitService.fetchTripPlan(origin, destination)
    res.json(data)
  } catch (error) {
    res.status(502).json({ message: "Winnipeg Transit API is unavailable" })
  }
}

// get current service advisories (calls the live API)
export async function getServiceAdvisories(req: Request, res: Response) {
  try {
    const data = await transitService.fetchServiceAdvisories()
    res.json(data)
  } catch (error) {
    res.status(502).json({ message: "Winnipeg Transit API is unavailable" })
  }
}

// pull all stops and routes from the API into our database
export async function syncTransitData(req: Request, res: Response) {
  try {
    const result = await transitService.syncStopsAndRoutes()
    res.json({
      message: "Sync complete",
      stopsCount: result.stopsCount,
      routesCount: result.routesCount,
    })
  } catch (error) {
    res.status(500).json({ message: "Failed to sync transit data" })
  }
}