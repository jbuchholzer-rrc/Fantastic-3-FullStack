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

/**
 * @swagger
 * /api/transit/stops:
 *   get:
 *     summary: Get all cached transit stops
 *     tags: [Transit]
 *     description: Returns stops synced from the Winnipeg Transit API and stored in our database
 *     responses:
 *       200:
 *         description: List of transit stops
 */
router.get("/stops", getTransitStops)

/**
 * @swagger
 * /api/transit/stops/nearby:
 *   get:
 *     summary: Find stops near a location
 *     tags: [Transit]
 *     description: Calls the live Winnipeg Transit API to find stops near a lat/lng
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: lon
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: distance
 *         schema:
 *           type: integer
 *           default: 500
 *     responses:
 *       200:
 *         description: Nearby stops from the transit API
 */
router.get("/stops/nearby", getNearbyStops)

/**
 * @swagger
 * /api/transit/stops/{stopKey}:
 *   get:
 *     summary: Get a single transit stop by key
 *     tags: [Transit]
 *     parameters:
 *       - in: path
 *         name: stopKey
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Stop found
 *       404:
 *         description: Stop not found
 */
router.get("/stops/:stopKey", getTransitStop)

/**
 * @swagger
 * /api/transit/schedule/{stopKey}:
 *   get:
 *     summary: Get live bus schedule for a stop
 *     tags: [Transit]
 *     description: Returns real-time arriving buses and ETAs from the Winnipeg Transit API
 *     parameters:
 *       - in: path
 *         name: stopKey
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Live schedule data
 *       502:
 *         description: Transit API unavailable
 */
router.get("/schedule/:stopKey", getStopSchedule)

/**
 * @swagger
 * /api/transit/routes:
 *   get:
 *     summary: Get all cached transit routes
 *     tags: [Transit]
 *     description: Returns routes synced from the Winnipeg Transit API with badge colors
 *     responses:
 *       200:
 *         description: List of transit routes
 */
router.get("/routes", getTransitRoutes)

/**
 * @swagger
 * /api/transit/routes/{routeKey}:
 *   get:
 *     summary: Get a single transit route by key
 *     tags: [Transit]
 *     parameters:
 *       - in: path
 *         name: routeKey
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Route found
 *       404:
 *         description: Route not found
 */
router.get("/routes/:routeKey", getTransitRoute)

/**
 * @swagger
 * /api/transit/routes/{routeKey}/stops:
 *   get:
 *     summary: Get all stops along a route
 *     tags: [Transit]
 *     description: Calls the live Winnipeg Transit API to get stops for a specific route
 *     parameters:
 *       - in: path
 *         name: routeKey
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stops along the route
 *       502:
 *         description: Transit API unavailable
 */
router.get("/routes/:routeKey/stops", getRouteStops)

/**
 * @swagger
 * /api/transit/trip-planner:
 *   get:
 *     summary: Plan a trip between two locations
 *     tags: [Transit]
 *     description: Uses the Winnipeg Transit trip planner API. Locations should be formatted as geo/lat,lng
 *     parameters:
 *       - in: query
 *         name: origin
 *         required: true
 *         schema:
 *           type: string
 *         example: "geo/49.8951,-97.1384"
 *       - in: query
 *         name: destination
 *         required: true
 *         schema:
 *           type: string
 *         example: "geo/49.8094,-97.1327"
 *     responses:
 *       200:
 *         description: Trip plan with walk/ride/transfer segments
 *       502:
 *         description: Transit API unavailable
 */
router.get("/trip-planner", getTripPlan)

/**
 * @swagger
 * /api/transit/advisories:
 *   get:
 *     summary: Get current service advisories
 *     tags: [Transit]
 *     description: Returns live service alerts and detour notices from Winnipeg Transit
 *     responses:
 *       200:
 *         description: Current advisories
 */
router.get("/advisories", getServiceAdvisories)

/**
 * @swagger
 * /api/transit/sync:
 *   get:
 *     summary: Sync transit data from the Winnipeg Transit API
 *     tags: [Transit]
 *     description: Pulls all routes and stops for key routes from the API and saves them to the database. Safe to call multiple times, uses upsert.
 *     responses:
 *       200:
 *         description: Sync complete with counts
 */
router.get("/sync", syncTransitData)
router.post("/sync", syncTransitData)

export default router
