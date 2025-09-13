import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, registerUser } from "../api/auth";
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

  useEffect(() => {
    const hydrateToken = async () => {
      const stored = await AsyncStorage.getItem("auth-token");
      if (stored) {
        setToken(stored);
        queryClient.setQueryData(["auth-token"], stored);
      }
    };
    hydrateToken();
  }, [queryClient]);

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const newToken = await loginUser({ email, password });
      await AsyncStorage.setItem("auth-token", newToken);
      setToken(newToken);
      queryClient.setQueryData(["auth-token"], newToken);
      return newToken;
    },
  });

  const registerMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const newToken = await registerUser({ email, password });
      await AsyncStorage.setItem("auth-token", newToken);
      setToken(newToken);
      queryClient.setQueryData(["auth-token"], newToken);
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
    setToken(null);
    queryClient.removeQueries({ queryKey: ["auth-token"] });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
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
