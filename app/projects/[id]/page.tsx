import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sql, type Project } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getProject(idParam: string): Promise<Project | null> {
  const id = Number(idParam);
  if (!Number.isInteger(id) || id <= 0) return null;

  const rows = (await sql`
    SELECT id, title, category, description, content, link, image_url, featured, sort_order, created_at
    FROM projects
    WHERE id = ${id}
  `) as Project[];

  return rows[0] ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.description || `${project.title} — project details.`,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/projects"
          className="text-zinc-500 hover:text-white transition text-sm"
        >
          ← Back to all projects
        </Link>

        {project.image_url && (
          <div className="relative aspect-video overflow-hidden rounded-[32px] bg-zinc-900 mt-6">
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="mt-8">
          {project.category && (
            <p className="text-orange-500 text-sm uppercase tracking-widest font-bold mb-2">
              {project.category}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {project.title}
          </h1>

          {project.description && (
            <p className="text-zinc-400 text-lg mt-4">{project.description}</p>
          )}

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 bg-orange-500 text-black font-semibold rounded-lg px-5 py-2.5 hover:bg-orange-400 transition"
          >
            Visit Live Project
            <ArrowUpRight size={18} />
          </a>

          {project.content && (
            <div className="mt-12 pt-8 border-t border-white/10 text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {project.content}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
