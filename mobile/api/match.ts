import apiClient from "./apiClient";
import { Match, MatchFilters, MatchFilterType } from "../types/match";
import { ReservationResponse } from "../types/reservation";

// Get all matches
export const getAllMatches = async (search: string, filterType: MatchFilterType): Promise<Match[]> => {
  const params = new URLSearchParams();

  if (search) {
    if (filterType === "country") params.append("country", search);
    else if (filterType === "team") {
      // We don’t know if it’s home or away, so let backend handle both
      params.append("team", search);
    } else if (filterType === "date") params.append("date", search);
    else params.append("search", search); // fallback: global search
  }

  const queryString = params.toString() ? `?${params.toString()}` : "";
  console.log(`/events${queryString}`);
  const res = await apiClient.get<Match[]>(`/events${queryString}`);
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
