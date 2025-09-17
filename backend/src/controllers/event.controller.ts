import { Response } from 'express'
import { Types } from 'mongoose'
import * as eventService from '../services/event.service'
import { IAuthRequest } from '../types/auth.types'
import { handleError } from '../utils/errors'

export const getEvents = async (req: IAuthRequest, res: Response) => {
  try {
    const { country, date, team, page = 1, limit = 20 } = req.query
    const events = await eventService.getFilteredEvents({
      country: country as string,
      date: date as string,
      team: team as string,
      page: parseInt(page as string),
      limit: parseInt(limit as string),
    })
    return res.json(events)
  } catch (err: any) {
    handleError(err, res)
  }
}

export const getEventById = async (req: IAuthRequest, res: Response) => {
  try {
    const { id } = req.params

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid event ID' })
    }

    const event = await eventService.getEventById(id)
    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }

    return res.json(event)
  } catch (err: any) {
    handleError(err, res)
  }
}

export const reserveEvent = async (req: IAuthRequest, res: Response) => {
  try {
    const { spotsReserved } = req.body
    const eventId = req.params.id
    const userId = req.userId!

    const result = await eventService.reserveEvent({
      eventId,
      userId,
      spotsReserved,
    })

    res.json({
      message: 'Reservation successful',
      reservedSpots: result.reservedSpots,
      remainingSeats: result.remainingSeats,
    })
  } catch (err: any) {
    handleError(err, res)
  }
}

export const cancelReservation = async (req: IAuthRequest, res: Response) => {
  try {
    const eventId = req.params.id
    const userId = req.userId!

    const result = await eventService.cancelReservation({ eventId, userId })

    res.json({
      message: 'Reservation canceled successfully',
      freedSpots: result.freedSpots,
      availableSeats: result.availableSeats,
    })
  } catch (err: any) {
    handleError(err, res)
  }
}
