import { useState, useContext } from "react";
import { View, TextInput, FlatList } from "react-native";
import { useEvents, useReserveEvent } from "../../hooks/useEvents";
import EventCard from "../../components/EventCard";
import { useAuth } from "../../context/AuthContext";
import styles from "./styles";

const EventListScreen: React.FC = () => {
  const { token } = useAuth();
  const [search, setSearch] = useState("");
  const { data: events = [], refetch, isFetching } = useEvents(token, search);
  const reserveMutation = useReserveEvent(token);

  const handleReserve = (eventId: string) => reserveMutation.mutate(eventId);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by country, team, or date"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      <FlatList
        data={events}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <EventCard event={item} onReserve={handleReserve} isReserving={reserveMutation.isPending} />
        )}
        refreshing={isFetching}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default EventListScreen;
