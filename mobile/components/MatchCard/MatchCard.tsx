import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from "./styles";
import { Match } from "../../types/match";
import { generateTeamLogo } from "../../utils/generateTeamLogo";
import { RootStackParamList } from "../../navigation/AppNavigator";
import Button from "../Button"; // import Button

type MatchCardNavigationProp = StackNavigationProp<RootStackParamList, "Matches">;

interface MatchCardProps {
  match: Match;
  clickable?: boolean; // default true
  onPress?: () => void; // optional custom handler
  showReserveButton?: boolean; // optional to hide Reserve button
}

const MatchCard = ({ match, clickable = true, onPress, showReserveButton = true }: MatchCardProps) => {
  const navigation = useNavigation<MatchCardNavigationProp>();

  const homeLogo = generateTeamLogo(match.homeTeam);
  const awayLogo = generateTeamLogo(match.awayTeam);

  const handlePress = () => {
    if (onPress) return onPress();
    if (clickable) navigation.navigate("Reservation", { match });
  };

  const renderLogo = (initials: string, color: string) => (
    <View style={[styles.logo, { backgroundColor: color }]}>
      <Text style={styles.logoText}>{initials}</Text>
    </View>
  );

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={clickable ? 0.7 : 1}
      onPress={clickable ? handlePress : undefined}
    >
      {/* Teams Row */}
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

      {/* Match Details */}
      <Text style={styles.details}>
        {match.country} • {new Date(match.date).toLocaleDateString()}
      </Text>

      <Text style={styles.spots}>{match.availableSeats} spots available</Text>

      {/* Reserve Button using Button */}
      {clickable && showReserveButton && !onPress && <Button title="Reserve" onPress={handlePress} />}
    </TouchableOpacity>
  );
};

export default MatchCard;
