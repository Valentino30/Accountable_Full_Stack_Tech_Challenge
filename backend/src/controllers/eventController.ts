import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/User";
import Event from "../models/Event";
import { sendEmail } from "../utils/emailService";
import { Types } from "mongoose";
import { JWT_SECRET } from "..";

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
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid event ID" });
    }

    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Reserve spots for an event
export const reserveEvent = async (req: Request, res: Response) => {
  try {
    const { spots } = req.body;
    if (!spots || spots < 1) return res.status(400).json({ error: "Invalid number of spots" });

    // Authenticate user
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid event ID" });
    }

    const userId = new Types.ObjectId(decoded.id);
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    // Total spots reserved by this user across all events
    const allEvents = await Event.find({});
    const totalReservedByUser = allEvents.reduce((sum, e) => {
      const userReservation = e.reservations.find((r) => r.userId.equals(userId));
      return sum + (userReservation?.spots || 0);
    }, 0);

    if (totalReservedByUser + spots > 5)
      return res.status(400).json({ error: "Cannot reserve more than 5 spots across all events" });

    // Per-event limit (max 2)
    const currentEventUserReservation = event.reservations.find((r) => r.userId.equals(userId));
    if ((currentEventUserReservation?.spots || 0) + spots > 2)
      return res.status(400).json({ error: "Cannot reserve more than 2 spots for this event" });

    // Check available seats
    if (event.availableSeats < spots) return res.status(400).json({ error: "Not enough available seats" });

    // Update reservations
    if (currentEventUserReservation) {
      currentEventUserReservation.spots += spots;
    } else {
      event.reservations.push({ userId, spots });
    }
    event.availableSeats -= spots;
    await event.save();

    // Send confirmation email (log error but don’t block reservation)
    try {
      await sendEmail(
        user.email,
        "Reservation Confirmed",
        `Your reservation for ${event.homeTeam} vs ${event.awayTeam} on ${event.date.toDateString()} is confirmed.`
      );
    } catch (emailErr) {
      console.error("Failed to send confirmation email:", emailErr);
    }

    res.json({
      message: "Reservation successful",
      reservedSpots: currentEventUserReservation?.spots || spots,
      remainingSeats: event.availableSeats,
    });
  } catch (err: any) {
    console.error("Reserve Event Error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};
