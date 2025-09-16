import { ReactNode, createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQuery } from '@tanstack/react-query'
import { loginUser, registerUser } from '../api/auth'
import { authTokensQueryKey } from '../queries/authQueries'
import { queryClient } from '../queryClient'
import type { AuthContextType } from '../types/auth'
import { getTokens } from '../utils/auth'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data, isPending } = useQuery({
    queryKey: authTokensQueryKey,
    queryFn: getTokens,
  })

  const handleAuthSuccess = async (tokens: {
    accessToken: string
    refreshToken: string
  }) => {
    await AsyncStorage.setItem('access-token', tokens.accessToken)
    await AsyncStorage.setItem('refresh-token', tokens.refreshToken)

    queryClient.setQueryData(authTokensQueryKey, {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    })
  }

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: handleAuthSuccess,
  })

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: handleAuthSuccess,
  })

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password })
  }

  const register = async (email: string, password: string) => {
    await registerMutation.mutateAsync({ email, password })
  }

  const logout = async () => {
    await AsyncStorage.removeItem('access-token')
    await AsyncStorage.removeItem('refresh-token')
    queryClient.invalidateQueries({ queryKey: authTokensQueryKey })
  }

  const value = {
    login,
    logout,
    register,
    accessToken: data?.accessToken || null,
    refreshToken: data?.refreshToken || null,
    error: loginMutation.error || registerMutation.error,
    isPending: loginMutation.isPending || registerMutation.isPending,
  }

  if (isPending) {
    return null
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
