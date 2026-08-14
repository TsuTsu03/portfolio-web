import { useCallback, useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const NAV_ITEMS = [
  { id: "about", label: "About", index: "02" },
  { id: "projects", label: "Projects", index: "03" },
  { id: "skills", label: "Skills", index: "04" },
  { id: "contact", label: "Contact", index: "05" },
];

const RESUME_URL =
  "https://drive.google.com/file/d/1QR96kXD6OEgImYHvEuYWJOJhkJY6kzHK/view?usp=sharing";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { persona, togglePersona } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled ? "border-steel bg-void/80 backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
          <button
            onClick={() => scrollToSection("hero")}
            className="focus-ring group flex items-center gap-2.5"
            aria-label="Go to top"
          >
            <span className="grid h-7 w-7 place-items-center border border-steel bg-concrete font-mono text-[0.6rem] font-semibold tracking-tight text-signal transition-colors duration-200 group-hover:border-signal">
              DJF
            </span>
            <span className="display-tight hidden text-sm text-white-hot sm:block">
              Den Jansen Flores
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="focus-ring group flex items-baseline gap-1.5 px-3 py-2 text-sm text-ash transition-colors duration-200 hover:text-white-hot"
              >
                <span className="font-mono text-[0.625rem] text-ash transition-colors duration-200 group-hover:text-signal">
                  {item.index}
                </span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <PersonaSwitch persona={persona} onToggle={togglePersona} />

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring pressable hidden items-center gap-2 border border-signal/45 bg-signal/10 px-3.5 py-2 font-mono text-[0.6875rem] tracking-[0.14em] text-signal uppercase transition-colors duration-200 hover:bg-signal/20 sm:flex"
            >
              <Download className="h-3.5 w-3.5" />
              Resume
            </a>

            <button
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="focus-ring pressable border border-steel-bright bg-concrete p-2 text-bone md:hidden"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile dropdown */}
      <div
        className={`fixed inset-x-0 top-14 z-50 overflow-hidden border-b border-steel bg-void/95 backdrop-blur-xl transition-[max-height,opacity] duration-250 md:hidden ${
          isMobileMenuOpen ? "max-h-80 opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Mobile navigation" className="flex flex-col p-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="focus-ring flex items-baseline gap-3 border-b border-steel/60 px-3 py-3.5 text-left text-sm text-bone transition-colors duration-200 hover:text-signal"
            >
              <span className="font-mono text-[0.625rem] text-ash">{item.index}</span>
              {item.label}
            </button>
          ))}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring pressable mt-3 flex items-center justify-center gap-2 border border-signal/45 bg-signal/10 px-4 py-3 font-mono text-[0.6875rem] tracking-[0.14em] text-signal uppercase"
          >
            <Download className="h-3.5 w-3.5" />
            Download Resume
          </a>
        </nav>
      </div>
    </>
  );
}

function PersonaSwitch({
  persona,
  onToggle,
}: {
  persona: "gotham" | "wayne";
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={persona === "gotham"}
      aria-label={
        persona === "gotham"
          ? "Switch to Wayne, the daylight palette"
          : "Switch to Gotham, the night palette"
      }
      className="focus-ring group flex items-stretch border border-steel-bright bg-concrete font-mono text-[0.5938rem] tracking-[0.16em] uppercase transition-colors duration-200 hover:border-steel-bright"
    >
      <span
        className={`px-2.5 py-2 transition-colors duration-300 ${
          persona === "wayne" ? "bg-signal/15 text-signal" : "text-ash"
        }`}
      >
        Wayne
      </span>
      <span aria-hidden="true" className="w-px bg-steel" />
      <span
        className={`px-2.5 py-2 transition-colors duration-300 ${
          persona === "gotham" ? "bg-signal/15 text-signal" : "text-ash"
        }`}
      >
        Gotham
      </span>
    </button>
  );
}
