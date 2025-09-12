export interface Event {
  _id: string;
  name: string;
  teamA: string;
  teamB: string;
  country: string;
  date: string;
  spotsAvailable: number;
  reservedByUser: boolean;
  userReservedCount?: number;
}
