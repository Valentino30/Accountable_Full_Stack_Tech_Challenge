import apiClient from "./apiClient";
import type { LoginParams, LoginResponse, RegisterParams, RegisterResponse, RefreshTokenResponse } from "../types/auth";

export const loginUser = async ({ email, password }: LoginParams): Promise<string> => {
  const res = await apiClient.post<LoginResponse>("/auth/login", { email, password });
  return res.data.token;
};

export const registerUser = async ({ email, password }: RegisterParams): Promise<string> => {
  const res = await apiClient.post<RegisterResponse>("/auth/register", { email, password });
  return res.data.token;
};

export const refreshToken = async (): Promise<string> => {
  const res = await apiClient.post<RefreshTokenResponse>("/auth/refresh-token");
  return res.data.token;
};
