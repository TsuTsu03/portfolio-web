import { useRef } from "react";
import { Code2, Rocket, Users, Zap, Shield, Sparkles } from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

  const highlights = [
    {
      icon: Code2,
      title: "Clean Architecture",
      description:
        "Building scalable applications with best practices and design patterns",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Performance First",
      description:
        "Optimizing every millisecond for lightning-fast user experiences",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Robust & Secure",
      description: "Implementing security best practices and thorough testing",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Rocket,
      title: "Modern Stack",
      description: "Leveraging cutting-edge technologies and frameworks",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "User-Centric",
      description: "Creating intuitive interfaces that users love",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Sparkles,
      title: "Pixel Perfect",
      description: "Attention to detail in every design implementation",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-32 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <span className="text-purple-400 text-sm tracking-widest uppercase mb-4 block">
              Get to know me
            </span>
            <h2 className="text-5xl md:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              About Me
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto mb-20">
            <div className="p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10">
              <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed">
                With{" "}
                <span className="text-purple-400">years of experience</span> in
                full-stack development, I specialize in building exceptional web
                applications using <span className="text-blue-400">React</span>{" "}
                and modern JavaScript ecosystems.
              </p>
              <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed">
                My expertise spans from crafting pixel-perfect, responsive user
                interfaces to architecting robust backend systems. I'm
                passionate about{" "}
                <span className="text-pink-400">clean code</span>,
                <span className="text-green-400">
                  {" "}
                  performance optimization
                </span>
                , and creating seamless user experiences.
              </p>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Whether it's implementing complex state management solutions,
                optimizing bundle sizes, or mentoring junior developers, I bring
                a comprehensive approach to every project I work on.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`group p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl delay-${
                    index * 100
                  } ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
