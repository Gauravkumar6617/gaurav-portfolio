import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { sql, type Project } from "@/lib/db";

export const metadata: Metadata = {
  title: "Projects",
  description: "All projects by Gaurav Kumar.",
};

export const dynamic = "force-dynamic";

export default async function AllProjectsPage() {
  const projects = (await sql`
    SELECT id, title, category, description, link, image_url
    FROM projects
    ORDER BY sort_order ASC, created_at DESC
  `) as Project[];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="text-zinc-500 hover:text-white transition text-sm"
        >
          ← Back home
        </Link>
        <h1 className="text-5xl font-bold tracking-tight mt-6 mb-2">
          ALL PROJECTS
        </h1>
        <p className="text-zinc-400 mb-12">Everything I&apos;ve built so far</p>

        {projects.length === 0 ? (
          <p className="text-zinc-500">No projects yet.</p>
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
                    <h3 className="text-2xl font-semibold mb-2">
                      {proj.title}
                    </h3>
                    <p className="text-zinc-400 text-sm">
                      {proj.description}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-black transition flex-shrink-0 ml-4">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
