import { Types } from 'mongoose'
import Event from '../models/Event'
import { GetEventsParams, ReserveEventParams } from '../types/event.types'
import { ApiError } from '../utils/errors'

export const getFilteredEvents = async ({
  country,
  date,
  team,
  page,
  limit,
}: GetEventsParams) => {
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
}: ReserveEventParams) => {
  // Validate request for number of reservations requested (should be 1 or 2)
  if (!spotsReserved || spotsReserved < 1 || spotsReserved > 2)
    throw new ApiError('Invalid number of reservations', 400)

  const event = await Event.findById(eventId)
  if (!event) throw new ApiError('Event not found', 404)

  const userIdObj = new Types.ObjectId(userId)
  const previousReservations = event.reservations.find((r) =>
    r.userId.equals(userIdObj)
  )

  // Validate request for total number of reservations requested per event (should not exceed 2)
  if ((previousReservations?.spotsReserved || 0) + spotsReserved > 2)
    throw new ApiError('Cannot reserve more than 2 spots for this event', 400)

  // Validate request for number of available seats left for the event
  if (event.availableSeats < spotsReserved)
    throw new ApiError('Not enough available seats', 400)

  const totalReserved = await Event.aggregate([
    { $unwind: '$reservations' },
    { $match: { 'reservations.userId': userIdObj } },
    { $group: { _id: null, total: { $sum: '$reservations.spotsReserved' } } },
  ]).then((result) => result[0]?.total || 0)

  // Validate total reservations across all events (should not exceed 5)
  if (totalReserved + spotsReserved > 5)
    throw new ApiError(
      'Cannot reserve more than 5 spots across all events',
      400
    )

  if (previousReservations) {
    previousReservations.spotsReserved += spotsReserved
  } else {
    event.reservations.push({ userId: userIdObj, spotsReserved })
  }

  event.availableSeats -= spotsReserved
  await event.save()

  return {
    reservedSpots: previousReservations?.spotsReserved || spotsReserved,
    remainingSeats: event.availableSeats,
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
