import { useState } from "react";
import { View, TextInput, FlatList } from "react-native";
import MatchCard from "../../components/MatchCard";
import { useAuth } from "../../context/AuthContext";
import styles from "./styles";
import { useMatches } from "../../hooks/useMatches";

const MatchListScreen = () => {
  const { token } = useAuth();
  const [search, setSearch] = useState("");
  const { data: matches = [], refetch, isFetching } = useMatches(token, search);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by country, team, or date"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      <FlatList
        data={matches}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <MatchCard match={item} />}
        refreshing={isFetching}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default MatchListScreen;
