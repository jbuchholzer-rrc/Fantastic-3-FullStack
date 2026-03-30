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

router.get("/", getTrips)
router.get("/:id", getTrip)
router.post("/", validateRequest(createTripSchema), createTrip)
router.patch("/:id", validateRequest(updateTripSchema), updateTrip)
router.delete("/:id", deleteTrip)

export default router
