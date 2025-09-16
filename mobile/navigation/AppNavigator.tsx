import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LogoutIconButton from '../components/LogoutIconButton'
import { useAuth } from '../hooks/useAuth'
import AuthScreen from '../screens/AuthScreen'
import MatchListScreen from '../screens/MatchListScreen'
import ReservationScreen from '../screens/ReservationScreen'
import { Match } from '../types/match'

export type RootStackParamList = {
  Auth: undefined
  Matches: undefined
  Reservation: { match: Match }
}

const Stack = createStackNavigator<RootStackParamList>()

const AppNavigator = () => {
  const { accessToken } = useAuth()

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => (accessToken ? <LogoutIconButton /> : null),
        }}
      >
        {accessToken ? (
          <>
            <Stack.Screen
              name="Matches"
              component={MatchListScreen}
              options={{ title: 'Matches' }}
            />
            <Stack.Screen
              name="Reservation"
              component={ReservationScreen}
              options={{ title: 'Reserve Spots' }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
