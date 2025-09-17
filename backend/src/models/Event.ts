import { Schema, model } from 'mongoose'
import { IEvent, IReservation } from '../types/event.types'

export const ReservationSchema = new Schema<IReservation>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    spotsReserved: { type: Number, required: true, min: 1 },
  },
  { _id: false }
)

const EventSchema = new Schema<IEvent>(
  {
    id_odsp: { type: String, required: true, unique: true },
    date: { type: Date, required: true, index: true }, // Index for fast filtering by date
    country: { type: String, required: true, index: true }, // Index for fast filtering by country
    homeTeam: { type: String, required: true, index: true }, // Index for fast filtering by home team
    awayTeam: { type: String, required: true, index: true }, // Index for fast filtering by away team
    league: { type: String, required: true },
    price: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    reservations: { type: [ReservationSchema], default: [] },
  },
  { timestamps: true }
)

// Create a compound index on homeTeam and awayTeam.
// This is crucial for optimizing the `$or` query in getEvents,
// as it allows MongoDB to quickly find documents where a search term
// matches either the home or away team field.
EventSchema.index({ homeTeam: 1, awayTeam: 1 })

export default model<IEvent>('Event', EventSchema)
