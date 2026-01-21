export interface LoginResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  user: User;
  tokens: Tokens;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  role: string;
}

export interface UserState {
  isLoggedIn: boolean;
  user: User | null;
  tokens: Tokens | null;
  login: (user: User, tokens: Tokens) => void;
  logout: () => void;
  isAdmin: () => boolean;
  setTokens: (tokens: Tokens) => void;
}

export interface RefreshTokenResponse {
  success: true;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  full_name?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: Data;
}
