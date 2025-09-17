import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios'
import Constants from 'expo-constants'
import { authTokensQueryKey } from '../queries/authQueries'
import { queryClient } from '../queryClient'
import { refreshToken as refreshAccessToken } from './auth'

// Get the API URL from environment variables and throw an error if it's not found.
const apiUrl: string | undefined = Constants.expoConfig?.extra?.apiUrl
if (!apiUrl) {
  throw new Error('❌ Missing "extra.apiUrl" in app.json or app.config.js')
}

// Create an Axios instance with a base URL and timeout.
const apiClient: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
})

// Add a request interceptor to attach the access token to every outgoing request.
apiClient.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    // Get the current access token from the React Query cache.
    const tokens = queryClient.getQueryData<{ accessToken: string }>(
      authTokensQueryKey
    )
    if (tokens?.accessToken) {
      // Set the 'Authorization' header with the bearer token.
      config.headers.set('Authorization', `Bearer ${tokens.accessToken}`)
    }
    return config
  }
)

// Add a response interceptor to handle token expiration errors.
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config
    // Check if the error is a 401 Unauthorized
    if (error.response?.status === 401 && originalRequest) {
      // If the request is a refreshToken request,
      // Perform a complete logout.
      if (originalRequest.url?.includes('/auth/refresh-token')) {
        await AsyncStorage.removeItem('access-token')
        await AsyncStorage.removeItem('refresh-token')
        queryClient.invalidateQueries({ queryKey: authTokensQueryKey })
        return Promise.reject(error)
      }

      // If the request is any other request,
      // Try to get a new access token using the refresh token.
      const tokens = queryClient.getQueryData<{ refreshToken: string }>(
        authTokensQueryKey
      )

      // If the refreshToken exists
      if (tokens?.refreshToken) {
        try {
          // Get a new access token using the stored refresh token.
          const newAccessToken = await refreshAccessToken(tokens.refreshToken)

          // Update the tokens in both AsyncStorage and the React Query cache.
          await AsyncStorage.setItem('access-token', newAccessToken)
          queryClient.setQueryData(authTokensQueryKey, (oldData: any) => ({
            ...oldData,
            accessToken: newAccessToken,
          }))

          // And then retry the original failed request with the new, valid access token.
          originalRequest.headers.set(
            'Authorization',
            `Bearer ${newAccessToken}`
          )
          return apiClient(originalRequest)
        } catch (refreshError) {
          // If refreshing the token fails,
          // Perform a full logout as the refresh token is likely invalid.
          await AsyncStorage.removeItem('access-token')
          await AsyncStorage.removeItem('refresh-token')
          queryClient.invalidateQueries({ queryKey: authTokensQueryKey })
          return Promise.reject(refreshError)
        }
      }
    }
    // For any other errors, simply reject the promise.
    return Promise.reject(error)
  }
)

export default apiClient
