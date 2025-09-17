import { Types } from 'mongoose'
import Event from '../../models/Event'
import { IEvent } from '../../types/event.types'
import { ApiError } from '../errors/base'

export const validateSpotsReserved = (spotsReserved: number) => {
  if (!spotsReserved || spotsReserved < 1 || spotsReserved > 2) {
    throw new ApiError('Invalid number of reservations', 400)
  }
}

export const validateEventExists = (event: IEvent | null) => {
  if (!event) {
    throw new ApiError('Event not found', 404)
  }
}

export const validateEventReservationLimit = (
  event: IEvent,
  userId: string,
  spotsReserved: number
) => {
  const userIdObj = new Types.ObjectId(userId)
  const previousReservations = event.reservations.find((r) =>
    r.userId.equals(userIdObj)
  )
  if ((previousReservations?.spotsReserved || 0) + spotsReserved > 2) {
    throw new ApiError('Cannot reserve more than 2 spots for this event', 400)
  }
}

export const validateAvailableSeats = (
  event: IEvent,
  spotsReserved: number
) => {
  if (event.availableSeats < spotsReserved) {
    throw new ApiError('Not enough available seats', 400)
  }
}

export const validateTotalReservationLimit = async (
  userId: string,
  spotsReserved: number
) => {
  const userIdObj = new Types.ObjectId(userId)
  const totalReserved = await Event.aggregate([
    { $unwind: '$reservations' },
    { $match: { 'reservations.userId': userIdObj } },
    { $group: { _id: null, total: { $sum: '$reservations.spotsReserved' } } },
  ]).then((result) => result[0]?.total || 0)

  if (totalReserved + spotsReserved > 5) {
    throw new ApiError(
      'Cannot reserve more than 5 spots across all events',
      400
    )
  }
}
