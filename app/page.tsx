import Hero from "./components/sections/Hero";
import Experience from "./components/sections/Experience";
import Education from "./components/sections/Education";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import { ProfileCard } from "./components/ProfileCard";

// Projects are stored in Postgres and edited via /admin, so this route
// must be rendered per-request rather than statically at build time.
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main className="bg-[#0a0a0a] text-white">
      {/* 12-Column Layout Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 px-6 md:px-12">
        {/* LEFT: Sticky Profile (4 Columns) */}
        <div className="lg:col-span-4 pt-24 h-full">
          <ProfileCard />
        </div>

        {/* RIGHT: Scrolling Content (8 Columns) */}
        <div className="lg:col-span-8 flex flex-col pt-24">
          <Hero />
          <div className="space-y-32">
            <Experience />
            <Education />
            <Skills />
            <Projects />
            <Contact />
          </div>
          <Footer />
        </div>
      </div>
    </main>
  );
}
