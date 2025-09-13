import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { getEvents, getEventById, reserveEvent, cancelReservation } from "../controllers/eventController";

const router = Router();

router.use(authenticate);

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/:id/reserve", reserveEvent);
router.delete("/:id/reserve", cancelReservation);

export default router;
