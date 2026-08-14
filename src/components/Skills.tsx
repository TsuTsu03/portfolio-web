import { useMemo, useRef, useState } from "react";
import { Atom, Bot, Database, Layers, Monitor, type LucideIcon } from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { handleSpotlight } from "../lib/spotlight";
import { SectionHeading } from "./ui/SectionHeading";

type RealCategory = "ai" | "frontend" | "backend" | "state" | "hooks";
type Category = "all" | RealCategory;
type Tier = "Primary" | "Operational" | "Supporting";

interface Skill {
  name: string;
  level: number;
  category: RealCategory;
  proof: string;
}

const skillsData: Skill[] = [
  { name: "Claude API & Agentic Workflows", level: 92, category: "ai", proof: "Tool use, structured output, workflow automation" },
  { name: "OpenAI API", level: 88, category: "ai", proof: "AI feature implementation and prompt orchestration" },
  { name: "Prompt Engineering", level: 90, category: "ai", proof: "Reliable instructions, formats, and evaluation loops" },
  { name: "LangChain", level: 80, category: "ai", proof: "Chains, retrieval flows, and AI app scaffolding" },
  { name: "AI Tool Use & Function Calling", level: 88, category: "ai", proof: "API-driven agent actions and stateful workflows" },
  { name: "RAG / Vector Search", level: 78, category: "ai", proof: "Knowledge-grounded product features" },

  { name: "React", level: 98, category: "frontend", proof: "Interactive product UI and reusable component systems" },
  { name: "TypeScript", level: 95, category: "frontend", proof: "Typed contracts across UI, data, and API surfaces" },
  { name: "Next.js", level: 93, category: "frontend", proof: "Deployable SaaS apps and server/client boundaries" },
  { name: "Tailwind CSS", level: 96, category: "frontend", proof: "Responsive interfaces with consistent spacing and states" },
  { name: "Vite", level: 90, category: "frontend", proof: "Fast React builds and frontend tooling" },

  { name: "Context API", level: 95, category: "state", proof: "Global UI state, themes, and cross-component coordination" },
  { name: "Redux Toolkit", level: 92, category: "state", proof: "Predictable state for larger application surfaces" },
  { name: "Zustand", level: 88, category: "state", proof: "Lean stores for fast product iteration" },
  { name: "React Query", level: 90, category: "state", proof: "Server-state caching, invalidation, and async UX" },

  { name: "useState / useEffect", level: 98, category: "hooks", proof: "Core interaction and lifecycle management" },
  { name: "useCallback / useMemo", level: 95, category: "hooks", proof: "Stable handlers and optimized render paths" },
  { name: "useContext / useReducer", level: 93, category: "hooks", proof: "Complex flows with explicit state transitions" },
  { name: "Custom Hooks", level: 96, category: "hooks", proof: "Reusable logic for observers, debouncing, and UI state" },

  { name: "Node.js / Express", level: 88, category: "backend", proof: "APIs, service logic, integrations, and app backends" },
  { name: "Supabase (RLS + Realtime)", level: 92, category: "backend", proof: "Auth, tenant boundaries, realtime data, and Postgres" },
  { name: "PostgreSQL", level: 87, category: "backend", proof: "Relational data modeling for SaaS workflows" },
  { name: "MongoDB", level: 84, category: "backend", proof: "Document data for flexible app features" },
];

const CATEGORY_INFO: Record<Category, { label: string; icon: LucideIcon }> = {
  all: { label: "All", icon: Layers },
  ai: { label: "AI & Agentic", icon: Bot },
  frontend: { label: "Frontend", icon: Monitor },
  state: { label: "State Mgmt", icon: Layers },
  hooks: { label: "React Hooks", icon: Atom },
  backend: { label: "Backend", icon: Database },
};

/**
 * Reach, expressed as a loadout tier rather than a self-scored percentage.
 * Percentages imply a precision nobody can actually justify.
 */
function tierOf(level: number): Tier {
  if (level >= 90) return "Primary";
  if (level >= 80) return "Operational";
  return "Supporting";
}

const TIER_STYLE: Record<Tier, string> = {
  Primary: "border-signal/55 bg-signal/12 text-signal",
  Operational: "border-steel-bright/70 text-bone",
  Supporting: "border-steel text-ash",
};

const TIER_ORDER: Tier[] = ["Primary", "Operational", "Supporting"];

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersectionObserver(ref, { threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  const filteredSkills = useMemo(() => {
    const pool =
      selectedCategory === "all"
        ? skillsData
        : skillsData.filter((skill) => skill.category === selectedCategory);

    // Heaviest kit first.
    return [...pool].sort((a, b) => b.level - a.level);
  }, [selectedCategory]);

  return (
    <section id="skills" ref={ref} aria-label="Skills and Technologies" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div
          className={`transition-all duration-700 ease-[var(--ease-out)] ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <SectionHeading
            index="04"
            eyebrow="Arsenal"
            title="Skills & Technologies"
            intro="4+ years mastering the full stack, with explicit strength in React state management, custom hooks, backend data boundaries, and agentic AI development."
          />

          <div className="mb-8 flex flex-col gap-4 border-y border-steel py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(CATEGORY_INFO) as Category[]).map((key) => {
                const info = CATEGORY_INFO[key];
                const Icon = info.icon;
                const active = selectedCategory === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    aria-pressed={active}
                    className={`focus-ring pressable flex items-center gap-2 border px-3 py-2 font-mono text-[0.6875rem] tracking-[0.12em] uppercase transition-colors duration-200 ${
                      active
                        ? "border-signal bg-signal/15 text-signal"
                        : "border-steel-bright text-ash hover:border-signal/60 hover:text-bone"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {info.label}
                  </button>
                );
              })}
            </div>

            {/* Tier legend */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="data-label mr-1">Loadout</span>
              {TIER_ORDER.map((tier) => (
                <span
                  key={tier}
                  className={`border px-2 py-1 font-mono text-[0.625rem] tracking-[0.12em] uppercase ${TIER_STYLE[tier]}`}
                >
                  {tier}
                </span>
              ))}
            </div>
          </div>

          <div className="grid border-t border-steel md:grid-cols-2 xl:grid-cols-3">
            {filteredSkills.map((skill, index) => {
              const tier = tierOf(skill.level);
              return (
                <div
                  key={skill.name}
                  onMouseMove={handleSpotlight}
                  className="spotlight-card relative border-r-0 border-b border-steel px-1 py-4 transition-colors duration-200 hover:bg-concrete/70 md:px-4 md:[&:nth-child(2n+1)]:pl-0 xl:border-r xl:last:border-r-0 xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-child(3n+1)]:pl-0"
                  style={{ transitionDelay: visible ? `${Math.min(index * 25, 320)}ms` : "0ms" }}
                >
                  <div className="relative z-[2] mb-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-medium text-white-hot">{skill.name}</span>
                    <span
                      className={`border px-2 py-0.5 font-mono text-[0.5938rem] tracking-[0.14em] uppercase ${TIER_STYLE[tier]}`}
                    >
                      {tier}
                    </span>
                  </div>
                  <p className="relative z-[2] text-sm leading-relaxed text-ash">{skill.proof}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
