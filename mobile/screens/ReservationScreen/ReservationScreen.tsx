import { Text, ScrollView, View, Alert } from "react-native";
import { RadioButton } from "react-native-paper";
import { useRoute, RouteProp, useFocusEffect } from "@react-navigation/native";
import { useState, useMemo, useCallback } from "react";
import MatchCard from "../../components/MatchCard";
import Button from "../../components/Button";
import { Match } from "../../types/match";
import styles from "./styles";
import { useCancelReservation, useReserveMatch } from "../../hooks/useMatches";
import { useUser } from "../../hooks/useUser";

type ReservationRouteProp = RouteProp<{ params: { match: Match } }, "params">;

const MAX_SPOTS_PER_USER = 2;

const ReservationScreen = () => {
  const route = useRoute<ReservationRouteProp>();
  const { userId } = useUser();
  const { match } = route.params;

  const userReservation = match.reservations.find((r) => r.userId === userId);
  const initialReservedSpots = userReservation?.spotsReserved || 0;

  const [localReservedSpots, setLocalReservedSpots] = useState<number>(initialReservedSpots);
  const [spots, setSpots] = useState<number>(1);
  const [showWarning, setShowWarning] = useState(false);

  const warningMessage = useMemo(() => {
    if (spots + localReservedSpots > MAX_SPOTS_PER_USER) {
      return `You can only reserve up to ${MAX_SPOTS_PER_USER} spots per match.`;
    }
    return null;
  }, [spots, localReservedSpots]);

  const { mutate: reserveMutate, isPending: isReserving } = useReserveMatch();
  const { mutate: cancelMutate, isPending: isCancelling } = useCancelReservation();

  const handleReserve = () => {
    if (spots + localReservedSpots > MAX_SPOTS_PER_USER) {
      setShowWarning(true); // show yellow label
      return;
    }

    setShowWarning(false); // clear yellow label if valid
    reserveMutate(
      { matchId: match._id, spotsReserved: spots },
      {
        onSuccess: () => setLocalReservedSpots((prev) => prev + spots),
        onError: (err: any) => {
          const backendMessage = err?.response?.data?.error || err.message || "Could not reserve";
          Alert.alert("Error", backendMessage);
        },
      }
    );
  };

  const handleCancelReservation = () => {
    cancelMutate(
      { matchId: match._id },
      {
        onSuccess: () => {
          setLocalReservedSpots(0);
          setSpots(1);
          setShowWarning(false); // also clear warning
          Alert.alert("Success", "Reservation cancelled");
        },
        onError: (err: any) => Alert.alert("Error", err.message || "Could not cancel reservation"),
      }
    );
  };

  const availableOptions = Array.from({ length: MAX_SPOTS_PER_USER }, (_, i) => i + 1);

  // Clear yellow label when navigating away
  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowWarning(false);
      };
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MatchCard match={match} showReserveButton={false} />

      {/* Always show green tag if reserved spots > 0 */}
      {localReservedSpots > 0 && !showWarning && (
        <View style={[styles.reservationTag, styles.reservationTagGreen]}>
          <Text style={styles.reservationTagGreen}>
            You have reserved {localReservedSpots} {localReservedSpots === 1 ? "spot" : "spots"}.
          </Text>
        </View>
      )}

      {/* Show yellow warning only if user tried to exceed limit */}
      {showWarning && (
        <View style={[styles.reservationTag, styles.reservationTagYellow]}>
          <Text style={styles.reservationTagYellow}>{warningMessage}</Text>
        </View>
      )}

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
        <Button title="Reserve" onPress={handleReserve} loading={isReserving} disabled={isReserving} />

        {localReservedSpots > 0 && (
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
