/**
 * @author Jack Buchholzer
 * Transit Routes -- maps URLs to the transit controller
 *
 * All routes are read-only (GET) except the sync endpoint (POST).
 * The /stops/nearby route has to come before /stops/:stopKey
 * otherwise express will think "nearby" is a stop key.
 */

import { Router } from "express"
import {
  getTransitStops,
  getNearbyStops,
  getTransitStop,
  getStopSchedule,
  getTransitRoutes,
  getTransitRoute,
  getRouteStops,
  getTripPlan,
  getServiceAdvisories,
  syncTransitData,
} from "../controllers/transitController"

const router = Router()

// stop endpoints
router.get("/stops", getTransitStops)
router.get("/stops/nearby", getNearbyStops)
router.get("/stops/:stopKey", getTransitStop)

// live schedule for a stop
router.get("/schedule/:stopKey", getStopSchedule)

// route endpoints
router.get("/routes", getTransitRoutes)
router.get("/routes/:routeKey", getTransitRoute)
router.get("/routes/:routeKey/stops", getRouteStops)

// trip planner
router.get("/trip-planner", getTripPlan)

// service advisories
router.get("/advisories", getServiceAdvisories)

// sync stops and routes from the API into our database
router.post("/sync", syncTransitData)

export default router
