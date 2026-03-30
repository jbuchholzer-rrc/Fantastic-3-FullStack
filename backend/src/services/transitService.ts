/**
 * @author Jack Buchholzer
 * Transit Service -- wraps the Winnipeg Transit API v3
 *
 * This service handles all communication with the Winnipeg Transit
 * Open Data API. The API key is kept server-side so it never
 * reaches the browser.
 *
 * Two types of data:
 *   - Cached: stops and routes get saved to our database (they rarely change)
 *   - Live: schedules, trip plans, and advisories are fetched fresh every time
 */

import prisma from "../lib/prisma"

const BASE_URL = "https://api.winnipegtransit.com/v3"
const API_KEY = process.env.TRANSIT_API_KEY

// helper that builds the URL and makes the request
async function fetchFromTransitAPI(endpoint: string, params: Record<string, string> = {}) {
  if (!API_KEY) {
    throw new Error("TRANSIT_API_KEY is not set in the environment.")
  }

  // build query string with the api key and camelCase option
  const query = new URLSearchParams({
    "api-key": API_KEY,
    ...params,
  })

  const url = `${BASE_URL}${endpoint}.json?${query.toString()}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Transit API returned ${response.status} for ${endpoint}`)
  }

  return response.json()
}

// ---------- Live API calls ----------

// get the schedule for a specific stop (arriving buses, ETAs)
export async function fetchStopSchedule(stopKey: number) {
  return fetchFromTransitAPI(`/stops/${stopKey}/schedule`)
}

// find stops near a lat/lng coordinate
export async function fetchNearbyStops(lat: number, lon: number, distance: number = 500) {
  return fetchFromTransitAPI("/stops", {
    lat: lat.toString(),
    lon: lon.toString(),
    distance: distance.toString(),
  })
}

// get all stops along a specific route
export async function fetchRouteStops(routeKey: string) {
  return fetchFromTransitAPI(`/routes/${routeKey}/stops`)
}

// plan a trip between two locations
export async function fetchTripPlan(origin: string, destination: string) {
  return fetchFromTransitAPI("/trip-planner", { origin, destination })
}

// get current service advisories (delays, detours, etc)
export async function fetchServiceAdvisories() {
  return fetchFromTransitAPI("/service-advisories")
}

// ---------- Database cached data ----------

// get all transit stops from our database
export async function getCachedStops() {
  return prisma.transitStop.findMany({
    orderBy: { name: "asc" },
  })
}

// get a single transit stop by its winnipeg transit key
export async function getCachedStopByKey(key: number) {
  return prisma.transitStop.findUnique({
    where: { key },
  })
}

// get all transit routes from our database
export async function getCachedRoutes() {
  return prisma.transitRoute.findMany({
    orderBy: { number: "asc" },
  })
}

// get a single transit route by its key
export async function getCachedRouteByKey(key: number) {
  return prisma.transitRoute.findUnique({
    where: { key },
  })
}

// ---------- Sync (pull data from API into our database) ----------

// pulls all stops and routes from the winnipeg transit API
// and saves them to our postgres database using upsert
export async function syncStopsAndRoutes() {
  // fetch all stops from the API
  const stopsData = await fetchFromTransitAPI("/stops")
  const stops = stopsData.stops || []

  let stopsCount = 0
  for (const stop of stops) {
    // the API gives us the location inside centre.geographic
    const lat = parseFloat(stop.centre?.geographic?.latitude || "0")
    const lng = parseFloat(stop.centre?.geographic?.longitude || "0")

    // build the street name from the street object
    const street = stop.street
      ? `${stop.street.name || ""} ${stop.street.type || ""}`.trim()
      : null

    await prisma.transitStop.upsert({
      where: { key: stop.key },
      update: {
        name: stop.name,
        latitude: lat,
        longitude: lng,
        direction: stop.direction || null,
        street: street,
        syncedAt: new Date(),
      },
      create: {
        key: stop.key,
        name: stop.name,
        latitude: lat,
        longitude: lng,
        direction: stop.direction || null,
        street: street,
      },
    })
    stopsCount++
  }

  // fetch all routes from the API
  const routesData = await fetchFromTransitAPI("/routes")
  const routes = routesData.routes || []

  let routesCount = 0
  for (const route of routes) {
    await prisma.transitRoute.upsert({
      where: { key: route.key },
      update: {
        number: route.number || String(route.key),
        name: route.name || "",
        coverageType: route.coverage || null,
        badgeLabel: route["badge-label"] || null,
        badgeStyle: route["badge-style"] ? JSON.stringify(route["badge-style"]) : null,
        syncedAt: new Date(),
      },
      create: {
        key: route.key,
        number: route.number || String(route.key),
        name: route.name || "",
        coverageType: route.coverage || null,
        badgeLabel: route["badge-label"] || null,
        badgeStyle: route["badge-style"] ? JSON.stringify(route["badge-style"]) : null,
      },
    })
    routesCount++
  }

  return { stopsCount, routesCount }
}
