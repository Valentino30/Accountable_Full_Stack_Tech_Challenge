import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EventListScreen from "../screens/EventListScreen";
import ReservationScreen from "../screens/ReservationScreen";

export type RootStackParamList = {
  Events: undefined;
  Reservations: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Events" component={EventListScreen} />
      <Stack.Screen name="Reservations" component={ReservationScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
