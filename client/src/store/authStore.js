import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useAuthStore = create(
  persist(
    (set) => ({
      signupEmail: null,
      user: null,
      isAuthenticated: false,
      setUser: (user) => {
        set({
          user,
          isAuthenticated: true,
        });
      },
      clearUser: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
      setEmail: (email) => set({ signupEmail: email }),
      clearEmail: () => set({ signupEmail: null }),
    }),
    { name: "auth-store" },
  ),
);
