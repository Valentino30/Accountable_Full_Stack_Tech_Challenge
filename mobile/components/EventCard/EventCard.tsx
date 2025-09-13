import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { Event } from "../../types/event";

interface EventCardProps {
  event: Event;
  onReserve: (eventId: string) => void;
  isReserving: boolean;
}

// Generate a simple colored logo with initials
const generateTeamLogo = (teamName: string) => {
  const colors = ["#FF6B6B", "#4ECDC4", "#556270", "#C7F464", "#FF6B6B"];
  const color = colors[teamName.charCodeAt(0) % colors.length];
  const initials = teamName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: color,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold" }}>{initials}</Text>
    </View>
  );
};

const EventCard: React.FC<EventCardProps> = ({ event, onReserve, isReserving }) => {
  const isReserved = event.reservedByUser || event.availableSeats <= 0;

  return (
    <View style={[styles.card, isReserved && styles.cardDisabled]}>
      {isReserved && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Reserved</Text>
        </View>
      )}

      <View style={styles.teamsContainer}>
        <View style={styles.teamContainer}>
          {generateTeamLogo(event.homeTeam)}
          <Text style={styles.team} numberOfLines={1} ellipsizeMode="tail">
            {event.homeTeam}
          </Text>
        </View>

        <View style={styles.vsContainer}>
          <Text style={styles.vs}>VS</Text>
        </View>

        <View style={styles.teamContainer}>
          {generateTeamLogo(event.awayTeam)}
          <Text style={styles.team} numberOfLines={1} ellipsizeMode="tail">
            {event.awayTeam}
          </Text>
        </View>
      </View>

      <Text style={styles.details}>
        {event.country} • {new Date(event.date).toLocaleDateString()}
      </Text>

      <Text style={[styles.spots, event.availableSeats === 0 && styles.spotsFull]}>
        Spots Available: {event.availableSeats}
      </Text>

      <TouchableOpacity
        style={[styles.button, isReserved && styles.buttonDisabled]}
        onPress={() => onReserve(event._id)}
        disabled={isReserved || isReserving}
      >
        <Text style={styles.buttonText}>{event.reservedByUser ? "Reserved" : "Reserve"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventCard;
