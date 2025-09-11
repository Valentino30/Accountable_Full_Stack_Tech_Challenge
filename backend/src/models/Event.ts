import { Schema, model, Document, Types } from "mongoose";

export interface IReservation {
  userId: Types.ObjectId;
  spotsReserved: number;
}

export interface IEvent extends Document {
  id_odsp: string;
  date: Date;
  country: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  price: number;
  availableSeats: number;
  reservations: IReservation[];
}

export const ReservationSchema = new Schema<IReservation>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    spotsReserved: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const EventSchema = new Schema<IEvent>(
  {
    id_odsp: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    country: { type: String, required: true },
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    league: { type: String, required: true },
    price: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    reservations: { type: [ReservationSchema], default: [] },
  },
  { timestamps: true }
);

export default model<IEvent>("Event", EventSchema);
