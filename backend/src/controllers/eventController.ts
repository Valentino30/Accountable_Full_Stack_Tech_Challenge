import { Request, Response } from "express";
import Event from "../models/Event";

// Get all events with optional filters
export const getEvents = async (req: Request, res: Response) => {
  try {
    const { country, date, homeTeam, awayTeam, league } = req.query;
    const filter: any = {};

    if (country) filter.country = country;
    if (date) filter.date = { $eq: new Date(date as string) };
    if (homeTeam) filter.homeTeam = homeTeam;
    if (awayTeam) filter.awayTeam = awayTeam;
    if (league) filter.league = league;

    const events = await Event.find(filter);
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get single event by MongoDB _id
export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Reserve spots for an event
export const reserveEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const { spots } = req.body;
    if (!spots || spots < 1) return res.status(400).json({ error: "Invalid number of spots" });

    // Total spots reserved across all events for the “current user”
    const allEvents = await Event.find({});
    const totalReserved = allEvents.reduce((sum, e) => sum + (e.reservedSpots || 0), 0);

    if (totalReserved + spots > 5) {
      return res.status(400).json({ error: "Cannot reserve more than 5 spots across all events" });
    }

    // Check per-event limit (max 2)
    if ((event.reservedSpots || 0) + spots > 2) {
      return res.status(400).json({ error: "Cannot reserve more than 2 spots for this event" });
    }

    // Check available seats
    if (event.availableSeats < spots) {
      return res.status(400).json({ error: "Not enough available seats" });
    }

    // Reserve the spots
    event.reservedSpots = (event.reservedSpots || 0) + spots;
    event.availableSeats -= spots;
    await event.save();

    res.json({
      message: "Reservation successful",
      reservedSpots: event.reservedSpots,
      remainingSeats: event.availableSeats,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
