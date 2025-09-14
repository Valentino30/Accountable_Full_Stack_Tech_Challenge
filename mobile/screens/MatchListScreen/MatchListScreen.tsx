import { useState } from "react";
import { View, FlatList, Text } from "react-native";
import MatchCard from "../../components/MatchCard";
import styles from "./styles";
import { useMatches } from "../../hooks/useMatches";
import { MatchFilterType } from "../../types/match";
import SearchBarWithFilter from "../../components/SearchBarWithFilter";

const MatchListScreen = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<MatchFilterType>("team");
  const [date, setDate] = useState<Date | null>(null);

  const {
    data: matches = [],
    refetch,
    isFetching,
  } = useMatches({
    search,
    filterType,
    date,
  });

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyCard}>
        <Text style={styles.emptyEmoji}>⚽</Text>
        <Text style={styles.emptyTitle}>No Matches Found</Text>
        <Text style={styles.emptySubtitle}>Try changing the search or date to see matches here.</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBarWithFilter
        search={search}
        onSearchChange={setSearch}
        filterType={filterType}
        onFilterChange={setFilterType}
        date={date}
        onDateChange={setDate}
      />

      <FlatList
        data={matches}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <MatchCard match={item} />}
        refreshing={isFetching}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={matches.length === 0 ? styles.emptyContainer : styles.listContent}
        ListEmptyComponent={isFetching ? null : <EmptyState />}
      />
    </View>
  );
};

export default MatchListScreen;
