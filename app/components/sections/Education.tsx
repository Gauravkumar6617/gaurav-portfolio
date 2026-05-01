import { GraduationCap } from "lucide-react";

const education = [
  {
    year: "2026 — Current",
    degree: "BCA",
    institution: "Integral University",
    description: "Pursuing Bachelor of Computer Applications",
  },
  {
    year: "2021 — 2024",
    degree: "Diploma",
    institution: "Hewett Polythecnic",
    description: "Completed Diploma studies",
  },
  {
    year: "2021",
    degree: "High School",
    institution: "New Public College",
    description: "Completed secondary education",
  },
];

export default function Education() {
  return (
    <section id="education" className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
      <h2 className="lg:col-span-4 text-4xl font-bold flex items-center gap-3">
        <GraduationCap size={40} className="text-orange-500" />
        EDUCATION
      </h2>
      <div className="lg:col-span-8 space-y-0">
        {education.map((item, idx) => (
          <div
            key={idx}
            className="border-t border-zinc-800 py-8 hover:bg-zinc-900/50 transition px-4 rounded-xl group"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <span className="text-zinc-400 font-mono text-sm md:w-24">
                {item.year}
              </span>
              <div className="md:flex-1">
                <h3 className="text-xl font-bold text-white mb-1">
                  {item.degree}
                </h3>
                <p className="text-orange-400 font-semibold text-sm mb-2">
                  {item.institution}
                </p>
                <p className="text-zinc-400 text-sm">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
