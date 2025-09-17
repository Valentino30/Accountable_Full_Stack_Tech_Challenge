import { Types } from 'mongoose'
import Event from '../models/Event'
import {
  IEvent,
  IGetEventsParams,
  IReserveEventParams,
} from '../types/event.types'
import { ApiError } from '../utils/errors/base'
import {
  validateAvailableSeats,
  validateEventExists,
  validateEventReservationLimit,
  validateSpotsReserved,
  validateTotalReservationLimit,
} from '../utils/validation/event'

export const getFilteredEvents = async ({
  country,
  date,
  team,
  page,
  limit,
}: IGetEventsParams) => {
  const filter: Record<string, any> = {}

  const trimmedTeam = typeof team === 'string' ? team.trim() : team
  if (trimmedTeam) {
    filter.$or = [
      { homeTeam: { $regex: trimmedTeam, $options: 'i' } },
      { awayTeam: { $regex: trimmedTeam, $options: 'i' } },
    ]
  }

  const trimmedCountry = typeof country === 'string' ? country.trim() : country
  if (trimmedCountry) {
    filter.country = { $regex: trimmedCountry, $options: 'i' }
  }

  if (date) {
    const start = new Date(date as string)
    const end = new Date(start)
    end.setUTCDate(start.getUTCDate() + 1)
    filter.date = { $gte: start, $lt: end }
  }

  const skip = (page - 1) * limit
  return Event.find(filter).skip(skip).limit(limit).lean()
}

export const getEventById = async (eventId: string) => {
  return Event.findById(eventId).lean()
}

export const reserveEvent = async ({
  eventId,
  userId,
  spotsReserved,
}: IReserveEventParams) => {
  // Validate inputs using provided validators
  validateSpotsReserved(spotsReserved)
  const event = await Event.findById(eventId)
  validateEventExists(event)
  validateEventReservationLimit(event as IEvent, userId, spotsReserved)
  validateAvailableSeats(event as IEvent, spotsReserved)
  await validateTotalReservationLimit(userId, spotsReserved)

  // Update reservations
  const userIdObj = new Types.ObjectId(userId)
  const previousReservations = (event as IEvent).reservations.find((r) =>
    r.userId.equals(userIdObj)
  )

  if (previousReservations) {
    previousReservations.spotsReserved += spotsReserved
  } else {
    ;(event as IEvent).reservations.push({ userId: userIdObj, spotsReserved })
  }

  ;(event as IEvent).availableSeats -= spotsReserved
  await event!.save()

  return {
    reservedSpots: previousReservations?.spotsReserved || spotsReserved,
    remainingSeats: (event as IEvent).availableSeats,
  }
}

export const cancelReservation = async ({
  eventId,
  userId,
}: {
  eventId: string
  userId: string
}) => {
  const event = await Event.findById(eventId)
  if (!event) {
    throw new ApiError('Event not found', 404)
  }

  const userIdObj = new Types.ObjectId(userId)
  const reservationIndex = event.reservations.findIndex((r) =>
    r.userId.equals(userIdObj)
  )

  if (reservationIndex === -1) {
    throw new ApiError('No reservation found for this user', 400)
  }

  const canceledSpots = event.reservations[reservationIndex].spotsReserved
  event.reservations.splice(reservationIndex, 1)
  event.availableSeats += canceledSpots

  await event.save()

  return {
    freedSpots: canceledSpots,
    availableSeats: event.availableSeats,
  }
}
