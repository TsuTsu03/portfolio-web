import { useRef, useState, useEffect } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import {
  Atom,
  Database,
  Layers,
  Monitor,
  Bot,
  type LucideIcon
} from "lucide-react";

type RealCategory = "ai" | "frontend" | "backend" | "state" | "hooks";
type Category = "all" | RealCategory;

interface Skill {
  name: string;
  level: number;
  category: RealCategory;
}

type CategoryInfoItem = {
  title: string;
  label: string;
  icon: LucideIcon;
  color: string;
};

const skillsData: Skill[] = [
  // AI & Agentic
  { name: "Claude API & Agentic Workflows", level: 92, category: "ai" },
  { name: "OpenAI API", level: 88, category: "ai" },
  { name: "Prompt Engineering", level: 90, category: "ai" },
  { name: "LangChain", level: 80, category: "ai" },
  { name: "AI Tool Use & Function Calling", level: 88, category: "ai" },
  { name: "RAG / Vector Search", level: 78, category: "ai" },

  // Frontend
  { name: "React", level: 98, category: "frontend" },
  { name: "TypeScript", level: 95, category: "frontend" },
  { name: "Next.js", level: 93, category: "frontend" },
  { name: "Tailwind CSS", level: 96, category: "frontend" },
  { name: "Vite", level: 90, category: "frontend" },

  // State Management
  { name: "Context API", level: 95, category: "state" },
  { name: "Redux Toolkit", level: 92, category: "state" },
  { name: "Zustand", level: 88, category: "state" },
  { name: "React Query", level: 90, category: "state" },

  // React Hooks
  { name: "useState / useEffect", level: 98, category: "hooks" },
  { name: "useCallback / useMemo", level: 95, category: "hooks" },
  { name: "useContext / useReducer", level: 93, category: "hooks" },
  { name: "Custom Hooks", level: 96, category: "hooks" },

  // Backend
  { name: "Node.js / Express", level: 88, category: "backend" },
  { name: "Supabase (RLS + Realtime)", level: 92, category: "backend" },
  { name: "PostgreSQL", level: 87, category: "backend" },
  { name: "MongoDB", level: 84, category: "backend" },
];

const CATEGORY_INFO: Record<Category, CategoryInfoItem> = {
  all: {
    title: "All Skills",
    label: "All",
    icon: Layers,
    color: "from-slate-500 to-slate-400",
  },
  ai: {
    title: "AI & Agentic",
    label: "AI & Agentic",
    icon: Bot,
    color: "from-violet-500 to-purple-500",
  },
  frontend: {
    title: "Frontend",
    label: "Frontend",
    icon: Monitor,
    color: "from-amber-500 to-orange-500",
  },
  state: {
    title: "State Management",
    label: "State Mgmt",
    icon: Layers,
    color: "from-blue-500 to-cyan-500",
  },
  hooks: {
    title: "React Hooks",
    label: "React Hooks",
    icon: Atom,
    color: "from-pink-500 to-rose-500",
  },
  backend: {
    title: "Backend & Database",
    label: "Backend",
    icon: Database,
    color: "from-emerald-500 to-green-500",
  },
};

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersectionObserver(ref, { threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  const filteredSkills =
    selectedCategory === "all"
      ? skillsData
      : skillsData.filter((s) => s.category === selectedCategory);

  return (
    <section
      id="skills"
      ref={ref}
      aria-label="Skills and Technologies"
      className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 py-32"
    >
      <div className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-blue-500 opacity-10 blur-3xl mix-blend-multiply pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        <div className={`transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>

          {/* Heading */}
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Skills & Technologies
            </h2>
            <p className="text-gray-400 text-lg mb-4">
              4+ years mastering the full-stack, with a growing specialization in agentic AI development.
            </p>
            <div className="w-16 h-1 bg-purple-500 rounded-full" />
          </div>

          {/* Category Filter */}
          <div className="mb-12 flex flex-wrap gap-2">
            {(Object.keys(CATEGORY_INFO) as Category[]).map((key) => {
              const info = CATEGORY_INFO[key];
              const Icon = info.icon;
              const active = selectedCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                      : "bg-slate-800 border border-slate-700 text-gray-400 hover:text-white hover:border-slate-500"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {info.label}
                </button>
              );
            })}
          </div>

          {/* Skills grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl">
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
  const cat = CATEGORY_INFO[skill.category];

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setProgress(skill.level), index * 40);
    return () => clearTimeout(t);
  }, [visible, skill.level, index]);

  return (
    <div className="rounded-xl bg-slate-800/80 border border-slate-700/60 p-5 hover:border-slate-600 transition-colors duration-200">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-white">{skill.name}</span>
        <span className="text-sm text-gray-400 tabular-nums">{skill.level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-700">
        <div
          className={`relative h-full rounded-full bg-gradient-to-r ${cat.color} transition-all duration-1000 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
