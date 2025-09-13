import { Match } from "./match";

export interface ReservationResponse {
  success: boolean;
  message: string;
  reservedMatch?: Match;
}
