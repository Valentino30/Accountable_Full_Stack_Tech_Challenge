import { useQuery, useMutation, useQueryClient, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { Match } from "../types/match";
import { ApiError } from "../types/api";
import { ReservationResponse } from "../types/reservation";
import { cancelReservation, getAllMatches, reserveMatch } from "../api/match";

// Fetch all matches
export const useMatches = (search = ""): UseQueryResult<Match[], ApiError> => {
  return useQuery<Match[], ApiError>({
    queryKey: ["matches", search],
    queryFn: async () => {
      return getAllMatches(search);
    },
  });
};

// Reserve a match
export const useReserveMatch = (): UseMutationResult<
  ReservationResponse,
  ApiError,
  { matchId: string; spotsReserved: number }
> => {
  const queryClient = useQueryClient();

  return useMutation<ReservationResponse, ApiError, { matchId: string; spotsReserved: number }>({
    mutationFn: async ({ matchId, spotsReserved }) => {
      return reserveMatch(matchId, spotsReserved);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
  });
};

// Cancel a reservation
export const useCancelReservation = (): UseMutationResult<ReservationResponse, ApiError, { matchId: string }> => {
  const queryClient = useQueryClient();

  return useMutation<ReservationResponse, ApiError, { matchId: string }>({
    mutationFn: async ({ matchId }) => {
      return cancelReservation(matchId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
  });
};
