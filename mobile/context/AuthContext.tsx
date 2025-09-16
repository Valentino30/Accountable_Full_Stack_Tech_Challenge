import { createContext, ReactNode, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, registerUser } from "../api/auth";
import type { AuthContextType } from "../types/auth";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const hydrateAuth = async () => {
      const storedAccess = await AsyncStorage.getItem("access-token");
      const storedRefresh = await AsyncStorage.getItem("refresh-token");
      const storedUserId = await AsyncStorage.getItem("user-id");

      if (storedAccess) setAccessToken(storedAccess);
      if (storedRefresh) setRefreshToken(storedRefresh);
      if (storedUserId) setUserId(storedUserId);

      queryClient.setQueryData(["access-token"], storedAccess);
      queryClient.setQueryData(["refresh-token"], storedRefresh);
      queryClient.setQueryData(["user-id"], storedUserId);

      setHydrated(true);
    };
    hydrateAuth();
  }, [queryClient]);

  const handleAuthSuccess = async (tokens: { accessToken: string; refreshToken: string }) => {
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);

    await AsyncStorage.setItem("access-token", tokens.accessToken);
    await AsyncStorage.setItem("refresh-token", tokens.refreshToken);

    queryClient.setQueryData(["access-token"], tokens.accessToken);
    queryClient.setQueryData(["refresh-token"], tokens.refreshToken);
  };

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const tokens = await loginUser({ email, password });
      await handleAuthSuccess(tokens);
      return tokens;
    },
  });

  const registerMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const tokens = await registerUser({ email, password });
      await handleAuthSuccess(tokens);
      return tokens;
    },
  });

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  const register = async (email: string, password: string) => {
    await registerMutation.mutateAsync({ email, password });
  };

  const logout = async () => {
    await AsyncStorage.removeItem("access-token");
    await AsyncStorage.removeItem("refresh-token");
    await AsyncStorage.removeItem("user-id");

    setAccessToken(null);
    setRefreshToken(null);
    setUserId(null);

    queryClient.removeQueries({ queryKey: ["access-token"] });
    queryClient.removeQueries({ queryKey: ["refresh-token"] });
    queryClient.removeQueries({ queryKey: ["user-id"] });
  };

  if (!hydrated) return null;

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        userId,
        login,
        register,
        logout,
        isPending: loginMutation.isPending || registerMutation.isPending,
        error: loginMutation.error || registerMutation.error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
