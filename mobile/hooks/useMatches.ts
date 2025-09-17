import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query'
import { cancelReservation, getMatches, reserveMatch } from '../api/match'
import { ApiError } from '../types/api'
import { Match, UseMatchesParams } from '../types/match'
import { ReservationResponse } from '../types/reservation'
import { useDebounce } from './useDebounce'

export const useMatches = ({
  search,
  filterType,
  date,
}: UseMatchesParams): UseInfiniteQueryResult<
  { pages: Match[][]; pageParams: any[] },
  ApiError
> => {
  // Use useDebounce to Prevent the `getMatches`function from being called with every single keystroke.
  const debouncedSearch = useDebounce(search, 500)

  return useInfiniteQuery({
    queryKey: ['matches', debouncedSearch, filterType, date],
    queryFn: ({ pageParam }) =>
      getMatches({
        search: debouncedSearch,
        filterType,
        date,
        pageParam,
      }),
    // placeholderData keeps the previous data visible while the new data is being fetched.
    // This prevents the UI from flickering to an empty state during a search.
    placeholderData: (previousData) => previousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 20) {
        return undefined
      }
      return allPages.length + 1
    },
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
