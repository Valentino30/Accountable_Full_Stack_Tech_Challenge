export interface Match {
  _id: string;
  id_odsp: string;
  date: string;
  country: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  price: number;
  availableSeats: number;
  reservations: Array<{ userId: string; spotsReserved: number }>;
  reservedByUser?: boolean;
}

export interface UseMatchesParams {
  search: string;
  filterType: MatchFilterType;
}

export type MatchFilterType = "country" | "team" | "date";

export interface MatchFilters {
  country?: string;
  date?: string;
  homeTeam?: string;
  awayTeam?: string;
  league?: string;
}
export interface TeamLogoParams {
  initials: string;
  color: string;
}
