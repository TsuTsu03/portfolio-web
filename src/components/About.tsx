import { useRef } from "react";
import { CheckCircle2, Clock3, Cpu, Database, Handshake, ShieldCheck } from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { handleSpotlight } from "../lib/spotlight";
import { SectionHeading } from "./ui/SectionHeading";

const HIGHLIGHTS = [
  {
    title: "Fast Delivery",
    description: "Ship production-ready apps quickly while keeping architecture, UX, and security intact.",
    icon: Clock3,
  },
  {
    title: "Business-Focused",
    description: "Every feature maps to an operational goal: revenue, speed, visibility, automation, or trust.",
    icon: Handshake,
  },
  {
    title: "Agentic AI Native",
    description: "Tool use, RAG, structured outputs, workflow state, and API integrations, not just chatbot wrappers.",
    icon: Cpu,
  },
  {
    title: "Reliable & Secure",
    description: "Role-based access, tenant boundaries, Supabase RLS, validation, and production-minded defaults.",
    icon: ShieldCheck,
  },
  {
    title: "Scalable Architecture",
    description: "Clean schemas, modular code, reusable components, and systems designed to grow with the business.",
    icon: Database,
  },
  {
    title: "Clear Communication",
    description: "Direct updates, honest tradeoffs, practical timelines, and scope control from day one.",
    icon: CheckCircle2,
  },
];

const DOSSIER = [
  { label: "Role", value: "Senior Full-Stack Developer" },
  { label: "Also", value: "Agentic AI Engineer" },
  { label: "Base", value: "Metro Manila, PH" },
  { label: "Years active", value: "4+" },
  { label: "Specialization", value: "Production SaaS · Agentic systems" },
  { label: "Stack depth", value: "Frontend to database" },
  { label: "Status", value: "Available", accent: true },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <section id="about" ref={ref} aria-label="About Den Jansen Flores" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div
          className={`transition-all duration-700 ease-[var(--ease-out)] ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <SectionHeading index="02" eyebrow="Operator File" title="About Me" />

          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="space-y-6 lg:col-span-3">
              <p className="text-xl leading-relaxed text-bone">
                I'm a <strong className="font-semibold text-white-hot">Senior Full-Stack Developer</strong>{" "}
                and <strong className="font-semibold text-white-hot">Agentic AI Engineer</strong> based in
                Metro Manila, Philippines. I turn complex business workflows into polished,
                production-grade digital products.
              </p>
              <p className="text-lg leading-relaxed text-ash">
                Over the past 4+ years, I've built and shipped SaaS platforms for{" "}
                <span className="text-bone">healthcare clinics</span>,{" "}
                <span className="text-bone">dental teams</span>,{" "}
                <span className="text-bone">logistics operators</span>,{" "}
                <span className="text-bone">e-commerce brands</span>, and{" "}
                <span className="text-bone">HR teams</span>. The common thread: real operational tools
                with auth, dashboards, database rules, responsive UI, and launch-ready workflows.
              </p>
              <p className="text-lg leading-relaxed text-ash">
                Beyond traditional full-stack work, I specialize in building{" "}
                <span className="text-bone">agentic AI systems</span> that use LLMs like Claude and GPT
                to reason, call tools, produce structured output, and automate multi-step workflows
                with practical guardrails.
              </p>
              <p className="text-lg leading-relaxed text-ash">
                If you're a business owner, startup founder, recruiter, or hiring manager looking for
                someone who understands both engineering depth <em>and</em> business impact, this
                portfolio is built to show the work, not just claim it.
              </p>

              {/* Operator file card */}
              <div className="panel chamfer rim-top mt-10">
                <div className="flex items-center justify-between border-b border-steel px-5 py-3">
                  <p className="data-label">Operator file</p>
                  <p className="font-mono text-[0.625rem] tracking-[0.16em] text-ash">
                    DJF-01
                  </p>
                </div>
                <dl className="px-5 py-2">
                  {DOSSIER.map(({ label, value, accent }) => (
                    <div
                      key={label}
                      className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-steel/50 py-3 last:border-b-0"
                    >
                      <dt className="data-label w-40 shrink-0">{label}</dt>
                      <dd
                        className={`data-value ${accent ? "text-sodium" : ""}`}
                      >
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Equipment specs */}
            <div className="lg:col-span-2">
              <p className="data-label mb-4">Operating principles</p>
              <div className="border-t border-steel">
                {HIGHLIGHTS.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      onMouseMove={handleSpotlight}
                      className="spotlight-card group relative border-b border-steel px-1 py-5 transition-colors duration-200 hover:bg-concrete/70"
                      style={{ transitionDelay: isVisible ? `${index * 35}ms` : "0ms" }}
                    >
                      <div className="relative z-[2] mb-2 flex items-center gap-3">
                        <Icon className="h-4 w-4 shrink-0 text-signal" />
                        <h3 className="display-tight text-base text-white-hot">{item.title}</h3>
                      </div>
                      <p className="relative z-[2] pl-7 text-sm leading-relaxed text-ash">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
