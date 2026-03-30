import { Router } from "express";
import {
  getBuses,
  getBus,
  createBus,
  updateBus,
  deleteBus,
} from "../controllers/busController";
import { validateRequest } from "../middleware/validateRequest";
import { createBusSchema, updateBusSchema } from "../schemas/busSchemas";

const router = Router();

/**
 * @swagger
 * /api/buses:
 *   get:
 *     summary: Get all buses
 *     tags: [Buses]
 *     responses:
 *       200:
 *         description: List of all tracked buses
 */
router.get("/", getBuses);

/**
 * @swagger
 * /api/buses/{id}:
 *   get:
 *     summary: Get a bus by ID
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bus found
 *       404:
 *         description: Bus not found
 */
router.get("/:id", getBus);

/**
 * @swagger
 * /api/buses:
 *   post:
 *     summary: Create a new bus
 *     tags: [Buses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [routeNumber, destination, nextStop, eta, status]
 *             properties:
 *               routeNumber:
 *                 type: string
 *               destination:
 *                 type: string
 *               nextStop:
 *                 type: string
 *               eta:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [On Time, Delayed]
 *               favorite:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Bus created
 */
router.post("/", validateRequest(createBusSchema), createBus);

/**
 * @swagger
 * /api/buses/{id}:
 *   patch:
 *     summary: Update a bus
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bus updated
 */
router.patch("/:id", validateRequest(updateBusSchema), updateBus);

/**
 * @swagger
 * /api/buses/{id}:
 *   delete:
 *     summary: Delete a bus
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Bus deleted
 */
router.delete("/:id", deleteBus);

export default router;
