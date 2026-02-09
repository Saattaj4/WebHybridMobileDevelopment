import { create } from "zustand";
import { ThemeState } from "../types/ThemeState";

export const useThemeStore = create<ThemeState>((set) => ({
    isDark: false,
    toggle: () => set((s) => ({isDark: !s.isDark}))
}))