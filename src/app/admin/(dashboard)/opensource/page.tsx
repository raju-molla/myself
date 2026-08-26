"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, Star, ExternalLink } from "lucide-react";
import PageHeader from "../component/PageHeader";

type Project = {
  _id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  featured: boolean;
  techStack: string[];
  repoUrl?: string;
};

export default function AdminOpenSourcePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/opensource?limit=100");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await fetch(`/api/opensource/${id}`, { method: "DELETE" });
      setProjects((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Open Source"
        description="Showcase repos and tools on rajumolla.com"
        action={{ href: "/admin/opensource/new", label: "New Project", icon: <Plus size={16} /> }}
      />

      <div className="px-6 sm:px-10 py-8">
        {loading ? (
          <p className="font-mono text-sm" style={{ color: "var(--text-faint)" }}>
            Loading…
          </p>
        ) : projects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--border)" }}>
            {projects.map((project, i) => (
              <div
                key={project._id}
                className="flex items-center justify-between gap-4 px-5 py-4"
                style={{
                  background: "var(--surface)",
                  borderTop: i === 0 ? "none" : "1px solid var(--border)",
                }}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-display font-medium truncate" style={{ color: "var(--text)" }}>
                      {project.title}
                    </p>
                    <StatusBadge status={project.status} />
                    {project.featured && <Star size={13} style={{ color: "var(--signal)" }} fill="var(--signal)" />}
                  </div>
                  <p className="text-xs font-mono mt-1 truncate" style={{ color: "var(--text-faint)" }}>
                    /open-source/{project.slug}
                    {project.techStack?.length ? `  ·  ${project.techStack.join(", ")}` : ""}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-md"
                      style={{ color: "var(--text-muted)" }}
                      title="View repo"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {project.status === "published" && (
                    <Link
                      href={`/east/open-source/${project.slug}`}
                      target="_blank"
                      className="p-2 rounded-md"
                      style={{ color: "var(--text-muted)" }}
                      title="View live"
                    >
                      <Eye size={16} />
                    </Link>
                  )}
                  <Link
                    href={`/admin/opensource/${project._id}`}
                    className="p-2 rounded-md"
                    style={{ color: "var(--accent)" }}
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(project._id)}
                    disabled={deletingId === project._id}
                    className="p-2 rounded-md disabled:opacity-50"
                    style={{ color: "var(--signal)" }}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const published = status === "published";
  return (
    <span
      className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
      style={{
        background: published ? "var(--accent-soft)" : "var(--signal-soft)",
        color: published ? "var(--accent-strong)" : "var(--signal)",
      }}
    >
      {status}
    </span>
  );
}

function EmptyState() {
  return (
    <div
      className="rounded-lg border border-dashed p-12 text-center"
      style={{ borderColor: "var(--border)" }}
    >
      <p className="font-display text-lg" style={{ color: "var(--text)" }}>
        No projects yet
      </p>
      <p className="text-sm mt-1 mb-5" style={{ color: "var(--text-muted)" }}>
        Add your first open source project to see it here.
      </p>
      <Link
        href="/admin/opensource/new"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-mono text-sm font-medium"
        style={{ background: "var(--accent)", color: "var(--bg)" }}
      >
        <Plus size={16} />
        New Project
      </Link>
    </div>
  );
}
