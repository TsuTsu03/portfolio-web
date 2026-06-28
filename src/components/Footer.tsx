import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 bg-black text-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <div className="text-3xl font-bold text-white tracking-tight">
            Jansen<span className="text-purple-400">.</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/TsuTsu03"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/25 transition-all duration-200"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/den-jansen-flores-79b8ba387/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/25 transition-all duration-200"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:floresjansen28@gmail.com"
              aria-label="Email"
              className="p-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/25 transition-all duration-200"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <div className="w-full h-px bg-white/5" />

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 text-sm text-gray-500">
            <p>© {currentYear} Den Jansen Flores. All rights reserved.</p>
            <p>Senior Full-Stack Developer · Agentic AI Engineer · Metro Manila, PH</p>
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="p-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/25 transition-all duration-200"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
