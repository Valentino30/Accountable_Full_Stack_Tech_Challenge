import { useCallback, useEffect, useMemo, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native'
import { RadioButton } from 'react-native-paper'
import Button from '../../components/Button'
import MatchCard from '../../components/MatchCard'
import { useCancelReservation, useReserveMatch } from '../../hooks/useMatches'
import { useUser } from '../../hooks/useUser'
import { Match } from '../../types/match'
import styles from './styles'

type ReservationRouteProp = RouteProp<{ params: { match: Match } }, 'params'>

const MAX_SPOTS_PER_USER = 2

const ReservationScreen = () => {
  const route = useRoute<ReservationRouteProp>()
  const { userId } = useUser()
  const { match } = route.params

  const userReservation = match.reservations.find((r) => r.userId === userId)
  const initialReservedSpots = userReservation?.spotsReserved || 0

  const [localReservedSpots, setLocalReservedSpots] =
    useState<number>(initialReservedSpots)
  const [spots, setSpots] = useState<number>(1)

  // New state to manage all types of feedback (success, error, warning)
  const [feedback, setFeedback] = useState<{
    message: string | null
    type: 'success' | 'error' | 'warning' | null
  }>({
    message: null,
    type: null,
  })

  const { mutate: reserveMutate, isPending: isReserving } = useReserveMatch()
  const { mutate: cancelMutate, isPending: isCancelling } =
    useCancelReservation()

  const handleReserve = () => {
    if (spots + localReservedSpots > MAX_SPOTS_PER_USER) {
      setFeedback({
        message: `You can only reserve up to ${MAX_SPOTS_PER_USER} spots per match.`,
        type: 'warning',
      })
      return
    }

    setFeedback({ message: null, type: null }) // Clear existing feedback
    reserveMutate(
      { matchId: match._id, spotsReserved: spots },
      {
        onSuccess: () => {
          setLocalReservedSpots((prev) => prev + spots)
          setFeedback({
            message: 'Reservation confirmed!',
            type: 'success',
          })
        },
        onError: (err: any) => {
          const backendMessage =
            err?.response?.data?.error || err.message || 'Could not reserve'
          setFeedback({ message: backendMessage, type: 'error' })
        },
      }
    )
  }

  const handleCancelReservation = () => {
    setFeedback({ message: null, type: null }) // Clear existing feedback
    cancelMutate(
      { matchId: match._id },
      {
        onSuccess: () => {
          setLocalReservedSpots(0)
          setSpots(1)
          setFeedback({
            message: 'Reservation cancelled.',
            type: 'success',
          })
        },
        onError: (err: any) =>
          setFeedback({
            message: err.message || 'Could not cancel reservation',
            type: 'error',
          }),
      }
    )
  }

  const availableOptions = Array.from(
    { length: MAX_SPOTS_PER_USER },
    (_, i) => i + 1
  )

  // Auto-hide the feedback message after 5 seconds
  useEffect(() => {
    if (feedback.message) {
      const timer = setTimeout(() => {
        setFeedback({ message: null, type: null })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [feedback])

  // Clear feedback when navigating away
  useFocusEffect(
    useCallback(() => {
      return () => {
        setFeedback({ message: null, type: null })
      }
    }, [])
  )

  const tagStyle = useMemo(() => {
    switch (feedback.type) {
      case 'success':
        return styles.reservationTagGreen
      case 'error':
        return styles.reservationTagRed
      case 'warning':
        return styles.reservationTagYellow
      default:
        return null
    }
  }, [feedback.type])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MatchCard match={match} showReserveButton={false} />

      {/* Show the feedback tag if a message exists */}
      {feedback.message && (
        <View style={[styles.reservationTag, tagStyle]}>
          <Text style={tagStyle}>{feedback.message}</Text>
        </View>
      )}

      {/* Show reserved spots tag only when there is no other feedback */}
      {localReservedSpots > 0 && !feedback.message && (
        <View style={[styles.reservationTag, styles.reservationTagGreen]}>
          <Text style={styles.reservationTagGreen}>
            You have reserved {localReservedSpots}{' '}
            {localReservedSpots === 1 ? 'spot' : 'spots'}.
          </Text>
        </View>
      )}

      <RadioButton.Group
        onValueChange={(value) => setSpots(Number(value))}
        value={spots.toString()}
      >
        {availableOptions.map((n) => (
          <RadioButton.Item
            key={n}
            label={`${n} ${n === 1 ? 'Spot' : 'Spots'}`}
            value={n.toString()}
            disabled={isReserving || isCancelling}
          />
        ))}
      </RadioButton.Group>

      <View style={styles.buttonContainer}>
        <Button
          title="Reserve"
          onPress={handleReserve}
          loading={isReserving}
          disabled={isReserving}
          containerStyle={styles.buttonFullWidth}
        />

        {localReservedSpots > 0 && (
          <Button
            title="Cancel Reservation"
            onPress={handleCancelReservation}
            loading={isCancelling}
            disabled={isCancelling}
            containerStyle={[styles.buttonFullWidth, styles.buttonTopMargin]}
          />
        )}
      </View>
    </ScrollView>
  )
}

export default ReservationScreen
