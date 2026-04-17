import { Router } from "express";
import { getStops, createStop, deleteStop } from "../controllers/stopController";
import { validateStop } from "../middleware/validateStop";

const router = Router();

/**
 * @swagger
 * /stops:
 *   get:
 *     summary: Get all custom stops
 *     tags: [Stops]
 *     responses:
 *       200:
 *         description: List of user-created stops
 */
router.get("/", getStops);

/**
 * @swagger
 * /stops:
 *   post:
 *     summary: Create a custom stop
 *     tags: [Stops]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, latitude, longitude]
 *             properties:
 *               name:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       200:
 *         description: Stop created
 */
router.post("/", validateStop, createStop);

/**
 * @swagger
 * /stops/{id}:
 *   delete:
 *     summary: Delete a custom stop
 *     tags: [Stops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Stop deleted
 */
router.delete("/:id", deleteStop);

export default router;