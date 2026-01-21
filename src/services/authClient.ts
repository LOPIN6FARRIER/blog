import axios from "axios";
import { useUserStore } from "../store/user.store";
import type { RefreshTokenResponse, Tokens } from "../types/User/user.types";
import { refreshAccessToken, parseJwt } from "./auth";

const REFRESH_MARGIN_MS = 60_000; // refresh 60s before expiry
let refreshTimeoutId: number | undefined;

function normalizeAccessTokenOnly(
  payload: RefreshTokenResponse,
): Tokens | null {
  if (!payload || !payload.data.accessToken) return null;

  // Return the new accessToken and the existing refreshToken from the store
  const currentTokens = useUserStore.getState().tokens;
  return currentTokens?.refreshToken
    ? {
        accessToken: payload.data.accessToken,
        refreshToken: currentTokens.refreshToken,
      }
    : null;
}

import type { AxiosRequestConfig } from "axios";

export async function fetchWithAuth(
  input: string,
  config: AxiosRequestConfig = {},
) {
  const store = useUserStore.getState();
  const tokens = store.tokens;

  if (!config.headers) {
    config.headers = {};
  }

  if (tokens?.accessToken) {
    config.headers["Authorization"] = `Bearer ${tokens.accessToken}`;
  }

  try {
    const response = await axios({ url: input, ...config });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // try to refresh
      const currentTokens = useUserStore.getState().tokens;
      if (!currentTokens?.refreshToken) {
        useUserStore.getState().logout();
        throw new Error("No refresh token available");
      }
      try {
        const payload = await refreshAccessToken(currentTokens.refreshToken);
        const newTokens = normalizeAccessTokenOnly(payload);
        if (!newTokens) throw new Error("Refresh did not return tokens");
        // update tokens in store
        useUserStore.getState().setTokens(newTokens);
        config.headers["Authorization"] = `Bearer ${newTokens.accessToken}`;
        return await axios({ url: input, ...config });
      } catch (err) {
        useUserStore.getState().logout();
        throw err;
      }
    }
    throw error;
  }
}

export function scheduleTokenRefresh() {
  const tokens = useUserStore.getState().tokens;
  if (!tokens?.accessToken || !tokens?.refreshToken) return;

  const payload = parseJwt(tokens.accessToken) as { exp?: number } | null;
  if (!payload?.exp) return;

  const expiresAt = payload.exp * 1000;
  const now = Date.now();
  const msBefore = expiresAt - now - REFRESH_MARGIN_MS;
  const delay = Math.max(msBefore, 5_000);

  if (refreshTimeoutId) window.clearTimeout(refreshTimeoutId);

  refreshTimeoutId = window.setTimeout(async () => {
    try {
      const current = useUserStore.getState().tokens;
      if (!current?.refreshToken) return useUserStore.getState().logout();
      const payload = await refreshAccessToken(current.refreshToken);
      const newTokens = normalizeAccessTokenOnly(payload);
      if (!newTokens) return useUserStore.getState().logout();
      useUserStore.getState().setTokens(newTokens);
      scheduleTokenRefresh();
    } catch (err) {
      console.error("Automatic token refresh failed", err);
      useUserStore.getState().logout();
    }
  }, delay) as unknown as number;
}

export function clearScheduledRefresh() {
  if (refreshTimeoutId) {
    window.clearTimeout(refreshTimeoutId);
    refreshTimeoutId = undefined;
  }
}

export default {
  fetchWithAuth,
  scheduleTokenRefresh,
  clearScheduledRefresh,
};
