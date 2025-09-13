import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import AuthScreen from "../screens/AuthScreen";
import LogoutButton from "../components/LogoutButton";
import { Match } from "../types/match";
import MatchListScreen from "../screens/MatchListScreen";
import ReservationScreen from "../screens/ReservationScreen";

export type RootStackParamList = {
  Auth: undefined;
  Matches: undefined;
  Reservation: { match: Match };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { token } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => (token ? <LogoutButton /> : null),
        }}
      >
        {token ? (
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
