import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { cancelReservation, getAllMatches, reserveMatch } from '../api/match'
import { ApiError } from '../types/api'
import { Match, UseMatchesParams } from '../types/match'
import { ReservationResponse } from '../types/reservation'

export const useMatches = ({
  search,
  filterType,
  date,
}: UseMatchesParams): UseQueryResult<Match[], ApiError> => {
  return useQuery<Match[], ApiError>({
    queryKey: ['matches', search, filterType, date],
    queryFn: () => getAllMatches({ search, filterType, date }),
  })
}

export const useReserveMatch = (): UseMutationResult<
  ReservationResponse,
  ApiError,
  { matchId: string; spotsReserved: number }
> => {
  const queryClient = useQueryClient()

  return useMutation<
    ReservationResponse,
    ApiError,
    { matchId: string; spotsReserved: number }
  >({
    mutationFn: async ({ matchId, spotsReserved }) => {
      return reserveMatch(matchId, spotsReserved)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] })
    },
  })
}

export const useCancelReservation = (): UseMutationResult<
  ReservationResponse,
  ApiError,
  { matchId: string }
> => {
  const queryClient = useQueryClient()

  return useMutation<ReservationResponse, ApiError, { matchId: string }>({
    mutationFn: async ({ matchId }) => {
      return cancelReservation(matchId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] })
    },
  })
}
