import { Schema, model, Document } from "mongoose";

export interface IEvent extends Document {
  name: string;
  country: string;
  date: Date;
  team: string;
  totalSpots: number;
  reservedSpots: number;
}

const EventSchema = new Schema<IEvent>(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    date: { type: Date, required: true },
    team: { type: String, required: true },
    totalSpots: { type: Number, required: true, min: 0, default: 100 }, // default can be anything
    reservedSpots: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true }
);

export default model<IEvent>("Event", EventSchema);
