import { Frame, Sigma, Globe, Database, Code2, Cpu } from "lucide-react";

const tools = [
  { name: "Framer", icon: <Frame size={32} /> },
  { name: "NextJS", icon: <Code2 size={32} /> },
  { name: "Tailwind", icon: <Globe size={32} /> }, // Using Globe as a placeholder for Web/Chrome
  { name: "Figma", icon: <Sigma size={32} /> },
];

export default function Tools() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="bg-[#b4ff39] rounded-[40px] p-12 text-black overflow-hidden relative">
        <h2 className="text-5xl font-black mb-12 uppercase italic">
          My Tech Stack
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {tools.map((tool, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-4 bg-white/20 backdrop-blur-sm p-6 rounded-3xl border border-black/5 hover:scale-105 transition"
            >
              {tool.icon}
              <span className="font-bold">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
