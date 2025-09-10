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

    if (event.availableSeats < spots) return res.status(400).json({ error: "Not enough available seats" });

    event.availableSeats -= spots;
    await event.save();

    res.json({ message: "Reservation successful", remainingSeats: event.availableSeats });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
