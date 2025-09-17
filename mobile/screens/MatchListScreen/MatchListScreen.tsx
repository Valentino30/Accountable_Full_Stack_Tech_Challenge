import { useState } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import MatchCard from '../../components/MatchCard'
import SearchBarWithFilter from '../../components/SearchBarWithFilter'
import { useMatches } from '../../hooks/useMatches'
import { MatchFilterType } from '../../types/match'
import styles from './styles'

const MatchListScreen = () => {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<MatchFilterType>('team')
  const [date, setDate] = useState<Date | null>(null)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useMatches({
    search,
    filterType,
    date,
  })

  const allMatches = data?.pages.flatMap((page) => page) ?? []

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyCard}>
        <Text style={styles.emptyEmoji}>⚽</Text>
        <Text style={styles.emptyTitle}>No Matches Found</Text>
        <Text style={styles.emptySubtitle}>
          Try changing the search or date to see matches here.
        </Text>
      </View>
    </View>
  )

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
        data={allMatches}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <MatchCard match={item} />}
        onRefresh={refetch}
        refreshing={isRefetching && !isFetchingNextPage}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
          }
        }}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          allMatches.length === 0 ? styles.emptyContainer : styles.listContent
        }
        ListEmptyComponent={isFetching && !isRefetching ? null : <EmptyState />}
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator size="large" /> : null
        }
      />
    </View>
  )
}

export default MatchListScreen
