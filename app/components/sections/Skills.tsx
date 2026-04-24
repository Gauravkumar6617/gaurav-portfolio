import { Code2, Brain, Database, Zap } from "lucide-react";

const skillCategories = [
  {
    title: "Programming",
    icon: Code2,
    skills: ["Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "Backend & AI",
    icon: Brain,
    skills: ["FastAPI", "RAG", "AI/ML", "GenAI", "LLM Integration"],
  },
  {
    title: "Database",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    title: "Frontend & Tools",
    icon: Zap,
    skills: ["React.js", "Next.js", "Tailwind CSS", "Git"],
  },
];

const learning = [
  "Advanced AI Architectures",
  "Kubernetes & Docker",
  "System Design",
  "GraphQL",
];

export default function Skills() {
  return (
    <section id="skills" className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
          SKILLS &{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
            EXPERTISE
          </span>
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          A comprehensive toolkit for building intelligent systems and modern
          web applications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {skillCategories.map((category, idx) => {
          const Icon = category.icon;
          return (
            <div
              key={idx}
              className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-[24px] p-8 border border-zinc-700 hover:border-orange-500 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Icon size={24} className="text-orange-500" />
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
              <div className="space-y-3">
                {category.skills.map((skill, skillIdx) => (
                  <div
                    key={skillIdx}
                    className="flex items-center gap-3 group cursor-pointer"
                  >
                    <div className="w-2 h-2 rounded-full bg-orange-500 group-hover:scale-150 transition-transform" />
                    <span className="text-zinc-300 group-hover:text-white transition-colors text-sm">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Learning Section */}
      <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-2xl p-8">
        <h3 className="text-2xl font-black mb-6 text-orange-400">
          Currently Learning
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {learning.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-4 bg-black/40 rounded-lg border border-orange-500/20"
            >
              <div className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
              <span className="text-orange-100 text-sm font-medium">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
