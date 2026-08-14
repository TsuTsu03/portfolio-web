import { useCallback, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Github, Search } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { handleSpotlight } from "../lib/spotlight";
import { SectionHeading } from "./ui/SectionHeading";

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

const INITIAL_COUNT = 4;

export function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

  const isFiltering = debouncedSearch.trim() !== "" || selectedCategory !== "All";

  const categories = useMemo(
    () => ["All", ...new Set(projectsData.map((project) => project.category))],
    []
  );

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
    <section id="projects" ref={ref} className="relative py-28 md:py-36" aria-label="Featured projects">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div
          className={`transition-all duration-1000 ease-[var(--ease-out)] ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <SectionHeading
            index="03"
            eyebrow="Case Files"
            title="Featured Projects"
            intro="Real-world apps built for real users: healthcare SaaS, dental operations, logistics platforms, e-commerce, and AI-powered analytics."
          />

          {/* Console: search + category filter */}
          <div className="mb-12 flex flex-col gap-4 border-y border-steel py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ash" />
              <label htmlFor="project-search" className="sr-only">
                Search projects
              </label>
              <input
                id="project-search"
                type="text"
                placeholder="Search case files, stack, or outcomes..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="focus-ring w-full border border-steel-bright bg-concrete py-2.5 pr-3 pl-9 font-mono text-sm text-bone outline-none transition-colors duration-200 placeholder:text-ash focus:border-signal/60"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  aria-pressed={selectedCategory === category}
                  className={`focus-ring pressable border px-3 py-2 font-mono text-[0.6875rem] tracking-[0.12em] uppercase transition-colors duration-200 ${
                    selectedCategory === category
                      ? "border-signal bg-signal/15 text-signal"
                      : "border-steel-bright text-ash hover:border-signal/60 hover:text-bone"
                  }`}
                >
                  {category}
                </button>
              ))}
              <span className="data-label ml-1">
                {filteredProjects.length} file{filteredProjects.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <>
              <div className="grid gap-6 lg:grid-cols-2">
                {visibleProjects.map((project, index) => (
                  <CaseFile key={project.id} project={project} index={index} isVisible={isVisible} />
                ))}
              </div>

              {hasMore && (
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={() => setShowAll((open) => !open)}
                    className="pressable focus-ring inline-flex items-center gap-2.5 border border-steel-bright px-6 py-3 font-mono text-xs tracking-[0.16em] text-bone uppercase transition-colors duration-200 hover:border-signal hover:text-signal"
                  >
                    {showAll ? (
                      <>
                        Close files
                        <ChevronUp className="h-3.5 w-3.5" />
                      </>
                    ) : (
                      <>
                        Open all {filteredProjects.length} files
                        <ChevronDown className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="panel chamfer px-6 py-16 text-center">
              <p className="data-label mb-2">No match</p>
              <p className="text-lg text-ash">No case files match that query.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CaseFile({
  project,
  index,
  isVisible,
}: {
  project: Project;
  index: number;
  isVisible: boolean;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const caseNumber = String(project.id).padStart(3, "0");

  return (
    <article
      onMouseMove={handleSpotlight}
      className={`spotlight-card panel chamfer rim-top group flex flex-col transition-all duration-300 hover:border-signal/40 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${Math.min(index * 70, 420)}ms` }}
    >
      {/* File header strip */}
      <div className="relative z-[2] flex items-center justify-between border-b border-steel px-5 py-3">
        <p className="font-mono text-[0.625rem] tracking-[0.18em] text-signal uppercase">
          Case {caseNumber}
        </p>
        <div className="flex items-center gap-3">
          <span className="data-label">{project.category}</span>
          <span className="flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.14em] text-sodium uppercase">
            <span className="h-1.5 w-1.5 bg-sodium" />
            Shipped
          </span>
        </div>
      </div>

      <div className="relative z-[2] aspect-[16/9] overflow-hidden border-b border-steel bg-void">
        <img
          src={project.image}
          alt={`${project.title} interface screenshot`}
          onLoad={() => setImageLoaded(true)}
          className={`h-full w-full object-cover object-top transition-all duration-700 group-hover:scale-[1.03] ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />
        {/* Cold rim light raking the screenshot */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--void) 4%, transparent 58%), linear-gradient(105deg, transparent 55%, var(--signal-wash) 100%)",
          }}
        />
      </div>

      <div className="relative z-[2] flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="display-tight mb-3 text-xl leading-snug text-white-hot">{project.title}</h3>
        <p className="mb-5 text-sm leading-relaxed text-ash">{project.description}</p>

        <div className="mb-5 border-l-2 border-signal/50 pl-4">
          <p className="data-label mb-1.5">Outcome</p>
          <p className="text-sm leading-relaxed text-bone">{project.outcome}</p>
        </div>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-steel px-2 py-1 font-mono text-[0.625rem] tracking-[0.06em] text-ash"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mb-6">
          <p className="data-label mb-2">Hooks &amp; patterns</p>
          <div className="flex flex-wrap gap-1.5">
            {project.hooksUsed.map((hook) => (
              <span
                key={hook}
                className="font-mono text-[0.625rem] tracking-[0.06em] text-ash"
              >
                {hook}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto flex gap-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable focus-ring flex flex-1 items-center justify-center gap-2 border border-steel-bright px-4 py-2.5 font-mono text-[0.6875rem] tracking-[0.14em] text-bone uppercase transition-colors duration-200 hover:border-steel-bright"
          >
            <Github className="h-3.5 w-3.5" />
            Code
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable focus-ring flex flex-1 items-center justify-center gap-2 border border-signal/50 bg-signal/12 px-4 py-2.5 font-mono text-[0.6875rem] tracking-[0.14em] text-signal uppercase transition-colors duration-200 hover:bg-signal/22"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Live
          </a>
        </div>
      </div>
    </article>
  );
}
