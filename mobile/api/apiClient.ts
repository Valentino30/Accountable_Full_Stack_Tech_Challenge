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
  const accessToken = await AsyncStorage.getItem("access-token");

  if (accessToken && config.headers) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

/**
 * Response interceptor
 * Runs after every response or error.
 * - Logs errors globally for easier debugging.
 * - Automatically handles token refresh if 401 due to expired access token.
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refresh-token");
        if (!refreshToken) throw new Error("No refresh token available");

        const res = await axios.post(`${apiUrl}/auth/refresh-token`, { token: refreshToken });
        const newAccessToken = res.data.accessToken;

        if (!newAccessToken) throw new Error("Refresh token failed, no access token returned");

        await AsyncStorage.setItem("access-token", newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);

        await AsyncStorage.removeItem("access-token");
        await AsyncStorage.removeItem("refresh-token");
        await AsyncStorage.removeItem("user-id");

        return Promise.reject(refreshError);
      }
    }

    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
