import { useState, useMemo, useCallback, useRef } from "react";
import { Search, ExternalLink, Github, Filter, Star } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

// ⬇️ Local images
import EmployeeImg from "../assets/projects/Employee.png";
import SaasImg from "../assets/projects/saas.png";
import CareerPathImg from "../assets/projects/Carpath.png";
import ClinicFlowImg from "../assets/projects/clinicflow.png";
import SmileyImg from "../assets/projects/smiley.png";
import ThriftStoreImg from "../assets/projects/thriftstore.png";
import LogisticsImg from "../assets/projects/logistics.png";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: string;
  image: string;
  placeholderIcon?: React.ComponentType<{ className?: string }>;
  placeholderGradient?: string;
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
      "Full-stack clinic operations platform with real-time doctor status monitoring, appointment scheduling, patient records, and role-based portals for admins, doctors, and patients. Built to cut administrative overhead and reduce patient wait times.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Postgres"],
    category: "SaaS",
    image: ClinicFlowImg as unknown as string,
    githubUrl: "https://github.com/TsuTsu03",
    liveUrl: "https://clinicflow-beige.vercel.app/",
    hooksUsed: ["useState", "useEffect", "useCallback"],
    featured: true
  },
  {
    id: 2,
    title: "Career Path Recommender Platform",
    description:
      "AI-assisted student assessment system with career track recommendations, admin dashboards, role-based login, and real-time data management. Helps students and institutions make smarter educational decisions.",
    tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Vite"],
    category: "Web App",
    image: CareerPathImg as unknown as string,
    githubUrl: "https://github.com/TsuTsu03/career-path",
    liveUrl: "https://career-path-ecru.vercel.app/",
    hooksUsed: ["useState", "useEffect", "useMemo"],
    featured: true
  },
  {
    id: 3,
    title: "SaaS Data Analysis Platform",
    description: "AI-powered data ingestion and analysis pipeline with a modern dashboard UI. Enables businesses to surface insights from raw data without needing a dedicated data team.",
    tags: ["Next.js", "TypeScript", "Tailwind", "OpenAI", "Supabase"],
    category: "SaaS",
    image: SaasImg as unknown as string,
    githubUrl: "https://github.com/TsuTsu03/saas-data-analysis-platform",
    liveUrl: "https://data-analysis-nine.vercel.app/",
    hooksUsed: ["useState", "useCallback", "useMemo"],
    featured: true
  },
  {
    id: 5,
    title: "Smiley — Dental Clinic Management SaaS",
    description:
      "Multi-tenant dental clinic platform with full patient records, appointment scheduling by date or dentist, automated SMS & email reminders, and dedicated portals for admins, dentists, and patients. Supports custom branded subdomains per clinic.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Postgres"],
    category: "SaaS",
    image: SmileyImg as unknown as string,
    githubUrl: "https://github.com/TsuTsu03/smiley-app",
    liveUrl: "https://smiley-app-tau.vercel.app/",
    hooksUsed: ["useState", "useEffect", "useCallback"],
    featured: true
  },
  {
    id: 4,
    title: "ShiftDesk — Employee Ticketing & Tracking SaaS",
    description:
      "Multi-tenant SaaS with GPS shift clock-ins, IT ticketing, chat-first support, and auth-gated dashboards for employees, admins, and managers. Designed for frontline teams that need visibility into employee activities and internal support requests.",
    tags: ["Next.js", "Supabase", "Postgres", "Tailwind"],
    category: "SaaS",
    image: EmployeeImg as unknown as string,
    githubUrl: "https://github.com/TsuTsu03/employee-ticketing-system",
    liveUrl: "https://employee-system-nine-rosy.vercel.app/",
    hooksUsed: ["useState", "useEffect", "useMemo"],
    featured: true
  },
  {
    id: 6,
    title: "The Thrift Store — Curated Pre-Loved E-Commerce",
    description:
      "Online thrift storefront for curated, authenticated pre-loved fashion. Features product browsing by category, a shopping flow, and a clean, modern shopping experience aimed at the sustainable-fashion market.",
    tags: ["Next.js", "TypeScript", "Tailwind", "E-Commerce"],
    category: "Web App",
    image: ThriftStoreImg as unknown as string,
    githubUrl: "https://github.com/TsuTsu03/thrift-store",
    liveUrl: "https://thrift-store-beige.vercel.app/",
    hooksUsed: ["useState", "useEffect", "useMemo"],
    featured: true
  },
  {
    id: 7,
    title: "Biyahero Express — Logistics OS",
    description:
      "End-to-end logistics operations platform for growing businesses: booking management, order tracking, live delivery tracking, route planning, proof of delivery, COD remittance, invoicing, and fleet & driver management — all in one real-time operations dashboard.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Postgres"],
    category: "SaaS",
    image: LogisticsImg as unknown as string,
    githubUrl: "https://github.com/TsuTsu03/logistics-system",
    liveUrl: "https://logistics-system-five.vercel.app/dashboard",
    hooksUsed: ["useState", "useEffect", "useCallback"],
    featured: true
  }
];

