import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-black py-16 text-white">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          <div className="text-3xl font-bold tracking-tight text-white">
            Jansen<span className="text-blue-400">.</span>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: "https://github.com/TsuTsu03", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/den-jansen-flores-79b8ba387/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:floresjansen28@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="focus-ring pressable rounded-xl border border-white/10 p-3 text-gray-400 transition-colors duration-200 hover:border-white/25 hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <div className="h-px w-full bg-white/5" />

          <div className="flex w-full flex-col items-center justify-between gap-4 text-sm text-gray-500 sm:flex-row">
            <p>© {currentYear} Den Jansen Flores. All rights reserved.</p>
            <p>Senior Full-Stack Developer · Agentic AI Engineer · Metro Manila, PH</p>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="focus-ring pressable rounded-xl border border-white/10 p-3 text-gray-400 transition-colors duration-200 hover:border-white/25 hover:text-white"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
