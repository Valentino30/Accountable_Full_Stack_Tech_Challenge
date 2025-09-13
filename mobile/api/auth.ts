import apiClient from "./apiClient";
import type { LoginParams, LoginResponse, RegisterParams, RegisterResponse, RefreshTokenResponse } from "../types/auth";

export const loginUser = async ({ email, password }: LoginParams): Promise<string> => {
  const res = await apiClient.post<LoginResponse>("/users/login", { email, password });
  return res.data.token;
};

export const registerUser = async ({ email, password }: RegisterParams): Promise<string> => {
  const res = await apiClient.post<RegisterResponse>("/users/register", { email, password });
  return res.data.token;
};

export const refreshToken = async (): Promise<string> => {
  const res = await apiClient.post<RefreshTokenResponse>("/users/refresh-token");
  return res.data.token;
};
