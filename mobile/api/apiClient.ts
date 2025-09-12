import axios from "axios";
import Constants from "expo-constants";

if (!Constants.expoConfig?.extra?.apiUrl) {
  throw new Error(
    '❌ API URL is not defined in Expo config. Please set "extra.apiUrl" in app.json or via app.config.js'
  );
}

const apiClient = axios.create({
  baseURL: Constants.expoConfig.extra.apiUrl,
  timeout: 5000,
});

export default apiClient;
