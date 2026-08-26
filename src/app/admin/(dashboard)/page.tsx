"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Newspaper, GitBranch, FileEdit, CheckCircle2, Star } from "lucide-react";
import PageHeader from "./component/PageHeader";

type Blog = { _id: string; status: string };
type Project = { _id: string; status: string; featured: boolean };

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [blogRes, projRes] = await Promise.all([
          fetch("/api/blogs?limit=100"),
          fetch("/api/opensource?limit=100"),
        ]);
        const blogData = await blogRes.json();
        const projData = await projRes.json();
        setBlogs(blogData.blogs || []);
        setProjects(projData.projects || []);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const publishedBlogs = blogs.filter((b) => b.status === "published").length;
  const draftBlogs = blogs.filter((b) => b.status === "draft").length;
  const publishedProjects = projects.filter((p) => p.status === "published").length;
  const featuredProjects = projects.filter((p) => p.featured).length;

  const stats = [
    { label: "Total Blog Posts", value: blogs.length, icon: Newspaper, accent: "var(--accent)" },
    { label: "Published Posts", value: publishedBlogs, icon: CheckCircle2, accent: "var(--accent)" },
    { label: "Draft Posts", value: draftBlogs, icon: FileEdit, accent: "var(--signal)" },
    { label: "Open Source Projects", value: projects.length, icon: GitBranch, accent: "var(--accent)" },
    { label: "Published Projects", value: publishedProjects, icon: CheckCircle2, accent: "var(--accent)" },
    { label: "Featured Projects", value: featuredProjects, icon: Star, accent: "var(--signal)" },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your content on rajumolla.com"
      />

      <div className="px-6 sm:px-10 py-8">
        {loading ? (
          <p className="font-mono text-sm" style={{ color: "var(--text-faint)" }}>
            Loading stats…
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.map(({ label, value, icon: Icon, accent }) => (
                <div
                  key={label}
                  className="rounded-lg border p-5 flex items-center gap-4"
                  style={{ background: "var(--surface)", borderColor: "var(--border)" }}
                >
                  <div
                    className="w-11 h-11 rounded-md flex items-center justify-center shrink-0"
                    style={{ background: "var(--accent-soft)" }}
                  >
                    <Icon size={20} style={{ color: accent }} />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-semibold" style={{ color: "var(--text)" }}>
                      {value}
                    </p>
                    <p className="text-xs font-mono mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <Link
                href="/admin/blogs/new"
                className="rounded-lg border p-6 flex items-center justify-between transition-colors hover:border-[var(--border-strong)]"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                <div>
                  <p className="font-display text-lg font-semibold" style={{ color: "var(--text)" }}>
                    Write a new blog post
                  </p>
                  <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                    Share research, write-ups, or updates
                  </p>
                </div>
                <Newspaper size={22} style={{ color: "var(--accent)" }} />
              </Link>

              <Link
                href="/admin/opensource/new"
                className="rounded-lg border p-6 flex items-center justify-between transition-colors hover:border-[var(--border-strong)]"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                <div>
                  <p className="font-display text-lg font-semibold" style={{ color: "var(--text)" }}>
                    Add an open source project
                  </p>
                  <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                    Showcase a repo, tool, or library
                  </p>
                </div>
                <GitBranch size={22} style={{ color: "var(--accent)" }} />
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
