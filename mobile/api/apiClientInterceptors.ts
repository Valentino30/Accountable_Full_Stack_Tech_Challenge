import AsyncStorage from '@react-native-async-storage/async-storage'
import { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { authTokensQueryKey } from '../queries/authQueries'
import { queryClient } from '../queryClient'
import { apiClient } from './apiClient'
import { refreshToken as refreshAccessToken } from './tokenService'

apiClient.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const tokens = queryClient.getQueryData<{ accessToken: string }>(
      authTokensQueryKey
    )
    if (tokens?.accessToken) {
      config.headers.set('Authorization', `Bearer ${tokens.accessToken}`)
    }
    return config
  }
)

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && originalRequest) {
      if (originalRequest.url?.includes('/auth/refresh-token')) {
        await AsyncStorage.removeItem('access-token')
        await AsyncStorage.removeItem('refresh-token')
        queryClient.invalidateQueries({ queryKey: authTokensQueryKey })
        return Promise.reject(error)
      }

      const tokens = queryClient.getQueryData<{ refreshToken: string }>(
        authTokensQueryKey
      )

      if (tokens?.refreshToken) {
        try {
          const newAccessToken = await refreshAccessToken(
            apiClient,
            tokens.refreshToken
          )

          await AsyncStorage.setItem('access-token', newAccessToken)
          queryClient.setQueryData(authTokensQueryKey, (oldData: any) => ({
            ...oldData,
            accessToken: newAccessToken,
          }))

          originalRequest.headers.set(
            'Authorization',
            `Bearer ${newAccessToken}`
          )
          return apiClient(originalRequest)
        } catch (refreshError) {
          await AsyncStorage.removeItem('access-token')
          await AsyncStorage.removeItem('refresh-token')
          queryClient.invalidateQueries({ queryKey: authTokensQueryKey })
          return Promise.reject(refreshError)
        }
      } else {
        await AsyncStorage.removeItem('access-token')
        await AsyncStorage.removeItem('refresh-token')
        queryClient.invalidateQueries({ queryKey: authTokensQueryKey })
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)
