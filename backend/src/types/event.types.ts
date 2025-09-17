export interface GetEventsParams {
  country?: string
  date?: string
  team?: string
  page: number
  limit: number
}

export interface ReserveEventParams {
  eventId: string
  userId: string
  spotsReserved: number
}

export interface CancelReservationParams {
  eventId: string
  userId: string
}
