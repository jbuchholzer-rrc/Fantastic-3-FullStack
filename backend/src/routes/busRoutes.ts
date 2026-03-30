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

router.get("/", getBuses);
router.get("/:id", getBus);
router.post("/", validateRequest(createBusSchema), createBus);
router.patch("/:id", validateRequest(updateBusSchema), updateBus);
router.delete("/:id", deleteBus);

export default router;