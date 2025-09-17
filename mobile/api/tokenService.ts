import { AxiosInstance } from 'axios'
import type { RefreshTokenResponse } from '../types/auth'

export const refreshToken = async (
  apiClient: AxiosInstance,
  refreshTokenValue: string
): Promise<string> => {
  console.log('Token Service: refreshToken function called.')
  console.log(
    `Token Service: Attempting to refresh token with value: ${refreshTokenValue}`
  )

  try {
    const res = await apiClient.post<RefreshTokenResponse>(
      '/auth/refresh-token',
      {
        token: refreshTokenValue,
      }
    )
    console.log('Token Service: Refresh token request successful.')
    return res.data.accessToken
  } catch (error) {
    console.error('Token Service: Refresh token request failed. Error:', error)
    throw error
  }
}
