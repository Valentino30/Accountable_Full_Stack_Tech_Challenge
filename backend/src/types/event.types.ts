import { Types } from 'mongoose'

export interface IReservation {
  userId: Types.ObjectId
  spotsReserved: number
}

export interface IEvent extends Document {
  id_odsp: string
  date: Date
  country: string
  homeTeam: string
  awayTeam: string
  league: string
  price: number
  availableSeats: number
  reservations: IReservation[]
}

export interface IGetEventsParams {
  country?: string
  date?: string
  team?: string
  page: number
  limit: number
}

export interface IReserveEventParams {
  eventId: string
  userId: string
  spotsReserved: number
}

export interface ICancelReservationParams {
  eventId: string
  userId: string
}
