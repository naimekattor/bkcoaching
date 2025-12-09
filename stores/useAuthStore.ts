// stores/useAuthStore.ts
import { apiClient } from "@/lib/apiClient";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type NestedUser = {
  email?: string;
  [key: string]: unknown;
};

type User = {
  id?: string;
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  // add other fields from your backend
  brand_profile?: Record<string, unknown>;
  influencer_profile?: Record<string, unknown>;
  user?: NestedUser;
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
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools((set,get) => ({
    token:
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null,
    refreshToken:
      typeof window !== "undefined"
        ? localStorage.getItem("refresh_token")
        : null,
    user: typeof window !== "undefined" && localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
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

    setUser: (user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
      set({ user });
    },

    logout: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      set({ token: null, refreshToken: null, user: null });

    },

    fetchUser: async () => {
      const token = get().token;
      if (!token) return;

      set({ loading: true });
      try {
        const res = await apiClient("user_service/get_user_info/", { auth: true });
        if (res?.data) {
          set({ user: res.data });
          localStorage.setItem("user", JSON.stringify(res.data));
        } else {
          get().logout(); 
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
        get().logout();
      } finally {
        set({ loading: false });
      }
    },
  }))
);