export function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

  const categories = useMemo(() => {
    const cats = ["All", ...new Set(projectsData.map((p) => p.category))];
    return cats;
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const q = debouncedSearch.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        project.hooksUsed.some((hook) => hook.toLowerCase().includes(q));

      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [debouncedSearch, selectedCategory]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const regularProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      ref={ref}
      className="py-32 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-400 mb-6" style={{ maxWidth: "65ch" }}>
              Real-world apps built for real users — healthcare SaaS, logistics platforms, e-commerce, and AI-powered analytics.
            </p>
            <div className="w-16 h-1 bg-purple-500 rounded-full" />
          </div>

          {/* Search and Filter Controls */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects, hooks, or technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-3.5 rounded-xl border border-slate-700 bg-slate-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>

            {/* Category Filters */}
            <div
              className={`${
                showFilters ? "flex" : "hidden"
              } md:flex flex-wrap gap-3 justify-center`}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-6 py-3 rounded-xl transition-all ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-slate-800 border border-slate-700 text-gray-400 hover:text-white hover:border-slate-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-center text-gray-400 mb-12 text-lg">
            {filteredProjects.length} project
            {filteredProjects.length !== 1 ? "s" : ""} found
          </p>

          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center gap-3 mb-8">
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <h3 className="text-3xl text-white">Featured Work</h3>
              </div>
              <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-12">
                {featuredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    isVisible={isVisible}
                    featured
                  />
                ))}
              </div>
            </div>
          )}

          {/* Regular Projects */}
          {regularProjects.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {regularProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index + featuredProjects.length}
                  isVisible={isVisible}
                />
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-500">
                No projects found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isVisible
}: {
  project: Project;
  index: number;
  isVisible: boolean;
  featured?: boolean;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group bg-slate-800/80 rounded-xl overflow-hidden border border-slate-700/60 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 delay-${
        index * 100
      } ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="relative h-64 bg-gradient-to-br from-purple-900/20 to-pink-900/20 overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
            } ${isHovered ? "scale-110" : ""}`}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${project.placeholderGradient ?? "from-purple-700 to-pink-700"} transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}>
            {project.placeholderIcon && (
              <project.placeholderIcon className="w-24 h-24 text-white/30" />
            )}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>

        {project.featured && (
          <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 text-sm flex items-center gap-2">
            <Star className="w-4 h-4 fill-current" />
            Featured
          </div>
        )}

        <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm border border-white/20">
          {project.category}
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-xl font-bold mb-3 text-white leading-snug">
          {project.title}
        </h3>
        <p className="text-gray-400 mb-6 leading-relaxed">
          {project.description}
        </p>

        <div className="mb-6">
          <p className="text-sm text-purple-400 mb-3">
            React Hooks & Patterns:
          </p>
          <div className="flex flex-wrap gap-2">
            {project.hooksUsed.map((hook) => (
              <span
                key={hook}
                className="px-3 py-1 text-sm rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30"
              >
                {hook}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm rounded-lg bg-white/5 text-gray-300 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-700/60 border border-slate-600/60 text-white hover:bg-slate-700 transition-all duration-200 group"
          >
            <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Code
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-all duration-200 shadow-md shadow-purple-600/20 group"
          >
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            Demo
          </a>
        </div>
      </div>
    </div>
  );
}
