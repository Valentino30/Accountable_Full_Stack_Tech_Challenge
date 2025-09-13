import apiClient from "./apiClient";

export const fetchCurrentUser = async (): Promise<{ userId: string }> => {
  const res = await apiClient.get<{ userId: string }>("/users/me");
  return res.data;
};
