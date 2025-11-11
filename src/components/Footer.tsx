import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-16 bg-gradient-to-b from-slate-900 to-black text-white overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <div className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Jansen<span className="text-white">.</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </a>
            <a
              href="mailto:john@example.com"
              className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-110"
              aria-label="Email"
            >
              <Mail className="w-6 h-6 text-gray-400 group-hover:text-pink-400 transition-colors" />
            </a>
          </div>

          {/* Tagline */}
          <div className="flex items-center gap-2 text-gray-400">
            <span>Crafted with</span>
            <Heart className="w-5 h-5 text-red-500 fill-current animate-pulse" />
            <span>using React, TypeScript & Tailwind CSS</span>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400 mb-2">
              © {currentYear} Den Jansen Flores. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Full Stack React Developer | 4+ Years Experience
            </p>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="group p-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all hover:scale-110 shadow-lg shadow-purple-500/50"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6 text-white group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
