import { Event } from "./event";

export interface ReservationResponse {
  success: boolean;
  message: string;
  reservedEvent?: Event;
}
