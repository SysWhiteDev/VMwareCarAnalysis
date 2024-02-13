import {create} from "zustand";

type ThemeStore = {
    theme: string;
    setTheme: (theme: string) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
    theme: "dark",
    setTheme: (theme: string) => set({theme}),
}));