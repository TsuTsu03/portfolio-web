import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, ArrowDown, Bot } from "lucide-react";

const ROLES = [
  "Senior Full-Stack Developer",
  "Agentic AI Engineer",
  "SaaS Architect",
  "Software Solutions Consultant",
];

const TECH_STACK = [
  "React", "Next.js", "TypeScript", "Supabase", "Node.js",
  "PostgreSQL", "Tailwind CSS", "Claude API", "OpenAI",
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, charIndex + 1));
        setCharIndex((i) => i + 1);
      }, 60);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, charIndex - 1));
        setCharIndex((i) => i - 1);
      }, 35);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Atmospheric background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-5xl mx-auto text-center">

          {/* Availability badge */}
          <div className="mb-8 flex items-center justify-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for work
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-sm">
              <Bot className="w-3.5 h-3.5" />
              Agentic AI Developer
            </span>
          </div>

          {/* Name */}
          <h1 className="text-6xl md:text-8xl font-extrabold mb-4 text-white leading-tight tracking-tight">
            Den Jansen
            <span className="block text-purple-400">Flores</span>
          </h1>

          {/* Typewriter role */}
          <div className="h-14 mb-8 flex items-center justify-center">
            <p className="text-2xl md:text-3xl text-gray-300 font-medium">
              {displayText}
              <span className="animate-pulse text-purple-400 ml-0.5">|</span>
            </p>
          </div>

          {/* Value proposition */}
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed" style={{ maxWidth: "65ch" }}>
            I build <span className="text-white font-medium">production-ready SaaS platforms</span> and{" "}
            <span className="text-white font-medium">AI-powered agentic systems</span> that solve real
            business problems — from healthcare and logistics to e-commerce and HR.
            Fast delivery. Clean architecture. Real results.
          </p>

          {/* Tech stack pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-full text-sm text-gray-300 bg-white/5 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all duration-200 hover:scale-105 shadow-lg shadow-purple-600/30"
            >
              View My Work
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 rounded-xl border border-white/20 text-white hover:bg-white/10 font-semibold transition-all duration-200 hover:scale-105"
            >
              Get In Touch
            </button>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-3 mb-16">
            <a
              href="https://github.com/TsuTsu03"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="group p-3 rounded-xl border border-white/15 text-gray-400 hover:text-white hover:border-white/30 transition-all duration-200"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/den-jansen-flores-79b8ba387/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="group p-3 rounded-xl border border-white/15 text-gray-400 hover:text-white hover:border-white/30 transition-all duration-200"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:floresjansen28@gmail.com"
              aria-label="Send email"
              className="group p-3 rounded-xl border border-white/15 text-gray-400 hover:text-white hover:border-white/30 transition-all duration-200"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Scroll indicator */}
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            aria-label="Scroll to about section"
            className="text-gray-500 hover:text-gray-300 transition-colors duration-200 flex flex-col items-center gap-2 mx-auto"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
