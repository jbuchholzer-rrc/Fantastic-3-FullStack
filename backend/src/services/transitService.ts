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
// the API doesnt have /routes/:key/stops, you have to use /stops?route=KEY
export async function fetchRouteStops(routeKey: string) {
  return fetchFromTransitAPI("/stops", { route: routeKey })
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

// so the winnipeg transit API has a rate limit of 100 requests per minute
// and you cant just GET /stops without a filter, it needs a route or
// location to narrow it down. so what i do here is first grab all the
// routes, save those, then loop through a list of the main routes and
// pull the stops for each one. this way we get a good set of real stops
// without hammering the API or hitting the rate limit.
// we also use upsert so if the data already exists it just updates it
// instead of creating duplicates.
export async function syncStopsAndRoutes() {
  // grab every route from the API (this comes back in one request)
  const routesData = await fetchFromTransitAPI("/routes")
  const routes = routesData.routes || []

  let routesCount = 0
  for (const route of routes) {
    await prisma.transitRoute.upsert({
      where: { key: typeof route.key === "string" ? 0 : route.key },
      update: {
        number: String(route.number || route.key),
        name: route.name || "",
        coverageType: route.coverage || null,
        badgeLabel: String(route["badge-label"] || route.key),
        badgeStyle: route["badge-style"] ? JSON.stringify(route["badge-style"]) : null,
        syncedAt: new Date(),
      },
      create: {
        key: typeof route.key === "string" ? routesCount + 9000 : route.key,
        number: String(route.number || route.key),
        name: route.name || "",
        coverageType: route.coverage || null,
        badgeLabel: String(route["badge-label"] || route.key),
        badgeStyle: route["badge-style"] ? JSON.stringify(route["badge-style"]) : null,
      },
    })
    routesCount++
  }

  // now pull stops for each of the main routes
  // i picked these because they cover the most of the city
  // (rapid transit, frequent, express, and some connector routes)
  // if we pulled every single route we'd hit like 60+ API calls
  // which is fine but takes a while, so im keeping it to the important ones
  const keyRoutes = ["BLUE", "F5", "F6", "F7", "F8", "F9", "FX2", "FX3", "FX4", "D10", "D11", "D16", "D19", "22", "74"]
  let stopsCount = 0

  for (const routeKey of keyRoutes) {
    try {
      const stopsData = await fetchFromTransitAPI(`/stops`, { route: routeKey })
      const stops = stopsData.stops || []

      for (const stop of stops) {
        const lat = parseFloat(stop.centre?.geographic?.latitude || "0")
        const lng = parseFloat(stop.centre?.geographic?.longitude || "0")
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
    } catch {
      // if one route fails just skip it and keep going
    }
  }

  return { stopsCount, routesCount }
}
