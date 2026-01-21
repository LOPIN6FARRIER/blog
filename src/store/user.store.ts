import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Tokens, User, UserState } from "../types/User/user.types";
import { logout as apiLogout } from "../services/auth";
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      tokens: null,
      login: (user: User, tokens: Tokens) =>
        set(() => ({ isLoggedIn: true, user, tokens })),
      setTokens: (tokens: Tokens) => set(() => ({ tokens })),
      logout: async () => {
        try {
          const state = useUserStore.getState();
          const refreshToken = state.tokens?.refreshToken;
          const accessToken = state.tokens?.accessToken;
          if (refreshToken || accessToken) {
            await apiLogout(refreshToken, accessToken).catch((err) =>
              console.error("Logout request failed:", err),
            );
          }
          set(() => ({ isLoggedIn: false, user: null, tokens: null }));
        } catch (err) {
          console.error("Logout process failed:", err);
        }
      },
      isAdmin: (): boolean => {
        const state: UserState = useUserStore.getState();
        return state.user?.role === "admin" || false;
      },
    }),
    { name: "user_v1" },
  ),
);
