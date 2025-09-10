import { Router } from "express";
import Event from "../models/Event";

const router = Router();

// GET all events (limit to 20 for now)
router.get("/", async (req, res) => {
  const events = await Event.find().limit(20);
  res.json(events);
});

// POST create event
router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: "Invalid data", error: err });
  }
});

export default router;
