import { useCallback, useState } from "react";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const RESUME_URL =
  "https://drive.google.com/file/d/1QR96kXD6OEgImYHvEuYWJOJhkJY6kzHK/view?usp=sharing";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      {/* Brand mark, top-left */}
      <button
        onClick={() => scrollToSection("hero")}
        className="focus-ring fixed left-5 top-5 z-50 text-xl font-bold tracking-tight text-white transition-colors duration-200 hover:text-blue-300"
        aria-label="Go to top"
      >
        Jansen<span className="text-blue-400">.</span>
      </button>

      {/* Desktop floating pill nav */}
      <header className="fixed left-1/2 top-5 z-50 hidden -translate-x-1/2 md:block">
        <nav
          className="nav-pill flex items-center gap-1 rounded-full px-2 py-2 backdrop-blur-xl"
          aria-label="Primary navigation"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="focus-ring rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-white/[0.07] hover:text-white"
            >
              {item.label}
            </button>
          ))}
          <div className="mx-1 h-5 w-px bg-white/10" />
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring pressable flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-500"
          >
            <Download className="h-3.5 w-3.5" />
            Resume
          </a>
          <button
            onClick={toggleTheme}
            className="focus-ring rounded-full p-2 text-slate-300 transition-colors duration-200 hover:bg-white/[0.07] hover:text-white"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-amber-300" />}
          </button>
        </nav>
      </header>

      {/* Mobile controls */}
      <div className="fixed right-4 top-4 z-[60] flex items-center gap-2 md:hidden">
        <button
          onClick={toggleTheme}
          className="nav-pill focus-ring pressable rounded-full p-2.5 backdrop-blur-xl"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon className="h-4 w-4 text-blue-300" /> : <Sun className="h-4 w-4 text-amber-300" />}
        </button>
        <button
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="nav-pill focus-ring pressable rounded-full p-2.5 backdrop-blur-xl"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`fixed right-4 top-[68px] z-[60] w-[min(20rem,calc(100vw-2rem))] overflow-hidden transition-[max-height,opacity,transform] duration-200 md:hidden ${
          isMobileMenuOpen ? "max-h-96 translate-y-0 opacity-100" : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
        }`}
      >
        <nav
          aria-label="Mobile navigation"
          className="nav-pill flex flex-col gap-1 rounded-2xl p-4 backdrop-blur-xl"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="focus-ring pressable rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-white/[0.07] hover:text-white"
            >
              {item.label}
            </button>
          ))}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring pressable mt-2 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-500"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </nav>
      </div>
    </>
  );
}
