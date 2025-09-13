import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import AuthScreen from "../screens/AuthScreen";
import EventListScreen from "../screens/EventListScreen/EventListScreen";
import LogoutButton from "../components/LogoutButton";

export type RootStackParamList = {
  Auth: undefined;
  Events: undefined;
  Reservations: undefined;
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
          <Stack.Screen name="Events" component={EventListScreen} options={{ title: "Events" }} />
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
