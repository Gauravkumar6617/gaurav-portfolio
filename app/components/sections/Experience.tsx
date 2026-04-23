const roles = [
  {
    year: "2024 — Present",
    company: "SIngsys",
    role: "Python Developer",
    description: "Developing backend systems with Python and FastAPI",
  },
  {
    year: "2024",
    company: "Founder Code",
    role: "Intern",
    description: "Worked on full-stack development projects",
  },
  {
    year: "2024",
    company: "Mecatrdez Technology",
    role: "Industrial Training",
    description: "Industrial training in software development",
  },
];

export default function Experience() {
  return (
    <section className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
      <h2 className="lg:col-span-4 text-4xl font-bold">EXPERIENCE</h2>
      <div className="lg:col-span-8 space-y-0">
        {roles.map((item, idx) => (
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
                  {item.role}
                </h3>
                <p className="text-zinc-500 text-sm mb-2">{item.company}</p>
                <p className="text-zinc-400 text-sm">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
