import { Text, ScrollView, View, Alert } from "react-native";
import { RadioButton } from "react-native-paper";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { reserveMatch } from "../../api/match";
import MatchCard from "../../components/MatchCard";
import Button from "../../components/Button"; // <-- custom button import
import { Match } from "../../types/match";
import styles from "./styles";

type ReservationRouteProp = RouteProp<{ params: { match: Match } }, "params">;

const MAX_SPOTS_PER_USER = 2;

const ReservationScreen = () => {
  const route = useRoute<ReservationRouteProp>();
  const navigation = useNavigation();
  const { token, userId } = useAuth();
  const { match } = route.params;

  const userReservation = match.reservations.find((r) => r.userId === userId);
  const reservedSpots = userReservation?.spotsReserved || 0;

  const [spots, setSpots] = useState<number>(reservedSpots || 1);
  const [isLoading, setIsLoading] = useState(false);

  const canReserveMore = reservedSpots < MAX_SPOTS_PER_USER;
  const availableOptions = Array.from({ length: MAX_SPOTS_PER_USER - reservedSpots }, (_, i) => i + 1);

  const handleReserve = async () => {
    if (!canReserveMore) return;
    try {
      setIsLoading(true);
      await reserveMatch(match._id, spots, token);
      navigation.goBack();
    } catch (err: any) {
      Alert.alert("Error", err.message || "Could not reserve");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Reuse the same match card component */}
      <MatchCard match={match} showReserveButton={false} />

      {/* Full-width reservation status card/tag */}
      {reservedSpots > 0 && (
        <View style={styles.reservationTag}>
          <Text style={styles.reservationTagText}>
            You have already reserved {reservedSpots} {reservedSpots === 1 ? "spot" : "spots"}.
          </Text>
        </View>
      )}

      {/* Spot Selector */}
      <RadioButton.Group onValueChange={(value) => setSpots(Number(value))} value={spots.toString()}>
        {availableOptions.map((n) => (
          <RadioButton.Item
            key={n}
            label={`${n} ${n === 1 ? "Spot" : "Spots"}`}
            value={n.toString()}
            disabled={isLoading}
          />
        ))}
      </RadioButton.Group>

      {/* Reserve Button */}
      <Button title="Reserve" onPress={handleReserve} loading={isLoading} disabled={isLoading || !canReserveMore} />
    </ScrollView>
  );
};

export default ReservationScreen;
