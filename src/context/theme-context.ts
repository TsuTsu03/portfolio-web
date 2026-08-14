import { createContext } from "react";

/**
 * Two faces of the same operator:
 * `gotham` is the night identity (default), `wayne` the daylight one.
 */
export type Persona = "gotham" | "wayne";

export type ThemeContextType = {
  persona: Persona;
  setPersona: (persona: Persona) => void;
  togglePersona: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
