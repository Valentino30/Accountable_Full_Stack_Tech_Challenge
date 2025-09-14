import apiClient from "./apiClient";
import type { LoginParams, LoginResponse, RegisterParams, RegisterResponse, RefreshTokenResponse } from "../types/auth";

export const loginUser = async ({
  email,
  password,
}: LoginParams): Promise<{ accessToken: string; refreshToken: string }> => {
  const res = await apiClient.post<LoginResponse>("/auth/login", { email, password });
  return {
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  };
};

export const registerUser = async ({
  email,
  password,
}: RegisterParams): Promise<{ accessToken: string; refreshToken: string }> => {
  const res = await apiClient.post<RegisterResponse>("/auth/register", { email, password });
  return {
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  };
};

export const refreshToken = async (refreshTokenValue: string): Promise<string> => {
  const res = await apiClient.post<RefreshTokenResponse>("/auth/refresh-token", {
    token: refreshTokenValue,
  });
  return res.data.accessToken;
};
