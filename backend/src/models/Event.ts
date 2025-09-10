import { Schema, model, Document } from "mongoose";

export interface IEvent extends Document {
  name: string;
  country: string;
  date: Date;
  team: string;
}

const EventSchema = new Schema<IEvent>(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    date: { type: Date, required: true },
    team: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IEvent>("Event", EventSchema);
