const TRANSIT_BASE = "/api/transit"

// get all cached transit stops from our database
export async function getTransitStops() {
  const res = await fetch(`${TRANSIT_BASE}/stops`)
  if (!res.ok) throw new Error("Failed to fetch transit stops")
  return res.json()
}

// get stops near a lat/lng
export async function getNearbyStops(lat: number, lon: number, distance: number = 500) {
  const res = await fetch(`${TRANSIT_BASE}/stops/nearby?lat=${lat}&lon=${lon}&distance=${distance}`)
  if (!res.ok) throw new Error("Failed to fetch nearby stops")
  return res.json()
}

// get live schedule for a stop (arriving buses and ETAs)
export async function getStopSchedule(stopKey: number) {
  const res = await fetch(`${TRANSIT_BASE}/schedule/${stopKey}`)
  if (!res.ok) throw new Error("Failed to fetch stop schedule")
  return res.json()
}

// get all cached transit routes from our database
export async function getTransitRoutes() {
  const res = await fetch(`${TRANSIT_BASE}/routes`)
  if (!res.ok) throw new Error("Failed to fetch transit routes")
  return res.json()
}

// get a single route by key
export async function getTransitRoute(routeKey: number) {
  const res = await fetch(`${TRANSIT_BASE}/routes/${routeKey}`)
  if (!res.ok) throw new Error("Failed to fetch route")
  return res.json()
}

// get all stops along a route
export async function getRouteStops(routeKey: string) {
  const res = await fetch(`${TRANSIT_BASE}/routes/${routeKey}/stops`)
  if (!res.ok) throw new Error("Failed to fetch route stops")
  return res.json()
}

// plan a trip using the winnipeg transit trip planner
export async function getTripPlan(origin: string, destination: string) {
  const params = new URLSearchParams({ origin, destination })
  const res = await fetch(`${TRANSIT_BASE}/trip-planner?${params}`)
  if (!res.ok) throw new Error("Failed to plan trip")
  return res.json()
}

// get current service advisories
export async function getServiceAdvisories() {
  const res = await fetch(`${TRANSIT_BASE}/advisories`)
  if (!res.ok) throw new Error("Failed to fetch advisories")
  return res.json()
}

// trigger a sync of stops and routes from the transit API into our database
export async function syncTransitData() {
  const res = await fetch(`${TRANSIT_BASE}/sync`)
  if (!res.ok) throw new Error("Failed to sync transit data")
  return res.json()
}

// checks if we have route data, if not triggers a sync first
// call this on pages that need transit data
export async function ensureTransitData() {
  const routes = await getTransitRoutes()
  if (routes.length === 0) {
    await syncTransitData()
  }
}