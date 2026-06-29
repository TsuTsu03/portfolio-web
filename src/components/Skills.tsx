import { useEffect, useMemo, useRef, useState } from "react";
import { Atom, Bot, Database, Layers, Monitor, type LucideIcon } from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { handleSpotlight } from "../lib/spotlight";

type RealCategory = "ai" | "frontend" | "backend" | "state" | "hooks";
type Category = "all" | RealCategory;

interface Skill {
  name: string;
  level: number;
  category: RealCategory;
  proof: string;
}

type CategoryInfoItem = {
  title: string;
  label: string;
  icon: LucideIcon;
  color: string;
};

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

const CATEGORY_INFO: Record<Category, CategoryInfoItem> = {
  all: { title: "All Skills", label: "All", icon: Layers, color: "from-slate-300 to-slate-400" },
  ai: { title: "AI & Agentic", label: "AI & Agentic", icon: Bot, color: "from-blue-500 to-sky-300" },
  frontend: { title: "Frontend", label: "Frontend", icon: Monitor, color: "from-sky-500 to-blue-300" },
  state: { title: "State Management", label: "State Mgmt", icon: Layers, color: "from-blue-400 to-cyan-300" },
  hooks: { title: "React Hooks", label: "React Hooks", icon: Atom, color: "from-indigo-400 to-blue-300" },
  backend: { title: "Backend & Database", label: "Backend", icon: Database, color: "from-blue-600 to-sky-400" },
};

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersectionObserver(ref, { threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  const filteredSkills = useMemo(
    () => (selectedCategory === "all" ? skillsData : skillsData.filter((skill) => skill.category === selectedCategory)),
    [selectedCategory]
  );

  return (
    <section
      id="skills"
      ref={ref}
      aria-label="Skills and Technologies"
      className="relative overflow-hidden py-32"
    >
      <div className="container relative z-10 mx-auto px-4">
        <div className={`transition-all duration-700 ease-[var(--ease-out)] ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className="mb-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-blue-400">Capabilities</p>
            <h2 className="mb-4 text-5xl font-bold tracking-tight text-white md:text-6xl">Skills & Technologies</h2>
            <p className="mb-4 max-w-[72ch] text-lg leading-relaxed text-gray-400">
              4+ years mastering the full stack, with explicit strength in React state management,
              custom hooks, backend data boundaries, and agentic AI development.
            </p>
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-sky-300" />
          </div>

          <div className="mb-12 flex flex-wrap gap-2">
            {(Object.keys(CATEGORY_INFO) as Category[]).map((key) => {
              const info = CATEGORY_INFO[key];
              const Icon = info.icon;
              const active = selectedCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`pressable focus-ring flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                    active
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "border border-slate-700 bg-slate-800 text-gray-400 hover:border-slate-500 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {info.label}
                </button>
              );
            })}
          </div>

          <div className="grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} visible={visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill, index, visible }: { skill: Skill; index: number; visible: boolean }) {
  const [progress, setProgress] = useState(0);
  const category = CATEGORY_INFO[skill.category];

  useEffect(() => {
    if (!visible) {
      setProgress(0);
      return;
    }
    const timeout = setTimeout(() => setProgress(skill.level), index * 45);
    return () => clearTimeout(timeout);
  }, [index, skill.level, visible]);

  return (
    <div
      onMouseMove={handleSpotlight}
      className="spotlight-card rounded-xl border border-slate-700/60 bg-slate-800/80 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-slate-500/80 hover:bg-slate-800"
    >
      <div className="relative z-[2] mb-3 flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-white">{skill.name}</span>
        <span className="tabular-nums text-sm text-gray-400">{skill.level}%</span>
      </div>
      <div className="relative z-[2] mb-3 h-1.5 overflow-hidden rounded-full bg-slate-700">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${category.color} transition-[width] duration-1000 ease-[var(--ease-out)]`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="relative z-[2] text-sm leading-relaxed text-gray-500">{skill.proof}</p>
    </div>
  );
}
