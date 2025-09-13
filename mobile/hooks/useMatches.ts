import { useQuery, useMutation, useQueryClient, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { Match } from "../types/match";
import { ApiError } from "../types/api";
import { ReservationResponse } from "../types/reservation";
import { cancelReservation, getAllMatches, reserveMatch } from "../api/match";

// Fetch all matches
export const useMatches = (token: string | null, search = ""): UseQueryResult<Match[], ApiError> => {
  return useQuery<Match[], ApiError>({
    queryKey: ["matches", search],
    queryFn: async () => {
      if (!token) throw new Error("User not authenticated");

      // Use the API function you already wrote
      const res = await getAllMatches(token, search);
      return res;
    },
    enabled: !!token,
  });
};

// Reserve a match
export const useReserveMatch = (
  token: string | null
): UseMutationResult<ReservationResponse, ApiError, { matchId: string; spotsReserved: number }> => {
  const queryClient = useQueryClient();

  return useMutation<ReservationResponse, ApiError, { matchId: string; spotsReserved: number }>({
    mutationFn: async ({ matchId, spotsReserved }) => {
      return reserveMatch(matchId, spotsReserved, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
  });
};

// Cancel a reservation
export const useCancelReservation = (
  token: string | null
): UseMutationResult<ReservationResponse, ApiError, { matchId: string }> => {
  const queryClient = useQueryClient();

  return useMutation<ReservationResponse, ApiError, { matchId: string }>({
    mutationFn: async ({ matchId }) => {
      if (!token) throw new Error("User not authenticated");
      return cancelReservation(matchId, token);
    },
    onSuccess: () => {
      // Invalidate matches query to refresh cached data
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
  });
};
