import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "AI Chatbot System",
    category: "Python & AI",
    img: "/p1.jpg",
    description: "Built with FastAPI and LLM integration",
  },
  {
    title: "Full Stack Web App",
    category: "React & Next.js",
    img: "/p2.jpg",
    description: "Modern web application with responsive design",
  },
];

export default function Projects() {
  return (
    <section className="max-w-7xl mx-auto px-6 w-full">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-5xl font-bold tracking-tight">PROJECTS</h2>
          <p className="text-zinc-400 mt-2">
            Showcasing my latest work and achievements
          </p>
        </div>
        <button className="text-zinc-500 hover:text-white transition">
          View All →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((proj, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="relative aspect-video overflow-hidden rounded-[32px] bg-zinc-900">
              <img
                src={proj.img}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />
            </div>
            <div className="mt-6 flex justify-between items-start">
              <div className="flex-1">
                <p className="text-orange-500 text-sm uppercase tracking-widest font-bold mb-1">
                  {proj.category}
                </p>
                <h3 className="text-2xl font-semibold mb-2">{proj.title}</h3>
                <p className="text-zinc-400 text-sm">{proj.description}</p>
              </div>
              <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-black transition flex-shrink-0 ml-4">
                <ArrowUpRight size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
