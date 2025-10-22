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
  user: User | null;
  loading: boolean;

  setToken: (token: string | null) => void;
  setUser: (u: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    token:
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
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

    setUser: (user) => set({ user }),

    logout: () => {
      localStorage.removeItem("access_token");
      set({ token: null, user: null });
    },
  }))
);
