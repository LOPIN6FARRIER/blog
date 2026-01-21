import axios from "axios";
import type {
  LoginResponse,
  RefreshTokenResponse,
  RegisterData,
  RegisterResponse,
} from "../types/User/user.types";

const API_BASE = import.meta.env.VITE_API ?? "";
const LOGIN_URL = API_BASE ? `${API_BASE}/api/auth/login` : `/api/auth/login`;
const LOGOUT_URL = API_BASE
  ? `${API_BASE}/api/auth/logout`
  : `/api/auth/logout`;
const REFRESH_URL = API_BASE
  ? `${API_BASE}/api/auth/refresh`
  : `/api/auth/refresh`;
const REGISTER_URL = API_BASE
  ? `${API_BASE}/api/auth/register`
  : `/api/auth/register`;

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  try {
    const response = await axios.post(LOGIN_URL, { email, password });
    return response.data;
  } catch (error) {
    const message =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : `Login failed (${axios.isAxiosError(error) ? error.response?.status : "unknown"})`;
    throw new Error(message);
  }
}

export async function logout(
  refreshToken?: string,
  accessToken?: string,
): Promise<void> {
  if (!refreshToken && !accessToken) return;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

  try {
    const response = await axios.post(
      LOGOUT_URL,
      { refreshToken },
      { headers },
    );
    if (!response.status.toString().startsWith("2")) {
      const message =
        response.data?.message ?? `Logout failed (${response.status})`;
      throw new Error(message);
    }
    console.log("Logout successful");
  } catch (error) {
    console.error("Logout service failed:", error);
    throw error;
  }
}

export async function refreshAccessToken(
  refreshToken: string,
): Promise<RefreshTokenResponse> {
  try {
    const response = await axios.post(REFRESH_URL, { refreshToken });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Refresh failed: " + error.message);
    } else {
      throw new Error("Refresh failed: An unknown error occurred");
    }
  }
}

export function parseJwt(token: string) {
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(escape(json)));
  } catch {
    return null;
  }
}

export interface ValidationError {
  field: string;
  message: string;
}

export class RegisterError extends Error {
  validationErrors?: ValidationError[];

  constructor(message: string, validationErrors?: ValidationError[]) {
    super(message);
    this.name = "RegisterError";
    this.validationErrors = validationErrors;
  }
}

export async function register(data: RegisterData): Promise<RegisterResponse> {
  try {
    const response = await axios.post(REGISTER_URL, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const { message, errors } = error.response.data;
      throw new RegisterError(
        message || "Registration failed",
        errors as ValidationError[] | undefined,
      );
    }
    throw new RegisterError("Registration failed");
  }
}
