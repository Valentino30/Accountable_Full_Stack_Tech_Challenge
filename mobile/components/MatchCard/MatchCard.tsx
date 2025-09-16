import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigation/AppNavigator'
import { opacities } from '../../styles/theme'
import { Match } from '../../types/match'
import { generateTeamLogo } from '../../utils/generateTeamLogo'
import Button from '../Button'
import styles from './styles'

type MatchCardNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Matches'
>

interface MatchCardProps {
  match: Match
  clickable?: boolean
  onPress?: () => void
  showReserveButton?: boolean
}

const MatchCard = ({
  match,
  clickable = true,
  onPress,
  showReserveButton = true,
}: MatchCardProps) => {
  const navigation = useNavigation<MatchCardNavigationProp>()

  const homeLogo = generateTeamLogo(match.homeTeam)
  const awayLogo = generateTeamLogo(match.awayTeam)

  const handlePress = () => {
    if (onPress) return onPress()
    if (clickable) navigation.navigate('Reservation', { match })
  }

  const renderLogo = (initials: string, color: string) => (
    <View style={[styles.logo, { backgroundColor: color }]}>
      <Text style={styles.logoText}>{initials}</Text>
    </View>
  )

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={opacities.active}
      onPress={clickable ? handlePress : undefined}
    >
      {/* Teams Row - Left-aligned */}
      <View style={styles.teamsContainer}>
        <View style={styles.teamContainer}>
          {renderLogo(homeLogo.initials, homeLogo.color)}
          <Text style={styles.team}>{match.homeTeam}</Text>
        </View>

        <View style={styles.vsContainer}>
          <Text style={styles.vs}>VS</Text>
        </View>

        <View style={styles.teamContainer}>
          {renderLogo(awayLogo.initials, awayLogo.color)}
          <Text style={styles.team}>{match.awayTeam}</Text>
        </View>
      </View>

      {/* Details - Central */}
      <View style={styles.detailsContainer}>
        <Text style={styles.details}>
          {match.country.toUpperCase()} •{' '}
          {new Date(match.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>

      {/* Spots and Reserve Button - Vertical Stack */}
      <Text style={styles.spots}>{match.availableSeats} spots available</Text>

      {clickable && showReserveButton && (
        <Button
          title="Reserve"
          onPress={onPress ?? handlePress}
          containerStyle={styles.buttonFullWidth} // Added this style
        />
      )}
    </TouchableOpacity>
  )
}

export default MatchCard
