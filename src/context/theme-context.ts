import { createContext } from "react";

export type Theme = "light" | "dark";
export type ThemeContextType = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void; // ✅ add this
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
