import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Event } from "../../types/event";
import { generateTeamLogo } from "../../utils/generateTeamLogo";
import { useAuth } from "../../context/AuthContext";

interface EventCardProps {
  event: Event;
  onReserve: (eventId: string, spots: number) => void;
  isReserving: boolean;
}

const EventCard = ({ event, onReserve, isReserving }: EventCardProps) => {
  const { userId } = useAuth();

  // Get how many spots the current user has reserved for this event
  const userReservedSpots = event.reservations?.find((r) => r.userId === userId)?.spotsReserved || 0;

  const [spots, setSpots] = useState<number>(1);
  const [maxSelectable, setMaxSelectable] = useState<number>(2);

  useEffect(() => {
    // Max spots selectable is min(2 per event minus already reserved, available seats)
    const max = Math.min(2 - userReservedSpots, event.availableSeats);
    setMaxSelectable(max);
    if (spots > max) setSpots(max > 0 ? max : 1);
  }, [userReservedSpots, event.availableSeats]);

  const isReserved = userReservedSpots > 0 || event.availableSeats <= 0;

  const homeLogo = generateTeamLogo(event.homeTeam);
  const awayLogo = generateTeamLogo(event.awayTeam);

  const renderLogo = (initials: string, color: string) => (
    <View style={[styles.logo, { backgroundColor: color }]}>
      <Text style={styles.logoText}>{initials}</Text>
    </View>
  );

  const handleReserve = () => {
    // Optimistic UI: immediately update reserved spots
    onReserve(event._id, spots);
  };

  return (
    <View style={[styles.card, isReserved && styles.cardDisabled]}>
      {isReserved && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{userReservedSpots > 0 ? `Reserved ${userReservedSpots}` : "Sold Out"}</Text>
        </View>
      )}

      <View style={styles.teamsContainer}>
        <View style={styles.teamContainer}>
          {renderLogo(homeLogo.initials, homeLogo.color)}
          <Text style={styles.team} numberOfLines={1} ellipsizeMode="tail">
            {event.homeTeam}
          </Text>
        </View>

        <View style={styles.vsContainer}>
          <Text style={styles.vs}>VS</Text>
        </View>

        <View style={styles.teamContainer}>
          {renderLogo(awayLogo.initials, awayLogo.color)}
          <Text style={styles.team} numberOfLines={1} ellipsizeMode="tail">
            {event.awayTeam}
          </Text>
        </View>
      </View>

      <Text style={styles.details}>
        {event.country} • {new Date(event.date).toLocaleDateString()}
      </Text>

      <Text style={[styles.spots, event.availableSeats === 0 && styles.spotsFull]}>
        {event.availableSeats} spots available
      </Text>

      {/* Seat selector */}
      <View style={styles.seatSelectorContainer}>
        {[1, 2].map((n) => (
          <TouchableOpacity
            key={n}
            onPress={() => setSpots(n)}
            style={[styles.seatButton, spots === n && styles.seatButtonActive]}
            disabled={isReserving || n > maxSelectable || isReserved}
          >
            <Text style={[styles.seatButtonText, spots === n && styles.seatButtonTextActive]}>
              {n} {n === 1 ? "Spot" : "Spots"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, (isReserving || maxSelectable === 0 || isReserved) && styles.buttonDisabled]}
        onPress={handleReserve}
        disabled={isReserving || maxSelectable === 0 || isReserved}
      >
        <Text style={styles.buttonText}>{userReservedSpots > 0 ? `Reserved ${userReservedSpots}` : "Reserve"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventCard;
