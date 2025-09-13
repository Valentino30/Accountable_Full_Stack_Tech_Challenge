import { createContext, useState, ReactNode } from "react";
import { Match } from "../types/match";
interface MatchContextProps {
  matches: Match[];
  setMatches: (matches: Match[]) => void;
  reservations: Record<string, number>;
  setReservations: (res: Record<string, number>) => void;
}

export const MatchContext = createContext<MatchContextProps | undefined>(undefined);

export const MatchProvider = ({ children }: { children: ReactNode }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [reservations, setReservations] = useState<Record<string, number>>({});

  return (
    <MatchContext.Provider value={{ matches, setMatches, reservations, setReservations }}>
      {children}
    </MatchContext.Provider>
  );
};
