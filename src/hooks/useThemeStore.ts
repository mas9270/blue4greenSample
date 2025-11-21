"use client";
import { create } from "zustand";

type ThemeMode = "light" | "dark" | null;

interface ThemeState {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: null, // مقدار اولیه null برای SSR

  setTheme: (mode) => {
    if (typeof window !== "undefined" && mode) {
      localStorage.setItem("app-theme", mode);
      set({ theme: mode });
    } else {
      set({ theme: mode });
    }
  },

  toggleTheme: () => {
    set((state) => {
      const newTheme: ThemeMode = state.theme === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("app-theme", newTheme);
      }
      return { theme: newTheme };
    });
  },
}));
