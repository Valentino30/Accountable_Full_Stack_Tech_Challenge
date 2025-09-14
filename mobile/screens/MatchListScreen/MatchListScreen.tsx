import { useState } from "react";
import { View, FlatList } from "react-native";
import MatchCard from "../../components/MatchCard";
import styles from "./styles";
import { useMatches } from "../../hooks/useMatches";
import { MatchFilterType } from "../../types/match";
import SearchBarWithFilter from "../../components/SearchBarWithFilter";

const MatchListScreen = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<MatchFilterType>("team");

  const { data: matches = [], refetch, isFetching } = useMatches({ search, filterType });

  return (
    <View style={styles.container}>
      <SearchBarWithFilter
        search={search}
        onSearchChange={setSearch}
        filterType={filterType}
        onFilterChange={setFilterType}
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
