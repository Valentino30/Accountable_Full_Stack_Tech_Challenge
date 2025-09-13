export interface LoginResponse {
  token: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
}

export interface RegisterParams {
  email: string;
  password: string;
}

export interface RefreshTokenResponse {
  token: string;
}

export interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isPending: boolean;
  error: unknown;
}
