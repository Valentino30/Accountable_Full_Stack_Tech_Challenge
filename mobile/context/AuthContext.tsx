import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, registerUser } from "../api/auth";
import { fetchCurrentUser } from "../api/user";
import type { AuthContextType } from "../types/auth";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false); // track hydration

  // Hydrate token & userId from storage
  useEffect(() => {
    const hydrateAuth = async () => {
      const storedToken = await AsyncStorage.getItem("auth-token");
      const storedUserId = await AsyncStorage.getItem("user-id");

      if (storedToken) setToken(storedToken);
      if (storedUserId) setUserId(storedUserId);
      queryClient.setQueryData(["auth-token"], storedToken);
      queryClient.setQueryData(["user-id"], storedUserId);

      // If token exists but no userId, fetch from backend
      if (storedToken && !storedUserId) {
        try {
          const { userId: fetchedId } = await fetchCurrentUser();
          setUserId(fetchedId);
          await AsyncStorage.setItem("user-id", fetchedId);
          queryClient.setQueryData(["user-id"], fetchedId);
        } catch (err) {
          console.error("Failed to fetch userId during hydration:", err);
        }
      }

      setHydrated(true);
    };
    hydrateAuth();
  }, [queryClient]);

  const handleAuthSuccess = async (newToken: string) => {
    setToken(newToken);
    await AsyncStorage.setItem("auth-token", newToken);
    queryClient.setQueryData(["auth-token"], newToken);

    const { userId: newUserId } = await fetchCurrentUser();
    setUserId(newUserId);
    await AsyncStorage.setItem("user-id", newUserId);
    queryClient.setQueryData(["user-id"], newUserId);
  };

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const newToken = await loginUser({ email, password });
      await handleAuthSuccess(newToken);
      return newToken;
    },
  });

  const registerMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const newToken = await registerUser({ email, password });
      await handleAuthSuccess(newToken);
      return newToken;
    },
  });

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  const register = async (email: string, password: string) => {
    await registerMutation.mutateAsync({ email, password });
  };

  const logout = async () => {
    await AsyncStorage.removeItem("auth-token");
    await AsyncStorage.removeItem("user-id");
    setToken(null);
    setUserId(null);
    queryClient.removeQueries({ queryKey: ["auth-token"] });
    queryClient.removeQueries({ queryKey: ["user-id"] });
  };

  // Only render children after hydration to prevent null userId flashes
  if (!hydrated) return null; // or a spinner/loading component

  return (
    <AuthContext.Provider
      value={{
        token,
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
