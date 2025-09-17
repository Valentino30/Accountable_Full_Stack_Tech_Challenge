import { Response } from 'express'
import { Types } from 'mongoose'
import { AuthRequest } from '../middleware/auth'
import Event from '../models/Event'

// Get events with optional filters - paginated
export const getEvents = async (req: AuthRequest, res: Response) => {
  try {
    const { country, date, team, page = 1, limit = 20 } = req.query
    const filter: Record<string, any> = {}

    // Trim whitespace for cleaner searches.
    // This ensures that searches like "FC Cologne " or " FC Cologne" are handled correctly.
    const trimmedTeam = typeof team === 'string' ? team.trim() : team
    if (trimmedTeam) {
      filter.$or = [
        { homeTeam: { $regex: trimmedTeam, $options: 'i' } },
        { awayTeam: { $regex: trimmedTeam, $options: 'i' } },
      ]
    }

    // Trim whitespace for cleaner searches.
    // This ensures that searches like "Germany " or " Germany" are handled correctly.
    const trimmedCountry =
      typeof country === 'string' ? country.trim() : country
    if (trimmedCountry) {
      filter.country = { $regex: trimmedCountry, $options: 'i' }
    }

    if (date) {
      const start = new Date(date as string)
      const end = new Date(start)
      end.setUTCDate(start.getUTCDate() + 1)
      filter.date = { $gte: start, $lt: end }
    }

    // Implement pagination using .skip() and .limit() to only return a chunk of data.
    const pageNumber = parseInt(page as string)
    const limitNumber = parseInt(limit as string)
    const skip = (pageNumber - 1) * limitNumber
    const events = await Event.find(filter).skip(skip).limit(limitNumber).lean()

    return res.json(events)
  } catch (err) {
    console.error('GetEvents Error:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}

// Get single event by MongoDB _id
export const getEventById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid event ID' })
    }

    const event = await Event.findById(id).lean()
    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }

    return res.json(event)
  } catch (err) {
    console.error('GetEventById Error:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}

// Reserve spots for an event
export const reserveEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { spotsReserved } = req.body

    // Validate request for number of reservations requested (should be 1 or 2)
    if (!spotsReserved || spotsReserved < 1)
      return res.status(400).json({ error: 'Invalid number of reservations' })
    if (spotsReserved > 2)
      return res
        .status(400)
        .json({ error: 'Cannot reserve more than 2 reservations per event' })

    // Validate event ID format
    const eventId = req.params.id
    if (!Types.ObjectId.isValid(eventId))
      return res.status(400).json({ error: 'Invalid event ID' })

    // Fetch target event
    const event = await Event.findById(eventId)
    if (!event) return res.status(404).json({ error: 'Event not found' })

    const userId = new Types.ObjectId(req.userId!)
    const previousReservations = event.reservations.find((r) =>
      r.userId.equals(userId)
    )
    // Validate request for total number of reservations requested per event (should not exceed 2)
    if ((previousReservations?.spotsReserved || 0) + spotsReserved > 2)
      return res
        .status(400)
        .json({ error: 'Cannot reserve more than 2 spots for this event' })
    // Validate request for number of available seats left for the event
    if (event.availableSeats < spotsReserved)
      return res.status(400).json({ error: 'Not enough available seats' })

    // Validate total reservations across all events (should not exceed 5)
    const reservedSpotsAcrossEvents = await Event.aggregate([
      { $unwind: '$reservations' },
      { $match: { 'reservations.userId': userId } },
      { $group: { _id: null, total: { $sum: '$reservations.spotsReserved' } } },
    ])
    const totalReserved = reservedSpotsAcrossEvents[0]?.total || 0
    if (totalReserved + spotsReserved > 5)
      return res
        .status(400)
        .json({ error: 'Cannot reserve more than 5 spots across all events' })

    // Update reservation & available seats
    if (previousReservations) {
      previousReservations.spotsReserved += spotsReserved
    } else {
      event.reservations.push({ userId, spotsReserved })
    }
    event.availableSeats -= spotsReserved
    await event.save()

    res.json({
      message: 'Reservation successful',
      reservedSpots: previousReservations?.spotsReserved || spotsReserved,
      remainingSeats: event.availableSeats,
    })
  } catch (err: any) {
    console.error('Reserve Event Error:', err)
    res.status(500).json({ error: err.message || 'Server error' })
  }
}

// Cancel a reservation for an event
export const cancelReservation = async (req: AuthRequest, res: Response) => {
  try {
    const eventId = req.params.id
    if (!Types.ObjectId.isValid(eventId))
      return res.status(400).json({ error: 'Invalid event ID' })

    const event = await Event.findById(eventId)
    if (!event) return res.status(404).json({ error: 'Event not found' })

    const userId = new Types.ObjectId(req.userId!)
    const reservationIndex = event.reservations.findIndex((r) =>
      r.userId.equals(userId)
    )

    if (reservationIndex === -1) {
      return res
        .status(400)
        .json({ error: 'No reservation found for this user' })
    }

    const canceledSpots = event.reservations[reservationIndex].spotsReserved
    // Remove the reservation
    event.reservations.splice(reservationIndex, 1)
    event.availableSeats += canceledSpots

    await event.save()

    res.json({
      message: 'Reservation canceled successfully',
      freedSpots: canceledSpots,
      availableSeats: event.availableSeats,
    })
  } catch (err: any) {
    console.error('Cancel Reservation Error:', err)
    res.status(500).json({ error: err.message || 'Server error' })
  }
}
