"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import PageHeader from "../component/PageHeader";

type Blog = {
  _id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  tags: string[];
  createdAt: string;
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs?limit=100");
      const data = await res.json();
      setBlogs(data.blogs || []);
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
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      setBlogs((b) => b.filter((x) => x._id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Blog Posts"
        description="Write and manage articles for rajumolla.com"
        action={{ href: "/admin/blogs/new", label: "New Post", icon: <Plus size={16} /> }}
      />

      <div className="px-6 sm:px-10 py-8">
        {loading ? (
          <p className="font-mono text-sm" style={{ color: "var(--text-faint)" }}>
            Loading…
          </p>
        ) : blogs.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--border)" }}>
            {blogs.map((blog, i) => (
              <div
                key={blog._id}
                className="flex items-center justify-between gap-4 px-5 py-4"
                style={{
                  background: "var(--surface)",
                  borderTop: i === 0 ? "none" : "1px solid var(--border)",
                }}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-display font-medium truncate" style={{ color: "var(--text)" }}>
                      {blog.title}
                    </p>
                    <StatusBadge status={blog.status} />
                  </div>
                  <p className="text-xs font-mono mt-1 truncate" style={{ color: "var(--text-faint)" }}>
                    /blog/{blog.slug}
                    {blog.tags?.length ? `  ·  ${blog.tags.join(", ")}` : ""}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {blog.status === "published" && (
                    <Link
                      href={`/east/blog/${blog.slug}`}
                      target="_blank"
                      className="p-2 rounded-md"
                      style={{ color: "var(--text-muted)" }}
                      title="View live"
                    >
                      <Eye size={16} />
                    </Link>
                  )}
                  <Link
                    href={`/admin/blogs/${blog._id}`}
                    className="p-2 rounded-md"
                    style={{ color: "var(--accent)" }}
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    disabled={deletingId === blog._id}
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
        No blog posts yet
      </p>
      <p className="text-sm mt-1 mb-5" style={{ color: "var(--text-muted)" }}>
        Write your first article to see it here.
      </p>
      <Link
        href="/admin/blogs/new"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-mono text-sm font-medium"
        style={{ background: "var(--accent)", color: "var(--bg)" }}
      >
        <Plus size={16} />
        New Post
      </Link>
    </div>
  );
}
