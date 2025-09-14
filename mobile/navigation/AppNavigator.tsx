import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthScreen from "../screens/AuthScreen";
import { Match } from "../types/match";
import MatchListScreen from "../screens/MatchListScreen";
import ReservationScreen from "../screens/ReservationScreen";
import { useAuth } from "../hooks/useAuth";
import LogoutIconButton from "../components/LogoutIconButton";

export type RootStackParamList = {
  Auth: undefined;
  Matches: undefined;
  Reservation: { match: Match };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { accessToken } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => (accessToken ? <LogoutIconButton /> : null),
        }}
      >
        {accessToken ? (
          <>
            <Stack.Screen name="Matches" component={MatchListScreen} options={{ title: "Matches" }} />
            <Stack.Screen name="Reservation" component={ReservationScreen} options={{ title: "Reserve Spots" }} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
