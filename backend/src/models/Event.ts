import { Schema, model, Document } from "mongoose";

export interface IEvent extends Document {
  id_odsp: string;
  date: Date;
  country: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  price: number;
  availableSeats: number;
}

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
  },
  { timestamps: true }
);

export default model<IEvent>("Event", EventSchema);
