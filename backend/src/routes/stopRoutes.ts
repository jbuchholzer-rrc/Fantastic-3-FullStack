import { Router } from "express";
import { getStops, createStop, deleteStop } from "../controllers/stopController";
import { validateStop } from "../middleware/validateStop";

const router = Router();

router.get("/", getStops);
router.post("/", validateStop, createStop);
router.delete("/:id", deleteStop);

export default router;