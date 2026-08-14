import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

const LINKS = [
  { icon: Github, href: "https://github.com/TsuTsu03", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/den-jansen-flores-79b8ba387/",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:floresjansen28@gmail.com", label: "Email" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-steel bg-void/85 backdrop-blur-sm">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="display-wide text-2xl text-white-hot">Den Jansen Flores</p>
            <p className="data-label mt-3">
              Metro Manila, PH · UTC+8 ·{" "}
              <span className="text-sodium">Available</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            {LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="focus-ring pressable border border-steel-bright p-2.5 text-ash transition-colors duration-200 hover:border-signal/50 hover:text-signal"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
              className="focus-ring pressable border border-steel-bright p-2.5 text-ash transition-colors duration-200 hover:border-signal/50 hover:text-signal"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-steel pt-6 font-mono text-[0.6875rem] tracking-[0.08em] text-ash sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Den Jansen Flores</p>
          <p>Senior Full-Stack Developer · Agentic AI Engineer</p>
        </div>
      </div>
    </footer>
  );
}
