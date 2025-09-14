import { useContext } from "react";
import type { AuthContextType } from "../types/auth";
import { AuthContext } from "../context/AuthContext";

/**
 * Custom hook to consume AuthContext
 * Throws error if used outside AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
