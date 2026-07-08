"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  link: string;
  image_url: string;
  featured: boolean;
  sort_order: number;
};

const emptyForm = {
  title: "",
  category: "",
  description: "",
  link: "",
  image_url: "",
  featured: true,
  sort_order: 0,
};

export default function AdminDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  async function loadProjects() {
    setLoading(true);
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data.projects || []);
    setLoading(false);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function startEdit(p: Project) {
    setEditingId(p.id);
    setForm({
      title: p.title,
      category: p.category,
      description: p.description,
      link: p.link,
      image_url: p.image_url,
      featured: p.featured,
      sort_order: p.sort_order,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save project");
        return;
      }
      cancelEdit();
      await loadProjects();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this project?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      await loadProjects();
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Manage Projects</h1>
          <button
            onClick={handleLogout}
            className="text-zinc-400 hover:text-white text-sm border border-white/10 rounded-lg px-4 py-2 transition"
          >
            Log out
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#141414] border border-white/10 rounded-2xl p-6 mb-10 space-y-4"
        >
          <h2 className="text-lg font-semibold">
            {editingId ? "Edit Project" : "Add New Project"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Title *"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="rounded-lg bg-[#0a0a0a] border border-white/10 px-4 py-2.5 outline-none focus:border-orange-500 transition"
            />
            <input
              placeholder="Category (e.g. React & Next.js)"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="rounded-lg bg-[#0a0a0a] border border-white/10 px-4 py-2.5 outline-none focus:border-orange-500 transition"
            />
            <input
              placeholder="Project link (https://...) *"
              required
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              className="rounded-lg bg-[#0a0a0a] border border-white/10 px-4 py-2.5 outline-none focus:border-orange-500 transition md:col-span-2"
            />
            <input
              placeholder="Image URL (optional, https://...)"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              className="rounded-lg bg-[#0a0a0a] border border-white/10 px-4 py-2.5 outline-none focus:border-orange-500 transition md:col-span-2"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={3}
              className="rounded-lg bg-[#0a0a0a] border border-white/10 px-4 py-2.5 outline-none focus:border-orange-500 transition md:col-span-2"
            />
            <label className="flex items-center gap-2 text-sm text-zinc-400">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
              />
              Show on home page
            </label>
            <input
              type="number"
              placeholder="Sort order (lower = first)"
              value={form.sort_order}
              onChange={(e) =>
                setForm({ ...form, sort_order: Number(e.target.value) || 0 })
              }
              className="rounded-lg bg-[#0a0a0a] border border-white/10 px-4 py-2.5 outline-none focus:border-orange-500 transition"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-orange-500 text-black font-semibold rounded-lg px-6 py-2.5 hover:bg-orange-400 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : editingId ? "Update Project" : "Add Project"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="text-zinc-400 hover:text-white px-4 py-2.5 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <h2 className="text-lg font-semibold mb-4">
          Existing Projects {loading ? "" : `(${projects.length})`}
        </h2>
        {loading ? (
          <p className="text-zinc-500">Loading...</p>
        ) : projects.length === 0 ? (
          <p className="text-zinc-500">No projects yet. Add one above.</p>
        ) : (
          <div className="space-y-3">
            {projects.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between bg-[#141414] border border-white/10 rounded-xl px-5 py-4"
              >
                <div>
                  <p className="font-semibold">
                    {p.title}{" "}
                    {!p.featured && (
                      <span className="text-xs text-zinc-500 font-normal">
                        (hidden from home)
                      </span>
                    )}
                  </p>
                  <p className="text-zinc-500 text-sm">{p.category}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(p)}
                    className="text-sm border border-white/10 rounded-lg px-3 py-1.5 hover:bg-zinc-800 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-sm border border-white/10 rounded-lg px-3 py-1.5 hover:bg-red-500 hover:border-red-500 hover:text-black transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
