import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserRole } from "@/types";

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user: User, token: string) => {
        set({ user, token, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      isAdmin: () => {
        return get().user?.role === UserRole.ADMIN;
      },
    }),
    {
      name: "smart-leads-auth",
    }
  )
);
