import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { getEvents, getEventById, reserveEvent } from "../controllers/eventController";

const router = Router();

router.use(authenticate);

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/:id/reserve", reserveEvent);

export default router;
