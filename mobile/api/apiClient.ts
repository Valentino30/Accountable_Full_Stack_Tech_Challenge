import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

/**
 * Ensure API URL exists in Expo config.
 * Prevent runtime errors if missing.
 */
const apiUrl = Constants.expoConfig?.extra?.apiUrl;
if (!apiUrl) {
  throw new Error('❌ API URL is not defined in Expo config. Please set "extra.apiUrl" in app.json or app.config.js');
}

/**
 * Create a central Axios instance for all API calls.
 * Contains base URL, timeout, and interceptors.
 */
const apiClient = axios.create({
  baseURL: apiUrl,
  timeout: 5000, // 5 seconds timeout
});

/**
 * Request interceptor
 * Runs before every request.
 * - Reads auth token from AsyncStorage.
 * - Injects token into headers if it exists.
 */
apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("auth-token");

  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

/**
 * Response interceptor
 * Runs after every response or error.
 * - Logs errors globally for easier debugging.
 * - Could handle specific status codes (401, 429) here if desired.
 */
apiClient.interceptors.response.use(
  (response) => response, // successful response, return as-is
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error); // propagate error to caller
  }
);

export default apiClient;
