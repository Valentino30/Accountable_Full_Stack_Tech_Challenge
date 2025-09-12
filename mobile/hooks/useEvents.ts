// src/hooks/useEvents.ts
import { useQuery, useMutation, useQueryClient, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import apiClient from "../api/apiClient";
import { ReservationResponse } from "../types/reservation";
import { ApiError } from "../types/api";
import { Event } from "../types/event";

export const useEvents = (token: string | null, search = ""): UseQueryResult<Event[], ApiError> => {
  return useQuery<Event[], ApiError>({
    queryKey: ["events", search],
    queryFn: async () => {
      const res = await apiClient.get<Event[]>(`/events${search ? `?search=${search}` : ""}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data;
    },
    enabled: !!token,
  });
};

export const useReserveEvent = (token: string | null): UseMutationResult<ReservationResponse, ApiError, string> => {
  const queryClient = useQueryClient();

  return useMutation<ReservationResponse, ApiError, string>({
    mutationFn: async (eventId: string) => {
      const res = await apiClient.post<ReservationResponse>(
        `/events/${eventId}/reserve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
