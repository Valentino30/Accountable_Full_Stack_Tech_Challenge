import type {
  LoginParams,
  LoginResponse,
  RefreshTokenResponse,
  RegisterParams,
  RegisterResponse,
} from '../types/auth'
import apiClient from './apiClient'

export const loginUser = async ({
  email,
  password,
}: LoginParams): Promise<{ accessToken: string; refreshToken: string }> => {
  const res = await apiClient.post<LoginResponse>('/auth/login', {
    email,
    password,
  })
  return {
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  }
}

export const registerUser = async ({
  email,
  password,
}: RegisterParams): Promise<{ accessToken: string; refreshToken: string }> => {
  const res = await apiClient.post<RegisterResponse>('/auth/register', {
    email,
    password,
  })
  return {
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  }
}

export const refreshToken = async (
  refreshTokenValue: string
): Promise<string> => {
  const res = await apiClient.post<RefreshTokenResponse>(
    '/auth/refresh-token',
    {
      token: refreshTokenValue,
    }
  )
  return res.data.accessToken
}
