import { Text, ScrollView, View, Alert } from "react-native";
import { RadioButton } from "react-native-paper";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useState } from "react";
import MatchCard from "../../components/MatchCard";
import Button from "../../components/Button";
import { Match } from "../../types/match";
import styles from "./styles";
import { useCancelReservation, useReserveMatch } from "../../hooks/useMatches";
import { useAuth } from "../../hooks/useAuth";

type ReservationRouteProp = RouteProp<{ params: { match: Match } }, "params">;

const MAX_SPOTS_PER_USER = 2;

const ReservationScreen = () => {
  const route = useRoute<ReservationRouteProp>();
  const { userId } = useAuth();
  const { match } = route.params;
  const userReservation = match.reservations.find((r) => r.userId === userId);
  const reservedSpots = userReservation?.spotsReserved || 0;
  const [spots, setSpots] = useState<number>(reservedSpots || 1);
  const canReserveMore = reservedSpots < MAX_SPOTS_PER_USER;
  const availableOptions = Array.from({ length: MAX_SPOTS_PER_USER - reservedSpots }, (_, i) => i + 1);

  const { mutate: reserveMutate, isPending: isReserving } = useReserveMatch();
  const { mutate: cancelMutate, isPending: isCancelling } = useCancelReservation();

  const handleReserve = () => {
    if (!canReserveMore) return;
    reserveMutate(
      { matchId: match._id, spotsReserved: spots },
      {
        onError: (err: any) => Alert.alert("Error", err.message || "Could not reserve"),
      }
    );
  };

  const handleCancelReservation = () => {
    cancelMutate(
      { matchId: match._id },
      {
        onSuccess: () => {
          Alert.alert("Success", "Reservation cancelled");
        },
        onError: (err: any) => Alert.alert("Error", err.message || "Could not cancel reservation"),
      }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Match Card */}
      <MatchCard match={match} showReserveButton={false} />

      {/* Reservation status */}
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
            disabled={isReserving || isCancelling}
          />
        ))}
      </RadioButton.Group>

      <View style={styles.buttonContainer}>
        {/* Reserve Button */}
        <Button
          title="Reserve"
          onPress={handleReserve}
          loading={isReserving}
          disabled={isReserving || !canReserveMore}
        />
        {/* Cancel Reservation Button */}
        {reservedSpots > 0 && (
          <Button
            title="Cancel Reservation"
            onPress={handleCancelReservation}
            loading={isCancelling}
            disabled={isCancelling}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default ReservationScreen;
