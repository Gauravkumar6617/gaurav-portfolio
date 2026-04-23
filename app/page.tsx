import Contact from "./components/sections/Contact";
import Experience from "./components/sections/Experience";
import Education from "./components/sections/Education";
import Skills from "./components/sections/Skills";
import Hero from "./components/sections/Hero";
import Marquee from "./components/sections/Marquee";
import Projects from "./components/sections/Projects";
import Tools from "./components/sections/Tools";
import Navbar from "./components/shared/Navbar";

export default function RootLayout() {
  return (
    <main className="bg-[#0a0a0a] text-white selection:bg-lime-400 selection:text-black">
      <Navbar />
      <Hero />
      <Marquee />
      <div className="space-y-32 py-32">
        <Projects />
        <Experience />
        <Education />
        <Skills />
        <Tools />
        <Contact />
      </div>
    </main>
  );
}
