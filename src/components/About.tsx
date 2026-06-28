import { useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const HIGHLIGHTS = [
  {
    title: "Fast Delivery",
    description: "Ship production-ready apps quickly without cutting corners — your time to market matters.",
    accent: "text-purple-400",
  },
  {
    title: "Business-Focused",
    description: "Every feature I build ties back to a real business goal — no fluff, just value.",
    accent: "text-yellow-400",
  },
  {
    title: "Agentic AI Native",
    description: "I build AI-powered systems with tool use, multi-step reasoning, and real-world integrations — not just chatbots.",
    accent: "text-blue-400",
  },
  {
    title: "Reliable & Secure",
    description: "Role-based access, secure auth, row-level security in Supabase, and tested code you can trust in production.",
    accent: "text-emerald-400",
  },
  {
    title: "Scalable Architecture",
    description: "Multi-tenant SaaS, clean database schemas, modular code that's easy to maintain and extend as your business grows.",
    accent: "text-pink-400",
  },
  {
    title: "Clear Communication",
    description: "I keep you in the loop at every stage — clear milestones, honest timelines, no surprises.",
    accent: "text-indigo-400",
  },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <section
      id="about"
      ref={ref}
      aria-label="About Den Jansen Flores"
      className="py-32 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Section heading */}
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              About Me
            </h2>
            <div className="w-16 h-1 bg-purple-500 rounded-full" />
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">

            {/* Left: Narrative bio */}
            <div className="lg:col-span-3 space-y-6">
              <p className="text-xl text-gray-300 leading-relaxed">
                I'm a <strong className="text-white font-semibold">Senior Full-Stack Developer</strong> and{" "}
                <strong className="text-white font-semibold">Agentic AI Engineer</strong> based in Metro Manila, Philippines.
                I turn complex business problems into polished, production-grade digital products.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Over the past 4+ years, I've built and shipped SaaS platforms for{" "}
                <span className="text-white">healthcare clinics</span>,{" "}
                <span className="text-white">logistics operators</span>,{" "}
                <span className="text-white">e-commerce brands</span>, and{" "}
                <span className="text-white">HR teams</span> — each one tailored to the client's
                workflow, secured at the database level, and designed to scale.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Beyond traditional full-stack work, I specialize in building{" "}
                <span className="text-white">agentic AI systems</span> — applications that use
                LLMs like Claude and GPT-4 to reason, use tools, call APIs, and automate
                multi-step workflows with minimal human intervention.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                If you're a business owner, startup founder, or hiring manager looking for
                someone who understands both the engineering depth{" "}
                <em>and</em> the business impact of great software — let's talk.
              </p>

              {/* Quick facts */}
              <dl className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { label: "Experience", value: "4+ years" },
                  { label: "Projects shipped", value: "10+" },
                  { label: "Stack depth", value: "Full-stack" },
                  { label: "Location", value: "Metro Manila, PH" },
                ].map(({ label, value }) => (
                  <div key={label} className="border-l-2 border-purple-500/40 pl-4">
                    <dt className="text-sm text-gray-500 mb-0.5">{label}</dt>
                    <dd className="text-white font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Right: Highlights */}
            <div className="lg:col-span-2 space-y-4">
              {HIGHLIGHTS.map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/60 hover:border-slate-600 transition-colors duration-200"
                >
                  <h3 className={`text-base font-semibold mb-1 ${item.accent}`}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
