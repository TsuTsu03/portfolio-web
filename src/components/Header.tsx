import { useState, useEffect, useCallback } from "react";
import { Menu, X, Moon, Sun, Download } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  }, []);

  const navItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="text-xl font-bold text-white hover:text-purple-400 transition-colors duration-200 font-display tracking-tight"
            aria-label="Go to top"
          >
            Jansen<span className="text-purple-400">.</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
            <div className="w-px h-5 bg-white/10 mx-2" />
            <a
              href="https://drive.google.com/file/d/1QR96kXD6OEgImYHvEuYWJOJhkJY6kzHK/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-all duration-200"
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </a>
            <button
              onClick={toggleTheme}
              className="ml-1 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4 text-yellow-400" />
              )}
            </button>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/5 border border-white/10"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-purple-400" />
              ) : (
                <Sun className="w-4 h-4 text-yellow-400" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="md:hidden mt-4 p-4 flex flex-col gap-1 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-xl"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 text-left text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://drive.google.com/file/d/1QR96kXD6OEgImYHvEuYWJOJhkJY6kzHK/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-2 px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
