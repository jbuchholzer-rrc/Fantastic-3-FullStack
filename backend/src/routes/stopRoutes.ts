import { Router } from "express";
import { getStops, createStop, deleteStop } from "../controllers/stopController";
import { validateStop } from "../middleware/validateStop";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

/**
 * @swagger
 * /stops:
 *   get:
 *     summary: Get all custom stops (user-specific)
 *     tags: [Stops]
 *     responses:
 *       200:
 *         description: List of user-created stops
 */
router.get("/", requireAuth, getStops);

/**
 * @swagger
 * /stops:
 *   post:
 *     summary: Create a custom stop (requires login)
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
 *       401:
 *         description: Unauthorized
 */
router.post("/", requireAuth, validateStop, createStop);

/**
 * @swagger
 * /stops/{id}:
 *   delete:
 *     summary: Delete a custom stop (requires login)
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
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", requireAuth, deleteStop);

export default router;