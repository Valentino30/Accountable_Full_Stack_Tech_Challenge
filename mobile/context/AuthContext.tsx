import { createContext, useState, ReactNode } from "react";
import apiClient from "../api/apiClient";

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const res = await apiClient.post("/users/login", { email, password });
    setToken(res.data.token);
  };

  const logout = () => setToken(null);

  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
};
