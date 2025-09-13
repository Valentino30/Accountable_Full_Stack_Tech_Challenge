export interface Event {
  _id: string;
  id_odsp: string;
  date: string;
  country: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  price: number;
  availableSeats: number;
  reservations: Array<{ userId: string }>;
  reservedByUser?: boolean;
}
