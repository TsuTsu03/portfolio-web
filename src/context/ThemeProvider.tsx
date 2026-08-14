import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ThemeContext, type Persona } from "./theme-context";

const STORAGE_KEY = "portfolio-persona";
const CROSSFADE_MS = 520;

const THEME_COLOR: Record<Persona, string> = {
  gotham: "#050708",
  wayne: "#e7eaec",
};

function readStoredPersona(): Persona {
  if (typeof window === "undefined") return "gotham";

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "gotham" || stored === "wayne") return stored;

  // Night is the house identity. Only an explicit light system preference opts out.
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "wayne" : "gotham";
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [persona, setPersona] = useState<Persona>(readStoredPersona);
  const crossfadeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.persona = persona;
    // Keep Tailwind's class strategy in sync for any `dark:` utilities.
    root.classList.toggle("dark", persona === "gotham");

    window.localStorage.setItem(STORAGE_KEY, persona);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", THEME_COLOR[persona]);
  }, [persona]);

  useEffect(() => () => window.clearTimeout(crossfadeTimer.current), []);

  const togglePersona = useCallback(() => {
    // Slow the colour transition only while the switch is in flight, so it
    // never competes with the faster hover transitions.
    const root = document.documentElement;
    root.classList.add("persona-shifting");
    window.clearTimeout(crossfadeTimer.current);
    crossfadeTimer.current = window.setTimeout(
      () => root.classList.remove("persona-shifting"),
      CROSSFADE_MS
    );

    setPersona((current) => (current === "gotham" ? "wayne" : "gotham"));
  }, []);

  const value = useMemo(
    () => ({ persona, setPersona, togglePersona }),
    [persona, togglePersona]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
