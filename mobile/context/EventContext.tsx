import { createContext, useState, ReactNode } from "react";

interface Event {
  id: string;
  name: string;
  country: string;
  date: string;
  teams: string[];
  availableSpots: number;
}

interface EventContextProps {
  events: Event[];
  setEvents: (events: Event[]) => void;
  reservations: Record<string, number>;
  setReservations: (res: Record<string, number>) => void;
}

export const EventContext = createContext<EventContextProps | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [reservations, setReservations] = useState<Record<string, number>>({});

  return (
    <EventContext.Provider value={{ events, setEvents, reservations, setReservations }}>
      {children}
    </EventContext.Provider>
  );
};
