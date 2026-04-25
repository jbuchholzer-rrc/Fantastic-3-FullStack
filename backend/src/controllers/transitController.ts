import { Request, Response } from "express"
import * as transitService from "../services/transitService"

// normalize query params safely
const getQueryParam = (param: unknown): string | undefined => {
  if (!param) return undefined

  if (typeof param === "string") return param

  if (Array.isArray(param)) {
    const first = param[0]
    return typeof first === "string" ? first : undefined
  }

  return undefined
}

// normalize route params safely
const getParam = (param: string | string[]): string => {
  return Array.isArray(param) ? param[0] : param
}

// -----------------------------

export async function getTransitStops(req: Request, res: Response) {
  try {
    const stops = await transitService.getCachedStops()
    res.json(stops)
  } catch {
    res.status(500).json({ message: "Failed to fetch transit stops" })
  }
}

// -----------------------------

export async function getNearbyStops(req: Request, res: Response) {
  try {
    const lat = parseFloat(getQueryParam(req.query.lat) || "")
    const lon = parseFloat(getQueryParam(req.query.lon) || "")
    const distance = parseInt(getQueryParam(req.query.distance) || "500")

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ message: "lat and lon required" })
    }

    const data = await transitService.fetchNearbyStops(lat, lon, distance)
    res.json(data)
  } catch {
    res.status(502).json({ message: "Winnipeg Transit API unavailable" })
  }
}

// -----------------------------

export async function getTransitStop(req: Request, res: Response) {
  try {
    const key = parseInt(getParam(req.params.stopKey))
    const stop = await transitService.getCachedStopByKey(key)

    if (!stop) {
      return res.status(404).json({ message: "Stop not found" })
    }

    res.json(stop)
  } catch {
    res.status(500).json({ message: "Failed to fetch stop" })
  }
}

// -----------------------------

export async function getStopSchedule(req: Request, res: Response) {
  try {
    const stopKey = parseInt(getParam(req.params.stopKey))
    const data = await transitService.fetchStopSchedule(stopKey)
    res.json(data)
  } catch {
    res.status(502).json({ message: "Winnipeg Transit API unavailable" })
  }
}

// -----------------------------

export async function getTransitRoutes(req: Request, res: Response) {
  try {
    const routes = await transitService.getCachedRoutes()
    res.json(routes)
  } catch {
    res.status(500).json({ message: "Failed to fetch routes" })
  }
}

// -----------------------------

export async function getTransitRoute(req: Request, res: Response) {
  try {
    const key = parseInt(getParam(req.params.routeKey))
    const route = await transitService.getCachedRouteByKey(key)

    if (!route) {
      return res.status(404).json({ message: "Route not found" })
    }

    res.json(route)
  } catch {
    res.status(500).json({ message: "Failed to fetch route" })
  }
}

// -----------------------------

export async function getRouteStops(req: Request, res: Response) {
  try {
    const routeKey = getParam(req.params.routeKey)
    const data = await transitService.fetchRouteStops(routeKey)
    res.json(data)
  } catch {
    res.status(502).json({ message: "Winnipeg Transit API unavailable" })
  }
}

// -----------------------------

export async function getTripPlan(req: Request, res: Response) {
  try {
    const origin = getQueryParam(req.query.origin)
    const destination = getQueryParam(req.query.destination)

    if (!origin || !destination) {
      return res.status(400).json({ message: "origin and destination required" })
    }

    const data = await transitService.fetchTripPlan(origin, destination)
    res.json(data)
  } catch {
    res.status(502).json({ message: "Winnipeg Transit API unavailable" })
  }
}

// -----------------------------

export async function getServiceAdvisories(req: Request, res: Response) {
  try {
    const data = await transitService.fetchServiceAdvisories()
    res.json(data)
  } catch {
    res.status(502).json({ message: "Winnipeg Transit API unavailable" })
  }
}

// -----------------------------

export async function syncTransitData(req: Request, res: Response) {
  try {
    const result = await transitService.syncStopsAndRoutes()
    res.json({
      message: "Sync complete",
      stopsCount: result.stopsCount,
      routesCount: result.routesCount,
    })
  } catch {
    res.status(500).json({ message: "Failed to sync transit data" })
  }
}