/**
 * @author Jack Buchholzer
 * Trip Routes -- maps HTTP methods to controller functions
 *
 * POST and PATCH requests go through validation middleware
 * before reaching the controller.
 */

import { Router } from "express"
import {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
} from "../controllers/tripController"
import { validateRequest } from "../middleware/validateRequest"
import { createTripSchema, updateTripSchema } from "../schemas/tripSchemas"

const router = Router()

/**
 * @swagger
 * /api/trips:
 *   get:
 *     summary: Get all saved trips
 *     tags: [Trips]
 *     responses:
 *       200:
 *         description: List of all saved trips
 */
router.get("/", getTrips)

/**
 * @swagger
 * /api/trips/{id}:
 *   get:
 *     summary: Get a trip by ID
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trip found
 *       404:
 *         description: Trip not found
 */
router.get("/:id", getTrip)

/**
 * @swagger
 * /api/trips:
 *   post:
 *     summary: Create a new trip
 *     tags: [Trips]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [origin, destination, route, departureTime, arrivalTime, duration, fare, status]
 *             properties:
 *               origin:
 *                 type: string
 *               destination:
 *                 type: string
 *               route:
 *                 type: string
 *               departureTime:
 *                 type: string
 *               arrivalTime:
 *                 type: string
 *               duration:
 *                 type: integer
 *               fare:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [scheduled, in-progress, completed, cancelled]
 *     responses:
 *       201:
 *         description: Trip created
 */
router.post("/", validateRequest(createTripSchema), createTrip)

/**
 * @swagger
 * /api/trips/{id}:
 *   patch:
 *     summary: Update a trip
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trip updated
 */
router.patch("/:id", validateRequest(updateTripSchema), updateTrip)

/**
 * @swagger
 * /api/trips/{id}:
 *   delete:
 *     summary: Delete a trip
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Trip deleted
 */
router.delete("/:id", deleteTrip)

export default router
