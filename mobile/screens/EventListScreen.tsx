import { useState, useContext } from "react";
import { View, Text, FlatList, TextInput, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useEvents, useReserveEvent } from "../hooks/useEvents";
import { Event } from "../types/event";

const EventListScreen: React.FC = () => {
  const { token } = useContext(AuthContext)!;
  const [search, setSearch] = useState("");
  const { data: events = [], refetch, isFetching } = useEvents(token, search);
  const reserveMutation = useReserveEvent(token);

  const handleReserve = (eventId: string) => {
    reserveMutation.mutate(eventId);
  };

  const renderItem = ({ item }: { item: Event }) => (
    <View style={{ marginBottom: 12, padding: 12, borderWidth: 1, borderRadius: 8 }}>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
      <Text>
        {item.teamA} vs {item.teamB}
      </Text>
      <Text>
        {item.country} - {item.date}
      </Text>
      <Text>Spots Available: {item.spotsAvailable}</Text>
      <Button
        title={item.reservedByUser ? "Reserved" : "Reserve"}
        onPress={() => handleReserve(item._id)}
        disabled={item.reservedByUser || item.spotsAvailable <= 0 || reserveMutation.isPending}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder="Search by country, team, or date"
        value={search}
        onChangeText={(text) => setSearch(text)}
        style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
      />
      <FlatList
        data={events}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        refreshing={isFetching}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default EventListScreen;
