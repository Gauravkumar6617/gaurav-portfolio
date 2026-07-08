import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { sql, type Project } from "@/lib/db";

export default async function Projects() {
  const projects = (await sql`
    SELECT id, title, category, description, link, image_url
    FROM projects
    WHERE featured = true
    ORDER BY sort_order ASC, created_at DESC
    LIMIT 4
  `) as Project[];

  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 w-full">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-5xl font-bold tracking-tight">PROJECTS</h2>
          <p className="text-zinc-400 mt-2">
            Showcasing my latest work and achievements
          </p>
        </div>
        <Link
          href="/projects"
          className="text-zinc-500 hover:text-white transition"
        >
          View All →
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-zinc-500">
          No projects added yet. Check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj) => (
            <a
              key={proj.id}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer block"
            >
              <div className="relative aspect-video overflow-hidden rounded-[32px] bg-zinc-900">
                {proj.image_url && (
                  <img
                    src={proj.image_url}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />
              </div>
              <div className="mt-6 flex justify-between items-start">
                <div className="flex-1">
                  {proj.category && (
                    <p className="text-orange-500 text-sm uppercase tracking-widest font-bold mb-1">
                      {proj.category}
                    </p>
                  )}
                  <h3 className="text-2xl font-semibold mb-2">{proj.title}</h3>
                  <p className="text-zinc-400 text-sm">{proj.description}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-black transition flex-shrink-0 ml-4">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
