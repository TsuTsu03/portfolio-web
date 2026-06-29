import { useCallback, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Filter, Github, Search, Star } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { handleSpotlight } from "../lib/spotlight";

import CareerPathImg from "../assets/projects/Carpath.png";
import ClinicFlowImg from "../assets/projects/clinicflow.png";
import EmployeeImg from "../assets/projects/Employee.png";
import LogisticsImg from "../assets/projects/logistics.png";
import SaasImg from "../assets/projects/saas.png";
import SmileyImg from "../assets/projects/smiley.png";
import ThriftStoreImg from "../assets/projects/thriftstore.png";

interface Project {
  id: number;
  title: string;
  description: string;
  outcome: string;
  tags: string[];
  category: string;
  image: string;
  githubUrl: string;
  liveUrl: string;
  hooksUsed: string[];
  featured?: boolean;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "ClinicFlow — Healthcare Management SaaS",
    description:
      "Clinic operations platform with doctor status monitoring, appointment scheduling, patient records, and role-based portals for admins, doctors, and patients.",
    outcome: "Built the data model, product flows, dashboards, and Supabase-backed workflow for real clinic operations.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Postgres"],
    category: "SaaS",
    image: ClinicFlowImg as unknown as string,
    githubUrl: "https://github.com/TsuTsu03",
    liveUrl: "https://clinicflow-beige.vercel.app/",
    hooksUsed: ["useState", "useEffect", "useCallback"],
    featured: true,
  },
  {
    id: 2,
    title: "Career Path Recommender Platform",
    description:
      "AI-assisted student assessment system with career recommendations, admin dashboards, role-based login, and real-time institutional data management.",
    outcome: "Turned AI recommendations into a guided decision workflow for students and administrators.",
    tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Vite"],
    category: "AI App",
    image: CareerPathImg as unknown as string,
    githubUrl: "https://github.com/TsuTsu03/career-path",
    liveUrl: "https://career-path-ecru.vercel.app/",
    hooksUsed: ["useState", "useEffect", "useMemo"],
    featured: true,
  },
  {
    id: 3,
    title: "SaaS Data Analysis Platform",
    description:
      "AI-powered data ingestion and analysis pipeline with a dashboard UI that helps businesses surface insights from raw data without a dedicated data team.",
    outcome: "Shipped the full AI insight loop: ingestion, prompting, summaries, and decision-ready UI.",
    tags: ["Next.js", "TypeScript", "Tailwind", "OpenAI", "Supabase"],
    category: "AI App",
    image: SaasImg as unknown as string,
    githubUrl: "https://github.com/TsuTsu03/saas-data-analysis-platform",
    liveUrl: "https://data-analysis-nine.vercel.app/",
    hooksUsed: ["useState", "useCallback", "useMemo"],
    featured: true,
  },
  {
    id: 4,
    title: "Smiley — Dental Clinic Management SaaS",
    description:
      "Multi-tenant dental platform with patient records, appointment scheduling, reminders, clinic portals, and branded subdomain support.",
    outcome: "Built tenant-aware dental workflows designed for clinic adoption, billing readiness, and patient-facing polish.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Postgres"],
    category: "SaaS",
    image: SmileyImg as unknown as string,
    githubUrl: "https://github.com/TsuTsu03/smiley-app",
    liveUrl: "https://smiley-app-tau.vercel.app/",
    hooksUsed: ["useState", "useEffect", "useCallback"],
    featured: true,
  },
  {
    id: 5,
    title: "ShiftDesk — Employee Ticketing & Tracking SaaS",
    description:
      "Workforce SaaS with GPS shift clock-ins, IT ticketing, chat-first support, and auth-gated dashboards for employees, admins, and managers.",
    outcome: "Connected HR operations, ticket lifecycle, and role-specific dashboards into one maintainable system.",
    tags: ["Next.js", "Supabase", "Postgres", "Tailwind"],
    category: "SaaS",
    image: EmployeeImg as unknown as string,
    githubUrl: "https://github.com/TsuTsu03/employee-ticketing-system",
    liveUrl: "https://employee-system-nine-rosy.vercel.app/",
    hooksUsed: ["useState", "useEffect", "useMemo"],
    featured: true,
  },
  {
    id: 6,
    title: "The Thrift Store — Curated Pre-Loved E-Commerce",
    description:
      "Online thrift storefront for curated, authenticated pre-loved fashion with category browsing, shopping flow, and a clean sustainable-commerce experience.",
    outcome: "Balanced conversion-focused e-commerce patterns with a maintainable front-end architecture.",
    tags: ["Next.js", "TypeScript", "Tailwind", "E-Commerce"],
    category: "Commerce",
    image: ThriftStoreImg as unknown as string,
    githubUrl: "https://github.com/TsuTsu03/thrift-store",
    liveUrl: "https://thrift-store-beige.vercel.app/",
    hooksUsed: ["useState", "useEffect", "useMemo"],
    featured: true,
  },
  {
    id: 7,
    title: "Biyahero Express — Logistics OS",
    description:
      "Logistics operations platform for booking management, live delivery tracking, route planning, proof of delivery, COD remittance, invoicing, and fleet management.",
    outcome: "Modeled a real operations workflow as a full-stack system rather than a static dashboard.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Postgres"],
    category: "Operations",
    image: LogisticsImg as unknown as string,
    githubUrl: "https://github.com/TsuTsu03/logistics-system",
    liveUrl: "https://logistics-system-five.vercel.app/dashboard",
    hooksUsed: ["useState", "useEffect", "useCallback"],
    featured: true,
  },
];

