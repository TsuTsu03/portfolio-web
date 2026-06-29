import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Projects } from "./components/Project";
import { AuroraBackground } from "./components/AuroraBackground";
import ThemeProvider from "./context/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors">
        <AuroraBackground />
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
