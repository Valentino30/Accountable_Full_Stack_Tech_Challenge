import AsyncStorage from "@react-native-async-storage/async-storage";

export const getTokens = async () => {
  const accessToken = await AsyncStorage.getItem("access-token");
  const refreshToken = await AsyncStorage.getItem("refresh-token");
  return { accessToken, refreshToken };
};
