import apiClient from "./apiClient";
import { Match } from "../types/match";
import { ReservationResponse } from "../types/reservation";

// Get all matches
export const getAllMatches = async (token: string, search = ""): Promise<Match[]> => {
  const res = await apiClient.get<Match[]>(`/events${search ? `?search=${search}` : ""}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get a single match by ID
export const getMatchById = async (matchId: string, token: string | null): Promise<Match> => {
  if (!token) throw new Error("User not authenticated");
  const res = await apiClient.get<Match>(`/events/${matchId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Reserve a match
export const reserveMatch = async (matchId: string, spotsReserved: number, token: string | null) => {
  if (!token) throw new Error("User not authenticated");
  const res = await apiClient.post<ReservationResponse>(
    `/events/${matchId}/reserve`,
    { spotsReserved },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

// Cancel a reservation for a match
export const cancelReservation = async (matchId: string, token: string | null) => {
  if (!token) throw new Error("User not authenticated");

  const res = await apiClient.delete<ReservationResponse>(`/events/${matchId}/reserve`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};
