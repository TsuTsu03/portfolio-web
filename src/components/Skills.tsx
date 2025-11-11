import { useRef, useState, useEffect } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import {
  Atom,
  Database,
  Grid,
  Layers,
  Monitor,
  type LucideIcon
} from "lucide-react";

/* ---------- Types ---------- */
type RealCategory = "hooks" | "state" | "frontend" | "backend";
type Category = "all" | RealCategory;

interface Skill {
  name: string;
  level: number; // 0–100
  category: RealCategory;
}

type CategoryInfoItem = {
  title: string; // card title
  label: string; // filter button label
  icon: LucideIcon;
  color: string; // tailwind gradient token (e.g. "from-blue-500 to-cyan-500")
};

/* ---------- Data ---------- */
const skillsData: Skill[] = [
  { name: "useState", level: 98, category: "hooks" },
  { name: "useEffect", level: 98, category: "hooks" },
  { name: "useContext", level: 95, category: "hooks" },
  { name: "useReducer", level: 92, category: "hooks" },
  { name: "useCallback", level: 95, category: "hooks" },
  { name: "useMemo", level: 95, category: "hooks" },
  { name: "useRef", level: 93, category: "hooks" },
  { name: "Custom Hooks", level: 96, category: "hooks" },
  { name: "Context API", level: 95, category: "state" },
  { name: "Redux Toolkit", level: 92, category: "state" },
  { name: "Zustand", level: 88, category: "state" },
  { name: "React Query", level: 90, category: "state" },
  { name: "Recoil", level: 85, category: "state" },
  { name: "React", level: 98, category: "frontend" },
  { name: "TypeScript", level: 95, category: "frontend" },
  { name: "Next.js", level: 93, category: "frontend" },
  { name: "Tailwind CSS", level: 96, category: "frontend" },
  { name: "Vite", level: 90, category: "frontend" },
  { name: "Node.js", level: 88, category: "backend" },
  { name: "Express", level: 87, category: "backend" },
  { name: "PostgreSQL", level: 85, category: "backend" },
  { name: "MongoDB", level: 86, category: "backend" }
];

/* Single source of truth for category info (includes "all") */
const CATEGORY_INFO: Record<Category, CategoryInfoItem> = {
  all: {
    title: "All skills",
    label: "All Skills",
    icon: Grid,
    color: "from-green-500 to-emerald-500"
  },
  hooks: {
    title: "React Hooks",
    label: "Hooks",
    icon: Atom,
    color: "from-purple-500 to-pink-500"
  },
  state: {
    title: "State Management",
    label: "State Management",
    icon: Layers,
    color: "from-blue-500 to-cyan-500"
  },
  frontend: {
    title: "Frontend",
    label: "Frontend",
    icon: Monitor,
    color: "from-amber-500 to-orange-500"
  },
  backend: {
    title: "Backend",
    label: "Backend",
    icon: Database, // or Server if you prefer
    color: "from-rose-500 to-red-500"
  }
};

/* ---------- Component ---------- */
export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersectionObserver(ref, { threshold: 0.1 });

  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  const filteredSkills =
    selectedCategory === "all"
      ? skillsData
      : skillsData.filter((s) => s.category === selectedCategory);

  // Build cards (handle "all" properly and avoid NaN)
  const skillsByCategory = (Object.keys(CATEGORY_INFO) as Category[]).map(
    (key, index) => {
      const info = CATEGORY_INFO[key];
      const list =
        key === "all"
          ? skillsData
          : skillsData.filter((s) => s.category === (key as RealCategory));

      const avg =
        list.length === 0
          ? 0
          : Math.round(list.reduce((sum, s) => sum + s.level, 0) / list.length);

      return { key, info, skills: list, avgLevel: avg, index };
    }
  );

  return (
    <section
      id="skills"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 py-32"
    >
      {/* Decorative blob */}
      <div className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-blue-500 opacity-10 blur-3xl mix-blend-multiply" />

      <div className="container relative z-10 mx-auto px-4">
        <div
          className={`transition-all duration-1000 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-16 text-center">
            <span className="mb-4 block text-sm uppercase tracking-widest text-purple-400">
              Technical Expertise
            </span>
            <h2 className="mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-5xl text-transparent md:text-6xl">
              Skills & Technologies
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-xl text-gray-400">
              4+ years mastering modern web development with React ecosystem
            </p>
            <div className="mx-auto h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500" />
          </div>

          {/* Category Cards */}
          <div className="mx-auto mb-16 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {skillsByCategory.map(({ key, info, skills, avgLevel, index }) => {
              const Icon = info.icon;
              return (
                <div
                  key={key}
                  className={`delay-${
                    index * 100
                  } rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg transition-all duration-500 hover:scale-105 hover:bg-white/10 ${
                    visible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  <div
                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${info.color}`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-2 text-2xl text-white">{info.title}</h3>
                  <p className="mb-4 text-gray-400">
                    {skills.length} technologies
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${info.color} transition-all duration-1000`}
                        style={{ width: visible ? `${avgLevel}%` : "0%" }}
                      />
                    </div>
                    <span className="text-white">{avgLevel}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Category Filter */}
          <div className="mb-16 flex flex-wrap justify-center gap-3">
            {(Object.keys(CATEGORY_INFO) as Category[]).map((key) => {
              const info = CATEGORY_INFO[key];
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`rounded-xl px-8 py-4 transition-all ${
                    selectedCategory === key
                      ? "bg-gradient-to-r text-white shadow-lg"
                      : "border border-white/10 bg-white/5 text-gray-300 backdrop-blur-lg hover:bg-white/10"
                  }`}
                >
                  {info.label}
                </button>
              );
            })}
          </div>

          {/* Skills Grid */}
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            {filteredSkills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                skill={skill}
                index={index}
                visible={visible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Child ---------- */
function SkillBar({
  skill,
  index,
  visible
}: {
  skill: Skill;
  index: number;
  visible: boolean;
}) {
  const [progress, setProgress] = useState(0);
  const cat = CATEGORY_INFO[skill.category];

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setProgress(skill.level), index * 50);
    return () => clearTimeout(t);
  }, [visible, skill.level, index]);

  return (
    <div
      className={`delay-${
        index * 50
      } rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg transition-all duration-500 ${
        visible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
      } hover:bg-white/10`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xl text-white">{skill.name}</span>
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-2xl text-transparent">
          {skill.level}%
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className={`relative h-full overflow-hidden rounded-full bg-gradient-to-r ${cat.color} transition-all duration-1000 ease-out`}
          style={{ width: `${progress}%` }}
        >
          <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}
