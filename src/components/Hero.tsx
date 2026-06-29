import { useEffect, useMemo, useState } from "react";
import { ArrowDown, Bot, BrainCircuit, CheckCircle2, Github, Linkedin, Mail, Sparkles } from "lucide-react";

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

const PROOF_POINTS = [
  "4+ years building production software",
  "7 shipped SaaS and web platforms",
  "Full-stack ownership from schema to UI",
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
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
    >

      <div className="container relative z-10 mx-auto px-4 py-24">
        <div className="mx-auto max-w-[calc(100vw-2rem)] overflow-hidden text-center sm:max-w-5xl">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3 animate-fade-up">
            <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.8)]" />
              Available for work
            </span>
            <span className="hidden min-h-10 items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-100 sm:inline-flex">
              <Bot className="h-4 w-4" />
              Agentic AI Developer
            </span>
            <span className="hidden min-h-10 items-center gap-2 rounded-full border border-slate-400/15 bg-slate-300/5 px-4 py-2 text-sm font-medium text-slate-300 sm:inline-flex">
              <Sparkles className="h-4 w-4 text-slate-200" />
              Senior product judgment
            </span>
          </div>

          <p className="animate-fade-up delay-100 mb-3 text-lg font-medium text-blue-300 md:text-xl">
            Hi, my name is
          </p>

          <h1 className="animate-fade-up delay-100 mx-auto mb-5 max-w-full text-[clamp(3rem,13vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-white">
            <span>Den</span>
            <span className="block sm:inline"> Jansen</span>
            <span className="block text-silver text-silver-shine">Flores</span>
          </h1>

          <div className="animate-fade-up delay-200 mb-8 flex min-h-14 items-center justify-center">
            <p className="text-2xl font-semibold text-slate-200 md:text-3xl">
              {displayText}
              <span className="ml-0.5 text-blue-400 animate-blink">|</span>
            </p>
          </div>

          <p className="animate-fade-up delay-300 mx-auto mb-8 max-w-[30ch] text-lg leading-8 text-gray-300 sm:max-w-[68ch] md:text-xl">
            I build <span className="font-semibold text-white">production-ready SaaS platforms</span> and{" "}
            <span className="font-semibold text-white">AI-powered agentic systems</span> for businesses that need clean
            architecture, secure workflows, and polished user experiences. Real systems, real users, measurable outcomes.
          </p>

          <div className="animate-fade-up delay-400 mx-auto mb-10 grid max-w-full gap-3 sm:max-w-4xl sm:grid-cols-3">
            {PROOF_POINTS.map((point) => (
              <div key={point} className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 backdrop-blur-md">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-400" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="animate-fade-up delay-500 mx-auto mb-10 flex max-w-[calc(100vw-2rem)] flex-wrap justify-center gap-2 sm:max-w-full">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-slate-300 transition-colors duration-200 hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-white"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="animate-fade-up delay-600 mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="pressable focus-ring inline-flex min-h-12 items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/30 transition-colors duration-200 hover:bg-blue-500"
            >
              View My Work
              <ArrowDown className="h-4 w-4" />
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="pressable focus-ring min-h-12 rounded-xl border border-slate-400/25 px-8 py-4 font-semibold text-slate-100 transition-colors duration-200 hover:border-slate-300/40 hover:bg-white/[0.06]"
            >
              Get In Touch
            </button>
          </div>

          <div className="animate-fade-up delay-700 mb-16 flex items-center justify-center gap-3">
            {[
              { href: "https://github.com/TsuTsu03", label: "GitHub profile", icon: Github },
              { href: "https://www.linkedin.com/in/den-jansen-flores-79b8ba387/", label: "LinkedIn profile", icon: Linkedin },
              { href: "mailto:floresjansen28@gmail.com", label: "Send email", icon: Mail },
            ].map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="pressable focus-ring rounded-xl border border-white/15 bg-white/[0.04] p-3 text-gray-300 transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            aria-label="Scroll to about section"
            className="focus-ring mx-auto flex flex-col items-center gap-2 text-gray-400 transition-colors duration-200 hover:text-gray-200"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.22em]">Scroll</span>
            <ArrowDown className="h-4 w-4 animate-float-y" />
          </button>
        </div>
      </div>

      <BrainCircuit className="absolute bottom-10 right-8 hidden h-16 w-16 text-white/[0.035] md:block" aria-hidden="true" />
    </section>
  );
}
