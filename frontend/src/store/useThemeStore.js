import { Coffee } from "lucide-react";
import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee", // lowercase

  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme.toLowerCase());
    set({ theme: theme.toLowerCase() }); // ✅ trigger re-render
  },
}));
