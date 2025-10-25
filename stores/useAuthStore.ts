// stores/useAuthStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type User = {
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  // add other fields from your backend
};

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  loading: boolean;

  setToken: (token: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  setUser: (u: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    token:
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null,
    refreshToken:
      typeof window !== "undefined"
        ? localStorage.getItem("refresh_token")
        : null,
    user: null,
    loading: false,

    setToken: (token) => {
      if (token) {
        localStorage.setItem("access_token", token);
      } else {
        localStorage.removeItem("access_token");
      }
      set({ token });
    },

    setRefreshToken: (refreshToken) => {
      if (refreshToken) {
        localStorage.setItem("refresh_token", refreshToken);
      } else {
        localStorage.removeItem("refresh_token");
      }
      set({ refreshToken });
    },

    setUser: (user) => set({ user }),

    logout: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      set({ token: null, refreshToken: null, user: null });
    },
  }))
);
