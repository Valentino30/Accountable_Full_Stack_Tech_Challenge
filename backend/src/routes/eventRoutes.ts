import { Router } from "express";
import { getEvents, getEventById, reserveEvent } from "../controllers/eventController";

const router = Router();

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/:id/reserve", reserveEvent);

export default router;
