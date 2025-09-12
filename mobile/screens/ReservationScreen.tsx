import { useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useEvents } from "../hooks/useEvents";

const ReservationScreen: React.FC = () => {
  const { token } = useContext(AuthContext)!;
  const { data: events = [] } = useEvents(token);

  const reservedEvents = events.filter((e) => e.reservedByUser);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={reservedEvents}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12, padding: 12, borderWidth: 1, borderRadius: 8 }}>
            <Text>{item.name}</Text>
            <Text>
              {item.teamA} vs {item.teamB}
            </Text>
            <Text>
              {item.country} - {item.date}
            </Text>
            <Text>Spots Reserved: {item.userReservedCount}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ReservationScreen;
