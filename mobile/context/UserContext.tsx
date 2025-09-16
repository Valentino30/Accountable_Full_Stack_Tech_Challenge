import { createContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { UserContextType } from "../types/user";
import { userQueryKey } from "../queries/userQueries";
import { fetchCurrentUser } from "../api/user";

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { accessToken } = useAuth();

  const { data, isPending, error, refetch } = useQuery({
    queryKey: userQueryKey,
    queryFn: fetchCurrentUser,
    enabled: !!accessToken,
  });

  const value = {
    isPending,
    error: error || null,
    userId: data?.userId || null,
    refetch,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