export function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

  const INITIAL_COUNT = 4;
  const isFiltering = debouncedSearch.trim() !== "" || selectedCategory !== "All";

  const categories = useMemo(() => ["All", ...new Set(projectsData.map((project) => project.category))], []);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const query = debouncedSearch.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.outcome.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        project.hooksUsed.some((hook) => hook.toLowerCase().includes(query));

      return matchesSearch && (selectedCategory === "All" || project.category === selectedCategory);
    });
  }, [debouncedSearch, selectedCategory]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const visibleProjects =
    showAll || isFiltering ? filteredProjects : filteredProjects.slice(0, INITIAL_COUNT);
  const hasMore = !isFiltering && filteredProjects.length > INITIAL_COUNT;

  return (
    <section
      id="projects"
      ref={ref}
      className="relative overflow-hidden py-32"
      aria-label="Featured projects"
    >
      <div className="container relative z-10 mx-auto px-4">
        <div className={`transition-all duration-1000 ease-[var(--ease-out)] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="mb-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-blue-400">Selected work</p>
            <h2 className="mb-4 text-5xl font-bold tracking-tight text-white md:text-6xl">Featured Projects</h2>
            <p className="mb-6 max-w-[68ch] text-xl leading-relaxed text-gray-400">
              Real-world apps built for real users: healthcare SaaS, dental operations, logistics platforms,
              e-commerce, and AI-powered analytics.
            </p>
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-sky-300" />
          </div>

          <div className="mx-auto mb-16 max-w-4xl">
            <div className="mb-6 flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search projects, hooks, outcomes, or technologies..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="focus-ring w-full rounded-xl border border-slate-700 bg-slate-900 px-6 py-3.5 pl-12 text-white outline-none transition-all duration-200 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
              <button
                onClick={() => setShowFilters((open) => !open)}
                className="pressable focus-ring flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-white transition-colors duration-200 hover:bg-blue-500 md:hidden"
              >
                <Filter className="h-5 w-5" />
                Filters
              </button>
            </div>

            <div className={`${showFilters ? "flex" : "hidden"} flex-wrap justify-center gap-3 md:flex`}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`pressable focus-ring rounded-xl px-6 py-3 transition-colors duration-200 ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "border border-slate-700 bg-slate-800 text-gray-400 hover:border-slate-500 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <p className="mb-12 text-center text-lg text-gray-400">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found
          </p>

          {filteredProjects.length > 0 ? (
            <div className="mb-20">
              <div className="mb-8 flex items-center gap-3">
                <Star className="h-6 w-6 fill-current text-sky-300" />
                <h3 className="text-3xl text-white">Featured Work</h3>
              </div>
              <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
                {visibleProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} isVisible={isVisible} />
                ))}
              </div>

              {hasMore && (
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={() => setShowAll((open) => !open)}
                    className="pressable focus-ring inline-flex items-center gap-2 rounded-xl border border-slate-400/25 bg-white/[0.04] px-7 py-3.5 font-semibold text-slate-100 transition-colors duration-200 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-white"
                  >
                    {showAll ? (
                      <>
                        Show less
                        <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Show all projects ({filteredProjects.length})
                        <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-700/60 bg-slate-800/70 py-16 text-center">
              <p className="text-2xl text-gray-400">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isVisible }: { project: Project; index: number; isVisible: boolean }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article
      onMouseMove={handleSpotlight}
      className={`spotlight-card group edge-silver overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/85 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/45 hover:shadow-blue-500/10 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${Math.min(index * 70, 420)}ms` }}
    >
      <div className="relative h-64 overflow-hidden bg-slate-900">
        <img
          src={project.image}
          alt={`${project.title} interface screenshot`}
          onLoad={() => setImageLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${
            imageLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
          {project.category}
        </div>
        {project.featured && (
          <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-gradient-to-b from-slate-100 to-slate-300 px-4 py-2 text-sm font-semibold text-slate-950">
            <Star className="h-4 w-4 fill-current" />
            Featured
          </div>
        )}
      </div>

      <div className="relative z-[2] p-7 md:p-8">
        <h3 className="mb-3 text-xl font-bold leading-snug text-white">{project.title}</h3>
        <p className="mb-5 leading-relaxed text-gray-400">{project.description}</p>
        <p className="mb-6 rounded-xl border border-blue-400/20 bg-blue-500/10 p-4 text-sm leading-relaxed text-blue-100">
          <span className="font-semibold text-white">Outcome:</span> {project.outcome}
        </p>

        <div className="mb-6">
          <p className="mb-3 text-sm text-blue-300">React Hooks & Patterns:</p>
          <div className="flex flex-wrap gap-2">
            {project.hooksUsed.map((hook) => (
              <span key={hook} className="rounded-lg border border-slate-400/20 bg-slate-300/[0.06] px-3 py-1 text-sm text-slate-200">
                {hook}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1 text-sm text-gray-300">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable focus-ring flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-600/60 bg-slate-700/60 px-4 py-3 text-white transition-colors duration-200 hover:bg-slate-700"
          >
            <Github className="h-5 w-5" />
            Code
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable focus-ring flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-white shadow-md shadow-blue-600/20 transition-colors duration-200 hover:bg-blue-500"
          >
            <ExternalLink className="h-5 w-5" />
            Demo
          </a>
        </div>
      </div>
    </article>
  );
}
