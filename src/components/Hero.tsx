import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Code, Coffee, Award } from "lucide-react";

export function Hero() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Full Stack React Developer";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  const stats = [
    { icon: Code, value: "4+", label: "Years Experience" },
    { icon: Award, value: "10+", label: "Projects Completed" },
    { icon: Coffee, value: "10K+", label: "Cups of Coffee" }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm backdrop-blur-sm">
              Available for freelance projects
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200 leading-tight">
            Hi, I'm{" "}
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Den Jansen Flores
            </span>
          </h1>

          <div className="h-16 mb-8">
            <p className="text-3xl md:text-4xl text-gray-300">
              {displayText}
              <span className="animate-pulse text-purple-400">|</span>
            </p>
          </div>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Crafting exceptional digital experiences with{" "}
            <span className="text-purple-400">React</span>,{" "}
            <span className="text-blue-400">TypeScript</span>, and modern web
            technologies.
            <br />
            <span className="text-gray-500">
              Transforming ideas into scalable solutions for 5+ years.
            </span>
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-3xl md:text-4xl text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-4 mb-12">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <Github className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </a>
            <a
              href="mailto:john@example.com"
              className="group p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <Mail className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <button
              onClick={() => {
                const element = document.getElementById("projects");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/50"
            >
              View My Work
            </button>
            <button
              onClick={() => {
                const element = document.getElementById("contact");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
