import apiClient from "./apiClient";
import { Match } from "../types/match";
import { ReservationResponse } from "../types/reservation";

// Get all matches
export const getAllMatches = async (search = ""): Promise<Match[]> => {
  const res = await apiClient.get<Match[]>(`/events${search ? `?search=${search}` : ""}`);
  return res.data;
};

// Get a single match by ID
export const getMatchById = async (matchId: string): Promise<Match> => {
  const res = await apiClient.get<Match>(`/events/${matchId}`);
  return res.data;
};

// Reserve a match
export const reserveMatch = async (matchId: string, spotsReserved: number): Promise<ReservationResponse> => {
  const res = await apiClient.post<ReservationResponse>(`/events/${matchId}/reserve`, { spotsReserved });
  return res.data;
};

// Cancel a reservation for a match
export const cancelReservation = async (matchId: string): Promise<ReservationResponse> => {
  const res = await apiClient.delete<ReservationResponse>(`/events/${matchId}/reserve`);
  return res.data;
};
