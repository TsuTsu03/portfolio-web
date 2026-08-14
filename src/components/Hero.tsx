import { useEffect, useMemo, useState } from "react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const ROLES = [
  "Senior Full-Stack Developer",
  "Agentic AI Engineer",
  "SaaS Architect",
  "Product-Minded Builder",
];

const TECH_STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Supabase",
  "PostgreSQL",
  "Node.js",
  "Tailwind CSS",
  "Claude API",
  "OpenAI",
];

const FIELD_READOUT = [
  { label: "Years active", value: "4+" },
  { label: "Systems shipped", value: "7" },
  { label: "Ownership", value: "Schema → UI" },
];

const SOCIALS = [
  { href: "https://github.com/TsuTsu03", label: "GitHub profile", icon: Github },
  {
    href: "https://www.linkedin.com/in/den-jansen-flores-79b8ba387/",
    label: "LinkedIn profile",
    icon: Linkedin,
  },
  { href: "mailto:floresjansen28@gmail.com", label: "Send email", icon: Mail },
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const currentRole = useMemo(() => ROLES[roleIndex], [roleIndex]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, charIndex + 1));
        setCharIndex((index) => index + 1);
      }, 52);
    } else if (!deleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setDeleting(true), 2100);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, charIndex - 1));
        setCharIndex((index) => index - 1);
      }, 28);
    } else {
      setDeleting(false);
      setRoleIndex((index) => (index + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, currentRole, deleting]);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 pt-28 pb-20 sm:px-6">
        <div className="max-w-5xl">
          <p className="data-label animate-fade-up mb-8 flex flex-wrap items-center gap-3">
            <span className="text-signal">01</span>
            <span aria-hidden="true" className="h-px w-10 bg-steel-bright" />
            <span>Identity</span>
            <span aria-hidden="true" className="h-px w-6 bg-steel" />
            <span className="inline-flex items-center gap-2 text-sodium">
              <span className="animate-status-pulse h-1.5 w-1.5 bg-sodium" />
              Available for work
            </span>
          </p>

          <p className="animate-fade-up delay-100 mb-4 font-mono text-sm tracking-[0.12em] text-ash">
            Hi, my name is
          </p>

          <h1 className="animate-fade-up delay-100 display-wide mb-8 text-[clamp(2.75rem,11vw,7rem)] leading-[0.88] text-white-hot">
            <span className="block">Den Jansen</span>
            <span className="block text-signal">Flores</span>
          </h1>

          <div className="animate-fade-up delay-200 mb-10 flex min-h-9 items-center gap-3 border-l-2 border-signal/60 pl-4">
            <p className="font-mono text-base tracking-[0.04em] text-bone sm:text-lg">
              {displayText}
              <span className="animate-blink ml-0.5 text-signal">_</span>
            </p>
          </div>

          <p className="animate-fade-up delay-300 mb-12 max-w-[62ch] text-lg leading-8 text-ash">
            I build{" "}
            <span className="font-medium text-white-hot">production-ready SaaS platforms</span> and{" "}
            <span className="font-medium text-white-hot">AI-powered agentic systems</span> for
            businesses that need clean architecture, secure workflows, and polished user
            experiences. Real systems, real users, measurable outcomes.
          </p>

          {/* Field readout — the three numbers that matter, stated flatly */}
          <dl className="animate-fade-up delay-400 mb-12 grid max-w-2xl grid-cols-1 border-t border-steel sm:grid-cols-3">
            {FIELD_READOUT.map(({ label, value }) => (
              <div
                key={label}
                className="border-b border-steel px-1 py-4 sm:border-r sm:border-b-0 sm:px-4 sm:first:pl-0 sm:last:border-r-0"
              >
                <dt className="data-label mb-2">{label}</dt>
                <dd className="display-tight text-2xl text-white-hot">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="animate-fade-up delay-500 mb-12 flex flex-wrap gap-2">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="border border-steel px-2.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.06em] text-ash transition-colors duration-200 hover:border-signal/50 hover:text-signal"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="animate-fade-up delay-600 mb-12 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="pressable focus-ring chamfer inline-flex min-h-12 items-center justify-center gap-2.5 bg-signal px-7 py-3.5 font-mono text-xs tracking-[0.16em] text-void uppercase transition-colors duration-200 hover:bg-white-hot"
            >
              View Case Files
              <ArrowDown className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="pressable focus-ring inline-flex min-h-12 items-center justify-center gap-2.5 border border-steel-bright px-7 py-3.5 font-mono text-xs tracking-[0.16em] text-bone uppercase transition-colors duration-200 hover:border-signal hover:text-signal"
            >
              Light the Signal
            </button>

            <div className="flex items-center gap-2 sm:ml-3">
              {SOCIALS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  className="pressable focus-ring border border-steel-bright p-3 text-ash transition-colors duration-200 hover:border-signal/50 hover:text-signal"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            aria-label="Scroll to about section"
            className="focus-ring animate-fade-up delay-700 flex items-center gap-3 text-ash transition-colors duration-200 hover:text-signal"
          >
            <span className="data-label">Descend</span>
            <ArrowDown className="animate-float-y h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
