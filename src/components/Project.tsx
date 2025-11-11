import { useState, useMemo, useCallback, useRef } from "react";
import { Search, ExternalLink, Github, Filter, Star } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

interface Project {
  id: number;
  title: string;
  description: string;
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
    title: "E-Commerce Platform",
    description:
      "Enterprise-level e-commerce solution with real-time analytics, inventory management, payment integration, and order tracking. Built with advanced React patterns and optimized for performance.",
    tags: ["React", "TypeScript", "Redux Toolkit", "Node.js"],
    category: "Web App",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    hooksUsed: ["useState", "useEffect", "useContext", "useReducer"],
    featured: true
  },
  {
    id: 2,
    title: "Project Management Suite",
    description:
      "Comprehensive task and project management system with real-time collaboration, drag-and-drop functionality, Gantt charts, and team analytics.",
    tags: ["React", "Redux", "Socket.io", "Express"],
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    hooksUsed: ["useState", "useCallback", "useMemo", "Custom Hooks"],
    featured: true
  },
  {
    id: 3,
    title: "Real-Time Dashboard",
    description:
      "Interactive analytics dashboard with live data visualization, customizable widgets, and real-time updates using WebSockets.",
    tags: ["React", "D3.js", "WebSocket", "Tailwind"],
    category: "Analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    hooksUsed: ["useState", "useEffect", "useRef", "useMemo"]
  },
  {
    id: 4,
    title: "Social Media Platform",
    description:
      "Full-featured social network with posts, stories, real-time messaging, notifications, and advanced feed algorithms.",
    tags: ["React", "Next.js", "PostgreSQL", "Redis"],
    category: "Web App",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    hooksUsed: ["useContext", "useReducer", "useState", "useEffect"],
    featured: true
  },
  {
    id: 5,
    title: "Design System Library",
    description:
      "Comprehensive component library with Storybook documentation, accessibility features, and theme customization.",
    tags: ["React", "TypeScript", "Storybook", "Tailwind"],
    category: "Library",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    hooksUsed: ["useState", "useCallback", "useMemo", "useRef"]
  },
  {
    id: 6,
    title: "Healthcare Portal",
    description:
      "HIPAA-compliant patient management system with appointment scheduling, telemedicine integration, and electronic health records.",
    tags: ["React", "FHIR", "Node.js", "MongoDB"],
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    hooksUsed: ["useState", "useEffect", "useMemo", "Custom Hooks"]
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
      const matchesSearch =
        project.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        project.description
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(debouncedSearch.toLowerCase())
        ) ||
        project.hooksUsed.some((hook) =>
          hook.toLowerCase().includes(debouncedSearch.toLowerCase())
        );

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
          <div className="text-center mb-16">
            <span className="text-purple-400 text-sm tracking-widest uppercase mb-4 block">
              Portfolio
            </span>
            <h2 className="text-5xl md:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
              Showcasing enterprise-level applications with advanced React
              patterns and state management
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
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
                  className="w-full pl-12 pr-6 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
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
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50"
                      : "bg-white/5 backdrop-blur-lg border border-white/10 text-gray-300 hover:bg-white/10"
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
      className={`group bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105 delay-${
        index * 100
      } ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="relative h-64 bg-gradient-to-br from-purple-900/20 to-pink-900/20 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
          } ${isHovered ? "scale-110" : ""}`}
        />
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
        <h3 className="text-2xl md:text-3xl mb-3 text-white">
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
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all group"
          >
            <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Code
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/50 group"
          >
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            Demo
          </a>
        </div>
      </div>
    </div>
  );
}
