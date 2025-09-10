import { Request, Response } from "express";
import Event from "../models/Event";

// Get all events
export const getEvents = async (req: Request, res: Response) => {
  try {
    const { country, date, team } = req.query;
    const filter: any = {};

    if (country) filter.country = country;
    if (date) filter.date = { $eq: new Date(date as string) };
    if (team) filter.team = team;

    const events = await Event.find(filter);
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get event by ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Reserve spots
export const reserveEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const { spots } = req.body;
    if (!spots || spots < 1) return res.status(400).json({ error: "Invalid number of spots" });

    if (event.reservedSpots + spots > event.totalSpots)
      return res.status(400).json({ error: "Not enough spots available" });

    event.reservedSpots += spots;
    await event.save();

    res.json({ message: "Reservation successful", reservedSpots: event.reservedSpots });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
