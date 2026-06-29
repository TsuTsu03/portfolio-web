import { useRef } from "react";
import { CheckCircle2, Clock3, Cpu, Database, Handshake, ShieldCheck } from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { handleSpotlight } from "../lib/spotlight";

const HIGHLIGHTS = [
  {
    title: "Fast Delivery",
    description: "Ship production-ready apps quickly while keeping architecture, UX, and security intact.",
    icon: Clock3,
    accent: "text-blue-300",
  },
  {
    title: "Business-Focused",
    description: "Every feature maps to an operational goal: revenue, speed, visibility, automation, or trust.",
    icon: Handshake,
    accent: "text-slate-200",
  },
  {
    title: "Agentic AI Native",
    description: "Tool use, RAG, structured outputs, workflow state, and API integrations, not just chatbot wrappers.",
    icon: Cpu,
    accent: "text-blue-300",
  },
  {
    title: "Reliable & Secure",
    description: "Role-based access, tenant boundaries, Supabase RLS, validation, and production-minded defaults.",
    icon: ShieldCheck,
    accent: "text-slate-200",
  },
  {
    title: "Scalable Architecture",
    description: "Clean schemas, modular code, reusable components, and systems designed to grow with the business.",
    icon: Database,
    accent: "text-blue-300",
  },
  {
    title: "Clear Communication",
    description: "Direct updates, honest tradeoffs, practical timelines, and scope control from day one.",
    icon: CheckCircle2,
    accent: "text-slate-200",
  },
];

const QUICK_FACTS = [
  { label: "Experience", value: "4+ years" },
  { label: "Systems shipped", value: "7+" },
  { label: "Stack depth", value: "Frontend to database" },
  { label: "Location", value: "Metro Manila, PH" },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <section
      id="about"
      ref={ref}
      aria-label="About Den Jansen Flores"
      className="relative overflow-hidden py-32"
    >
      <div className="container relative z-10 mx-auto px-4">
        <div className={`transition-all duration-700 ease-[var(--ease-out)] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className="mb-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-blue-400">About</p>
            <h2 className="mb-4 text-5xl font-bold tracking-tight text-white md:text-6xl">About Me</h2>
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-sky-300" />
          </div>

          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-3">
              <p className="text-xl leading-relaxed text-gray-300">
                I'm a <strong className="font-semibold text-white">Senior Full-Stack Developer</strong> and{" "}
                <strong className="font-semibold text-white">Agentic AI Engineer</strong> based in Metro Manila,
                Philippines. I turn complex business workflows into polished, production-grade digital products.
              </p>
              <p className="text-lg leading-relaxed text-gray-400">
                Over the past 4+ years, I've built and shipped SaaS platforms for{" "}
                <span className="text-white">healthcare clinics</span>, <span className="text-white">dental teams</span>,{" "}
                <span className="text-white">logistics operators</span>, <span className="text-white">e-commerce brands</span>, and{" "}
                <span className="text-white">HR teams</span>. The common thread: real operational tools with auth,
                dashboards, database rules, responsive UI, and launch-ready workflows.
              </p>
              <p className="text-lg leading-relaxed text-gray-400">
                Beyond traditional full-stack work, I specialize in building{" "}
                <span className="text-white">agentic AI systems</span> that use LLMs like Claude and GPT to reason,
                call tools, produce structured output, and automate multi-step workflows with practical guardrails.
              </p>
              <p className="text-lg leading-relaxed text-gray-400">
                If you're a business owner, startup founder, recruiter, or hiring manager looking for someone who
                understands both engineering depth <em>and</em> business impact, this portfolio is built to show the work,
                not just claim it.
              </p>

              <dl className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
                {QUICK_FACTS.map(({ label, value }) => (
                  <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <dt className="mb-1 text-sm text-gray-500">{label}</dt>
                    <dd className="font-semibold text-white">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-4 lg:col-span-2">
              {HIGHLIGHTS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    onMouseMove={handleSpotlight}
                    className="spotlight-card group rounded-xl border border-slate-700/60 bg-slate-800/80 p-5 shadow-lg shadow-black/10 transition-all duration-200 hover:-translate-y-1 hover:border-slate-500/80 hover:bg-slate-800"
                    style={{ transitionDelay: isVisible ? `${index * 35}ms` : "0ms" }}
                  >
                    <div className="relative z-[2] mb-3 flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-white transition-transform duration-200 group-hover:scale-105">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className={`text-base font-semibold ${item.accent}`}>{item.title}</h3>
                    </div>
                    <p className="relative z-[2] text-sm leading-relaxed text-gray-400">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
